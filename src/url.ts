// The site can be served from a domain's root (leemansoftware.com) or from a subpath (a GitHub
// Pages project URL, /leemansoftware.com/). Every link to a page or file on this site goes
// through `url()`, so both work. The base comes from `BASE_PATH` at build time (astro.config).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** A root-relative path ("/wallyt") as a link that works under the deployed base. */
export const url = (path: string) => `${base}${path}`;

/** The current page's path without the base, for comparing against "/wallyt" and friends. */
export const withoutBase = (pathname: string) =>
  (base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/$/, '') || '/';
