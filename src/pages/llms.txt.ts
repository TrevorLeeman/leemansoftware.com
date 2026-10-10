import type { APIRoute } from 'astro';
import { exchange, limits } from '../exchange';
import { comingSoon, company, discord, email, integrations, osrsPageViews, players, premium, products, scale, studioQuestions, usd } from '../site';

// A plain-text summary of the studio and its products for AI assistants (llmstxt.org), built from
// the same facts as the pages so it never drifts from them. It follows the site's own order: who,
// the products, what they cost, then the questions people ask.
const page = (path: string) => new URL(path, company.url).href;
const osrs = exchange('osrs-exchange');
const rs3 = exchange('rs3-exchange');

const body = `# ${company.brand}

> ${company.brand} is an independent software studio founded by ${company.founder}. It designs, builds and runs three products: OSRS Exchange, started in ${company.since}, a free live price tracker for Old School RuneScape's Grand Exchange, which ${players} players have used; RS3 Exchange, a separate site launched in 2026 that does the same job for RuneScape 3; and Wallyt, a free app for splitting shared costs. The studio answers support for all three directly and is open to client projects.

Contact: ${email}. The Exchange sites' Discord: ${discord}

## Products

${products
  .map(
    (p) =>
      `- [${p.name}](${page(`/${p.slug}/`)}): ${p.definition} ${p.terms.replace(' · ', '. ')}. Platform: ${p.platforms}${p.status === 'soon' ? `. ${comingSoon}` : ''}.${p.site ? ` The product itself: ${p.site}` : ''}`,
  )
  .join('\n')}

## What the Exchange sites cost

- Free: the price table with margins after tax, a page and charts for every item, recipe profit for free-to-play recipes, and ${limits.alerts.free} price alert with ${limits.freeNotifications} notifications in total. New prices are checked every ${limits.refresh.free} seconds. OSRS Exchange's free plan shows ads; RS3 Exchange has no ads on any plan.
- Premium: ${usd(premium.monthly)} a month or ${usd(premium.annual)} a year, with a ${premium.trialDays}-day free trial for new members. It checks prices every ${limits.refresh.premium} seconds and adds members' recipes, ${limits.alerts.premium} price alerts, saved presets, item lists, trends and margin lines.
- One membership covers both OSRS Exchange and RS3 Exchange. It is billed through Stripe and appears on card statements as ${premium.statement}. It can be cancelled from the account settings on either site.
- Prices checked ${premium.checked}.

## Where the Exchange sites' numbers come from

${osrs.sources.map((s) => `- OSRS Exchange, ${s.title.toLowerCase()}: ${s.body}`).join('\n')}
${rs3.sources
  .slice(1, 3)
  .map((s) => `- RS3 Exchange, ${s.title.toLowerCase()}: ${s.body}`)
  .join('\n')}

## Scale

- ${osrsPageViews} OSRS Exchange page views
${scale.map((s) => `- ${s.value} ${s.label}`).join('\n')}

## Built on

${integrations.map((i) => `- ${i.title}: ${i.body}`).join('\n')}

## Questions people ask

${studioQuestions.map((x) => `- ${x.q} ${x.a}`).join('\n')}

## Pages

- [About ${company.brand}](${page('/about/')}): who founded the studio, how the products are run, and how to hire it
- [OSRS Exchange](${page('/osrs-exchange/')}): what it is, what's free, what Premium costs, where its prices come from and who runs it
- [RS3 Exchange](${page('/rs3-exchange/')}): the same for RuneScape 3
- [Wallyt](${page('/wallyt/')}): how it works, what it does with money and data, and common questions
- [A Splitwise alternative that imports your groups](${page('/wallyt/splitwise-alternative/')}): how to move a group from Splitwise to Wallyt
- [Wallyt support](${page('/wallyt/support/')}): answers to common questions and how to reach us
- [Wallyt privacy policy](${page('/wallyt/privacy/')})
- [Wallyt terms of use](${page('/wallyt/terms/')})
- [Delete your Wallyt account](${page('/wallyt/delete-account/')})

## Optional

- [Website privacy](${page('/privacy/')}): this website sets no cookies and runs no analytics
`;

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
