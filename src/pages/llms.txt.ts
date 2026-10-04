import type { APIRoute } from 'astro';
import { company, email, integrations, products, scale } from '../site';

// A plain-text summary of the studio and its products for AI assistants (llmstxt.org), built from
// the same facts as the pages so it never drifts from them.
const page = (path: string) => new URL(path, company.url).href;

const body = `# ${company.brand}

> ${company.brand} is the product studio of ${company.legalName}, run by one developer who designs, builds and runs its own web and Android apps end to end, servers included: OSRS Exchange, live Grand Exchange prices trusted by 364,000+ Old School RuneScape traders, RS3 Exchange, the same platform for RuneScape 3, and Wallyt, an Android app for splitting shared costs. It also takes on a few client projects a year.

Contact: ${email}

## Products

${products
  .map((p) => `- [${p.name}](${page(`/${p.slug}/`)}): ${p.summary} Platform: ${p.platforms}${p.status === 'soon' ? ', coming soon' : ''}.${p.site ? ` The product itself: ${p.site}` : ''}`)
  .join('\n')}

## Scale

${scale.map((s) => `- ${s.value} ${s.label}`).join('\n')}

## Integrations

${integrations.map((i) => `- ${i.title}: ${i.body}`).join('\n')}

## Wallyt

- [Support](${page('/wallyt/support/')}): answers to common questions and how to reach us
- [Privacy policy](${page('/wallyt/privacy/')})
- [Terms of use](${page('/wallyt/terms/')})
- [Delete your account](${page('/wallyt/delete-account/')})

## Optional

- [Website privacy](${page('/privacy/')}): this website sets no cookies and runs no analytics
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
