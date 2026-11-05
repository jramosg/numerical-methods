import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const deployScript = fileURLToPath(new URL('./deploy.sh', import.meta.url));
const repository = 'ghcr.io/jramosg/numerical-methods';
const current = `${repository}:sha-current`;
const previous = `${repository}:sha-previous`;
const old = `${repository}:sha-old`;

// Execute the real deployment script against a simulated Docker daemon.
const fakeDocker = `#!/usr/bin/env node
const fs = require('node:fs');
const args = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync('docker-state.json', 'utf8'));
state.calls.push(args);
fs.writeFileSync('docker-state.json', JSON.stringify(state));
if (args[0] === 'compose') {
  if (args.includes('pull')) {
    if (state.pullFails) process.exit(1);
    if (!state.images.includes(process.env.IMAGE)) {
      state.images.push(process.env.IMAGE);
      fs.writeFileSync('docker-state.json', JSON.stringify(state));
    }
  }
  if (args.includes('ps')) console.log('web-container');
  process.exit(0);
}
if (args[0] === 'inspect') {
  const env = fs.readFileSync('.deploy.env', 'utf8');
  console.log(state.unhealthy && env.includes(process.env.IMAGE)
    ? 'unhealthy' : 'healthy');
  process.exit(0);
}
if (args[0] === 'image' && args[1] === 'ls') {
  if (state.listFails) process.exit(1);
  console.log(state.images.join('\\n'));
  process.exit(0);
}
if (args[0] === 'ps') {
  if (state.containerListFails) process.exit(1);
  const image = args.at(-1).slice('ancestor='.length);
  if (state.used.includes(image)) console.log('existing-container');
  process.exit(0);
}
if (args[0] === 'image' && args[1] === 'rm') {
  if (state.removeFails.includes(args[2])) process.exit(1);
  state.images = state.images.filter(image => image !== args[2]);
  fs.writeFileSync('docker-state.json', JSON.stringify(state));
  process.exit(0);
}
throw new Error('Unexpected Docker command: ' + args.join(' '));
`;

function fixture(t, options = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'deploy-test-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  writeFileSync(join(directory, 'docker'), fakeDocker, { mode: 0o700 });
  writeFileSync(join(directory, 'sleep'), '#!/bin/sh\nexit 0\n', {
    mode: 0o700,
  });
  const statePath = join(directory, 'docker-state.json');
  writeFileSync(statePath, JSON.stringify({
    images: [current, previous, old],
    used: [],
    removeFails: [],
    calls: [],
    ...options,
  }));
  if (options.previous !== null) {
    writeFileSync(join(directory, '.deploy.env'),
      `IMAGE=${options.previous ?? previous}\nAPP_PORT=4321\n`);
  }
  if (options.rollback) {
    writeFileSync(join(directory, '.rollback-image'), `${options.rollback}\n`);
  }
  return {
    run(image = current) {
      const result = spawnSync('sh', [deployScript], {
        cwd: directory,
        env: {
          ...process.env,
          PATH: `${directory}${delimiter}${process.env.PATH}`,
          IMAGE: image,
        },
        encoding: 'utf8',
        timeout: 10_000,
      });
      assert.ifError(result.error);
      return {
        ...result,
        ...JSON.parse(readFileSync(statePath, 'utf8')),
        env: existsSync(join(directory, '.deploy.env'))
          ? readFileSync(join(directory, '.deploy.env'), 'utf8') : null,
      };
    },
    rollback() {
      return readFileSync(join(directory, '.rollback-image'), 'utf8').trim();
    },
  };
}

function removals(result) {
  return result.calls.filter(args => args[0] === 'image' && args[1] === 'rm');
}

test('removes the SHA backlog while preserving current, rollback and other apps', t => {
  const untouched = [
    `${repository}:latest`,
    `${repository}:<none>`,
    `${repository}-other:sha-old`,
    'ghcr.io/jramosg/estocastica:sha-old',
    'laguntza-web:27b9f4c',
    'node:22-alpine',
    '<none>:<none>',
  ];
  const oldest = `${repository}:sha-oldest`;
  const f = fixture(t, {
    images: [current, previous, old, oldest, ...untouched],
  });
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.images, [current, previous, ...untouched]);
  assert.deepEqual(removals(result), [['image', 'rm', old], ['image', 'rm', oldest]]);
  assert.equal(f.rollback(), previous);
});

test('preserves rollback on a repeated deployment and rotates it next release', t => {
  const next = `${repository}:sha-next`;
  const f = fixture(t);
  assert.equal(f.run().status, 0);
  const repeated = f.run();
  assert.equal(repeated.status, 0, repeated.stderr);
  assert.ok(repeated.images.includes(previous));
  assert.equal(f.rollback(), previous);
  const rotated = f.run(next);
  assert.equal(rotated.status, 0, rotated.stderr);
  assert.equal(f.rollback(), current);
  assert.ok(rotated.images.includes(next));
  assert.ok(rotated.images.includes(current));
  assert.ok(!rotated.images.includes(previous));
});

test('keeps images referenced by running or stopped containers', t => {
  const f = fixture(t, { used: [old] });
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(removals(result), []);
  assert.ok(result.calls.some(args =>
    args.join(' ') === `ps -aq --filter ancestor=${old}`));
});

test('cleans old releases on the first deployment without rollback state', t => {
  const result = fixture(t, { previous: null }).run();
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.images, [current]);
});

test('does not remove images after failed health checks and restores the old image', t => {
  const f = fixture(t, { unhealthy: true, rollback: old });
  const result = f.run();
  assert.equal(result.status, 1);
  assert.match(result.env, new RegExp(`IMAGE=${previous}`));
  assert.deepEqual(removals(result), []);
  assert.ok(!result.calls.some(args => args[0] === 'image'));
  assert.equal(f.rollback(), old);
});

test('does not clean up when the pull fails', t => {
  const f = fixture(t, { pullFails: true, rollback: old });
  const result = f.run();
  assert.equal(result.status, 1);
  assert.deepEqual(removals(result), []);
  assert.ok(result.env.includes(`IMAGE=${previous}\n`));
  assert.equal(f.rollback(), old);
});

test('removes failed initial deployment state when the pull fails', t => {
  const result = fixture(t, { pullFails: true, previous: null }).run();
  assert.equal(result.status, 1);
  assert.equal(result.env, null);
  assert.deepEqual(removals(result), []);
});

for (const failure of ['listFails', 'containerListFails']) {
  test(`keeps a healthy deployment and warns when ${failure}`, t => {
    const result = fixture(t, { [failure]: true }).run();
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stderr, /Warning: image cleanup failed/);
    assert.deepEqual(removals(result), []);
  });
}

test('reports removal conflicts and continues cleaning subsequent images', t => {
  const oldest = `${repository}:sha-oldest`;
  const result = fixture(t, {
    images: [current, previous, old, oldest],
    removeFails: [old],
  }).run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /Warning: could not remove old image/);
  assert.deepEqual(result.images, [current, previous, old]);
  assert.deepEqual(removals(result), [['image', 'rm', old], ['image', 'rm', oldest]]);
});
