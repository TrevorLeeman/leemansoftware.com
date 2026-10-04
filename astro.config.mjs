// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://leemansoftware.com',
  // A GitHub Pages project URL serves the site from /<repo>/; the deploy workflow passes that
  // path in. Builds without it (local, or a custom domain) serve from the root.
  base: process.env.BASE_PATH || '/',
  // Pages live at /wallyt/, as GitHub Pages serves them; see url() in src/url.ts.
  trailingSlash: 'always',
});
