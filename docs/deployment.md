# Secure VPS deployment

The production workflow builds the exact commit that passed CI, publishes it
to GHCR with an immutable `sha-<commit>` tag, and deploys that tag over SSH.
The VPS never receives the GitHub token or source tree. A failed health check
automatically restores the previously deployed image.

## One-time GitHub setup

Create a `production` environment under **Settings → Environments**. Add a
required reviewer if deployments should require approval. Configure these
environment secrets:

- `VPS_HOST`: VPS hostname or IP address.
- `VPS_USER`: a dedicated, unprivileged deployment account.
- `VPS_SSH_KEY`: a dedicated Ed25519 private key with no passphrase.
- `VPS_HOST_FINGERPRINT`: the VPS SSH host-key SHA256 fingerprint.
- `VPS_SSH_PORT`: optional; defaults to `22`.

Configure these repository variables:

- `APP_PORT`: optional loopback port; defaults to `4321`.
- `PUBLIC_SITE_URL`: optional canonical URL used at build time.

After the first image is published, make the `jramosg/numerical-methods`
package public in GitHub package settings. The VPS can then pull images without
storing any registry credential.

Obtain the host fingerprint from a trusted VPS console, not from an untrusted
network connection:

```sh
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub -E sha256
```

## One-time VPS setup

Install Docker Engine with the Compose plugin. Prefer rootless Docker. If that
is not available, grant the deployment account Docker access while recognizing
that membership in the `docker` group is effectively root access.

```sh
sudo useradd --create-home --shell /bin/bash deploy
sudo install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
sudoedit /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Disable SSH password authentication and root login, enable a firewall, and
apply security updates automatically.

The container binds only to `127.0.0.1`. Put Caddy, nginx, or another TLS
reverse proxy in front of `127.0.0.1:4321`; expose only ports 22, 80, and 443
through the firewall. Do not change the Compose binding to `0.0.0.0` unless the
application should intentionally bypass the TLS proxy.

## Recovery

Each deployment records its image in
`~/apps/numerical-methods/.deploy.env`. To redeploy or roll back manually:

```sh
cd ~/apps/numerical-methods
IMAGE=ghcr.io/jramosg/numerical-methods:sha-<commit> APP_PORT=4321 ./deploy.sh
```

Use GitHub branch protection to require the `CI / build` check before merging
to `master`. GitHub Actions are pinned to commit SHAs to prevent tag
replacement.
