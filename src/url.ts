// The site can be served from a domain's root (leemansoftware.com) or from a subpath (a GitHub
// Pages project URL, /leemansoftware.com/). Every link to a page or file on this site goes
// through `url()`, so both work. The base comes from `BASE_PATH` at build time (astro.config).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * A root-relative path ("/wallyt") as a link that works under the deployed base. Pages get a
 * trailing slash ("/wallyt/"), the address GitHub Pages serves them at, so links and search
 * engines never go through a redirect. Files ("/og.png") are left as they are.
 */
export const url = (path: string) => {
  const [page, hash] = path.split('#');
  const slashed = page.endsWith('/') || /\.[a-z0-9]+$/i.test(page) ? page : `${page}/`;
  return `${base}${slashed}${hash === undefined ? '' : `#${hash}`}`;
};

/** The current page's path without the base, for comparing against "/wallyt" and friends. */
export const withoutBase = (pathname: string) =>
  (base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/$/, '') || '/';
