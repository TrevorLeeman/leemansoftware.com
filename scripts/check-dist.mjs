// Checks the built site (dist/) for the things a copy change can quietly break: titles and
// descriptions that run long or repeat, structured data that doesn't parse or points at nothing,
// questions marked up but not on the page, links and anchors that lead nowhere, and pages missing
// from the sitemap. Run after a build: `node scripts/check-dist.mjs`. Uses only Node's built-ins.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = 'dist';
const origin = 'https://leemansoftware.com';
// The same subpath the build was given (see src/url.ts), so links are checked where they're served.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const limits = { title: 60, description: 160 };

const problems = [];
const fail = (page, message) => problems.push(`${page}: ${message}`);

const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : [],
  );

// Every page by the path it's served at: "/", "/wallyt/", "/404.html".
const pages = new Map(
  walk(dist).map((file) => {
    const path = `/${relative(dist, file)}`.replace(/index\.html$/, '');
    const html = readFileSync(file, 'utf8');
    return [path, { html, ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])), indexed: !/<meta name="robots" content="noindex"/.test(html) }];
  }),
);

const seen = { title: new Map(), description: new Map() };

for (const [path, page] of pages) {
  const { html } = page;
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

  const head = {
    title: [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => decode(m[1])),
    description: [...html.matchAll(/<meta name="description" content="([^"]*)"/g)].map((m) => decode(m[1])),
  };
  for (const [name, found] of Object.entries(head)) {
    if (found.length !== 1) fail(path, `has ${found.length} ${name}s, needs exactly one`);
    const value = found[0] ?? '';
    if ([...value].length > limits[name]) fail(path, `${name} is ${[...value].length} characters, over ${limits[name]}: "${value}"`);
    if (page.indexed) {
      if (seen[name].has(value)) fail(path, `shares its ${name} with ${seen[name].get(value)}`);
      seen[name].set(value, path);
    }
  }
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(path, `has ${h1} h1 headings, needs exactly one`);

  // Structured data: valid JSON, every reference pointing at something the page describes, and
  // every question it claims to answer actually on the page.
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let graph;
    try {
      graph = JSON.parse(json);
    } catch (error) {
      fail(path, `structured data doesn't parse: ${error.message}`);
      continue;
    }
    const described = new Set();
    const referenced = new Set();
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      if (node['@id']) (Object.keys(node).length > 1 ? described : referenced).add(node['@id']);
      if (node['@type'] === 'Question' && !text.includes(node.name)) fail(path, `marks up a question that isn't on the page: "${node.name}"`);
      Object.values(node).forEach(visit);
    };
    visit(graph);
    for (const id of referenced) if (!described.has(id)) fail(path, `structured data points at ${id}, which the page doesn't describe`);
  }

  // Links to this site: the page exists, and so does the anchor on it.
  for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
    const link = decode(href);
    if (/^(https?:|mailto:|tel:)/.test(link)) continue;
    const [to, hash] = link.split('#');
    let target = path;
    if (to) {
      if (!to.startsWith(`${base}/`)) {
        fail(path, `links to "${link}" without the site's base path (use url() from src/url.ts)`);
        continue;
      }
      target = to.slice(base.length);
    }
    const linked = pages.get(target);
    if (!linked) {
      if (!existsSync(join(dist, target))) fail(path, `links to ${target}, which isn't in the build`);
      continue;
    }
    if (hash && !linked.ids.has(hash)) fail(path, `links to ${target}#${hash}, but nothing there has that id`);
  }
}

// The sitemap lists every page search engines may index, and nothing else.
const indexable = [...pages].filter(([, page]) => page.indexed).map(([path]) => path);
const sitemap = [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(origin, ''));
for (const path of indexable) if (!sitemap.includes(path)) fail('sitemap.xml', `is missing ${path}`);
for (const path of sitemap) if (!indexable.includes(path)) fail('sitemap.xml', `lists ${path}, which isn't a page`);

// /llms.txt only points at pages that exist.
for (const [, link] of readFileSync(join(dist, 'llms.txt'), 'utf8').matchAll(/\]\((https:\/\/leemansoftware\.com[^)]*)\)/g)) {
  if (!pages.has(link.replace(origin, ''))) fail('llms.txt', `links to ${link}, which isn't a page`);
}

// The link-card pages are for making the card images and never ship.
if (existsSync(join(dist, 'cards'))) fail('dist/cards', 'the link-card pages were built into the site');

// Google Play matches this line against the developer name on Wallyt's store listing.
if (!pages.get('/wallyt/delete-account/')?.html.includes('Wallyt, by Leeman Software')) {
  fail('/wallyt/delete-account/', 'no longer says "Wallyt, by Leeman Software"');
}

if (problems.length) {
  console.error(`${problems.length} problem${problems.length === 1 ? '' : 's'} in the built site:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`Built site checked: ${pages.size} pages, ${indexable.length} in the sitemap.`);
