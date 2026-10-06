import { defineMiddleware } from 'astro:middleware';

// No block of text ends on a line holding a single word. CSS `text-wrap: pretty` asks for this,
// but Firefox ignores it and other browsers treat it as a hint. So every page's paragraphs,
// headings, list items and the like have their last two words joined by a non-breaking space,
// whatever the screen width.

// The elements whose text is bound. Text belongs to the innermost one it sits in.
const blocks = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dt', 'dd', 'blockquote', 'figcaption', 'summary', 'small', 'label', 'td', 'th']);
// Elements whose contents aren't prose, left as they are.
const raw = new Set(['script', 'style', 'pre', 'code', 'textarea', 'svg', 'title']);
// Two words joined longer than this could overflow a phone-width column, so they stay apart.
const longest = 22;

export function bindLastWords(html: string): string {
  // The page as alternating text and tags: even indexes are text, odd ones tags.
  // A tag opens with a letter or a slash, so CSS such as `(width <= 900px)` in a style isn't one.
  const parts = html.split(/(<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>)/);
  // Each open block's text parts, by index into `parts`.
  const open: { name: string; text: number[] }[] = [];
  let skip: string | undefined;

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (!skip && open.length) open.at(-1)!.text.push(i);
      continue;
    }
    const tag = /^<(\/?)([a-zA-Z][\w-]*)/.exec(parts[i]);
    if (!tag) continue;
    const [, closing, n] = tag;
    const name = n.toLowerCase();
    if (skip) {
      if (closing && name === skip) skip = undefined;
      continue;
    }
    if (raw.has(name) && !closing && !parts[i].endsWith('/>')) skip = name;
    else if (blocks.has(name)) {
      if (!closing) open.push({ name, text: [] });
      else {
        const at = open.findLastIndex((b) => b.name === name);
        if (at !== -1) bind(parts, open.splice(at).at(0)!.text);
      }
    } else if (name === 'br' && open.length) open.at(-1)!.text.push(-1);
  }
  return parts.join('');
}

// Joins the last two words of one block's text, which may be spread over several text parts.
function bind(parts: string[], text: number[]) {
  // Only the text after the block's last line break can end on a lone word.
  const tail = text.slice(text.lastIndexOf(-1) + 1);
  // The block's text as one string, and where each character came from.
  let joined = '';
  const from: [number, number][] = [];
  for (const i of tail) {
    for (let c = 0; c < parts[i].length; c++) from.push([i, c]);
    joined += parts[i];
  }
  const words = /(\S+)([ \t\r\n]+)(\S+)[ \t\r\n]*$/.exec(joined);
  if (!words) return;
  const [, before, gap, last] = words;
  // A word too long to join safely is left alone.
  if (visible(before).length + visible(last).length + 1 > longest) return;
  // The space becomes one non-breaking space, even when it spans parts.
  const start = words.index + before.length;
  for (let c = start + gap.length - 1; c >= start; c--) {
    const [i, at] = from[c];
    parts[i] = parts[i].slice(0, at) + (c === start ? '&nbsp;' : '') + parts[i].slice(at + 1);
  }
}

// How many characters an HTML fragment shows, counting each entity as one.
const visible = (s: string) => s.replace(/&[#\w]+;/g, '_');

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(bindLastWords(await response.text()), { status: response.status, statusText: response.statusText, headers });
});
