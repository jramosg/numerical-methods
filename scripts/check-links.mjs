// Checks that every internal href in the built site resolves to a built page.
// Run after `astro build`: node scripts/check-links.mjs
import fs from "node:fs";
import path from "node:path";

const dist = "dist";

if (!fs.existsSync(dist)) {
  console.error("dist/ not found — run the build first.");
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    if (fs.statSync(file).isDirectory()) walk(file);
    else if (name.endsWith(".html")) pages.push(file);
  }
})(dist);

const broken = new Map();
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1];
    if (href.startsWith("/_astro")) continue;
    const isAsset = /\.[a-z0-9]+$/i.test(href);
    const target = isAsset
      ? path.join(dist, href)
      : path.join(dist, href, "index.html");
    if (!fs.existsSync(target)) {
      if (!broken.has(href)) broken.set(href, []);
      broken.get(href).push(page);
    }
  }
}

console.log(`checked ${pages.length} pages`);
if (broken.size === 0) {
  console.log("no broken internal links");
  process.exit(0);
}
for (const [href, sources] of broken) {
  console.error(`BROKEN ${href} — first seen in ${sources[0]} (${sources.length} pages)`);
}
process.exit(1);
