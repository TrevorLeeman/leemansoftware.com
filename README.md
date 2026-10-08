# leemansoftware.com

The website of Leeman Software: the studio's home and About pages, and a subsite for each product. Wallyt's subsite has the pages Google Play needs (privacy policy, account deletion, support, terms).

Each product's pages are its own subsite: `Base` takes a `product` and swaps the studio's header, footer, favicon and accent color for the product's. The studio's footer links only to the products' subsites, never to a product's policies. A product's nav and footer links live with it in `src/site.ts`.

Every page's head carries what search engines and AI answers read (in `Base`): a title of at most 60 characters, a description of at most 160, a canonical URL, a link card, and one schema.org graph of the studio (with its founder), the site, the page, its breadcrumbs and the product it's about. Pages pass `schema` for their product, `questions` for the questions they answer on screen and, where it fits, a `pageType` (Wallyt's support page is an `FAQPage`, the About page an `AboutPage`). `scripts/check-dist.mjs` checks all of this on the built site.

## Who the pages are for

The copy is written backwards from who lands on each page and what they came to find out.

| Page | Reader | What it has to answer |
|---|---|---|
| Home | Someone who saw the studio's name on a product, a receipt or a card statement | Who this is, what it makes, why the tools can be trusted, what a charge from OSRS Exchange is |
| OSRS Exchange, RS3 Exchange | A player deciding whether to trust or pay for the site | What it is, what's free, what Premium costs, where the prices come from, who runs it |
| Wallyt | Someone choosing an app for shared costs, or invited to a group; Google's reviewers | How it works, what it does with money and data, when it's out |
| Splitwise alternative | Someone leaving Splitwise | How the import works and what comes across |
| About | Anyone asking who is behind the products; a prospective client | Who, since when, how the products are run, how to hire |

Rules the copy follows:

- Every number is checked against the product repos or the live sites and rounded down. `src/site.ts` says where each one comes from. The 500,000+ figure is OSRS Exchange's unique lifetime visitors, so it is always "players have used", never "members" or "accounts", and never RS3 Exchange's.
- Nothing the products don't ship: no flip finder, no trade tracking, no RuneLite plugin, no iPhone app, no uptime claim.
- The studio's pages (home, About) speak as "I". Product pages speak about the product and to "you".
- The Exchange pages here leave the searches the products rank for themselves ("Grand Exchange prices", "live GE tracker") to osrs.exchange and rs3.exchange. Those phrases appear only as the text of links into the matching page there.
- Competitors are named only with facts about our own products.

Static [Astro](https://astro.build) site with no client-side JavaScript, no cookies and no analytics. Fonts (Geist and Geist Mono) are self-hosted from npm, so the site makes no third-party requests.

## Run

```sh
mise install          # node 24, pnpm 12
pnpm install
mise run dev          # http://localhost:4321
mise run check        # type-check, build into dist/, and check the built site
mise run cards        # remake public/og.png from /cards/studio (needs dev running, and Chrome)
```

## Layout

| Path | Page |
|---|---|
| `src/pages/index.astro` | Home: the products, the scale and integrations behind them, studio questions, hiring |
| `src/pages/about.astro` | About: who runs the studio, how the products are run, the full hiring pitch |
| `src/pages/osrs-exchange/index.astro`, `src/pages/rs3-exchange/index.astro` | The two Exchange subsites |
| `src/layouts/Exchange.astro` | The page both Exchange subsites share |
| `src/exchange.ts` | What the Exchange pages say, written once with each game's own facts filled in (checked against the osrs-exchange repo and both live sites) |
| `src/pages/wallyt/index.astro` | Wallyt subsite home (Play: store listing website) |
| `src/pages/wallyt/splitwise-alternative.astro` | How to move a group from Splitwise to Wallyt |
| `src/pages/wallyt/terms.astro` | Wallyt terms of use |
| `src/pages/wallyt/privacy.astro` | Wallyt privacy policy (Play: privacy policy URL) |
| `src/pages/wallyt/delete-account.astro` | Wallyt account deletion (Play: delete account URL) |
| `src/pages/wallyt/support.astro` | Wallyt support |
| `src/pages/privacy.astro` | Privacy notice for this website |
| `src/site.ts` | Company name, founder, email address, Premium's price, each product with its one-sentence definition, pitch, nav and footer, the studio's scale numbers, integrations and questions (checked against the products' repos; round down, never up) |
| `src/components/` | Studio and product headers and footers, and the sections pages are built from (feature grids, plans, quotes, steps, questions) |
| `public/og/<slug>.png` | Each subsite's link-preview card (1200×630), in the style of the studio's `public/og.png` |
| `src/pages/cards/[card].astro` | The studio's link card as a page, for `mise run cards`. It exists only in development |
| `src/pages/sitemap.xml.ts`, `src/pages/llms.txt.ts` | The sitemap, and a plain-text summary of the studio for AI assistants, built from `src/site.ts` and `src/exchange.ts`. Add new pages to both |
| `scripts/check-dist.mjs` | Checks the built site: title and description lengths, repeated titles, structured data, questions marked up but not on the page, broken links and anchors, the sitemap |
| `docs/google-play.md` | Console answers, Data safety draft, store listing draft, launch to-dos |

The Wallyt pages describe what the app actually does (checked against the Wallyt repo on 2026-10-04). When Wallyt's data handling changes, update them and their "Last updated" date in the same change.

## Deploy (GitHub Pages)

Every push to `main` builds and deploys the site with `.github/workflows/deploy.yml`.

- Until a custom domain is set, the site is at `https://trevorleeman.github.io/leemansoftware.com/`. The workflow passes that subpath to the build as `BASE_PATH`, and every link goes through `url()` in `src/url.ts`, so nothing breaks there. Write new internal links as `url('/path')`, never a bare `/path`. `url()` adds the trailing slash pages are served at (`/wallyt/`), so no link or search result goes through a redirect.
- To move to `leemansoftware.com`, add it under Settings → Pages → Custom domain and point DNS at GitHub Pages: an `ALIAS`/flattened `CNAME` (or the four `A` records) for the apex and a `CNAME` for `www`. Then turn on Enforce HTTPS. The next deploy builds for the root automatically.
- GitHub Pages can't set response headers, so there's no CSP or HSTS header beyond what GitHub sends. The site loads nothing from other origins and runs one small script (`public/site.js`).
- `public/.nojekyll` is there so a branch-based Pages setup would still publish the `_astro/` folder; the workflow deploy doesn't need it.

## Email

The site uses one address, `hello@leemansoftware.com`, for everything: questions, Wallyt support, privacy and deletion requests. It's also the public developer email on Google Play and the address of the Google account that owns the Play developer account. Forward it to your inbox with Cloudflare Email Routing (Email → Email Routing → enable, then add the address). The address lives in `src/site.ts`.
