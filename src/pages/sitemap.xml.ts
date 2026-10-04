import type { APIRoute } from 'astro';
import { company } from '../site';

// Every page, at the address it's served from (with its trailing slash, see url() in src/url.ts).
const paths = [
  '/',
  '/osrs-exchange/',
  '/rs3-exchange/',
  '/wallyt/',
  '/wallyt/support/',
  '/wallyt/privacy/',
  '/wallyt/terms/',
  '/wallyt/delete-account/',
  '/privacy/',
];

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(p, company.url).href}</loc></url>`).join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
