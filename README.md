# leemansoftware.com

The website of Leeman Software, the product studio of Leeman Group LLC: the studio's home page, and a subsite for each product. Wallyt's subsite has the pages Google Play needs (privacy policy, account deletion, support, terms).

Each product's pages are its own subsite: `Base` takes a `product` and swaps the studio's header, footer, favicon and accent color for the product's. The studio's footer links only to the products' subsites, never to a product's policies. A product's nav and footer links live with it in `src/site.ts`.

Static [Astro](https://astro.build) site with no client-side JavaScript, no cookies and no analytics. Fonts (Geist and Geist Mono) are self-hosted from npm, so the site makes no third-party requests.

## Run

```sh
mise install          # node 24, pnpm 12
pnpm install
mise run dev          # http://localhost:4321
mise run check        # type-check and build into dist/
```

## Layout

| Path | Page |
|---|---|
| `src/pages/index.astro` | Home: products and contact |
| `src/pages/osrs-exchange/index.astro` | OSRS Exchange subsite (content checked against osrs.exchange) |
| `src/pages/rs3-exchange/index.astro` | RS3 Exchange subsite |
| `src/layouts/Exchange.astro` | The page both Exchange subsites share |
| `src/pages/wallyt/index.astro` | Wallyt subsite home (Play: store listing website) |
| `src/pages/wallyt/terms.astro` | Wallyt terms of use |
| `src/pages/wallyt/privacy.astro` | Wallyt privacy policy (Play: privacy policy URL) |
| `src/pages/wallyt/delete-account.astro` | Wallyt account deletion (Play: delete account URL) |
| `src/pages/wallyt/support.astro` | Wallyt support |
| `src/pages/privacy.astro` | Privacy notice for this website |
| `src/site.ts` | Company name, email address, and each product with its subsite's nav and footer |
| `src/components/` | Studio and product headers and footers, and the sections subsites are built from |
| `public/og/<slug>.png` | Each subsite's link-preview card (1200×630), in the style of the studio's `public/og.png` |
| `docs/google-play.md` | Console answers, Data safety draft, store listing draft, launch to-dos |

The Wallyt pages describe what the app actually does (checked against the Wallyt repo on 2026-10-04). When Wallyt's data handling changes, update them and their "Last updated" date in the same change.

## Deploy (GitHub Pages)

Every push to `main` builds and deploys the site with `.github/workflows/deploy.yml`.

- Until a custom domain is set, the site is at `https://trevorleeman.github.io/leemansoftware.com/`. The workflow passes that subpath to the build as `BASE_PATH`, and every link goes through `url()` in `src/url.ts`, so nothing breaks there. Write new internal links as `url('/path')`, never a bare `/path`.
- To move to `leemansoftware.com`, add it under Settings → Pages → Custom domain and point DNS at GitHub Pages: an `ALIAS`/flattened `CNAME` (or the four `A` records) for the apex and a `CNAME` for `www`. Then turn on Enforce HTTPS. The next deploy builds for the root automatically.
- GitHub Pages can't set response headers, so there's no CSP or HSTS header beyond what GitHub sends. The site loads nothing from other origins and runs one small script (`public/site.js`).
- `public/.nojekyll` is there so a branch-based Pages setup would still publish the `_astro/` folder; the workflow deploy doesn't need it.

## Email

The site uses one address, `hello@leemansoftware.com`, for everything: questions, Wallyt support, privacy and deletion requests. It's also the public developer email on Google Play and the address of the Google account that owns the Play developer account. Forward it to your inbox with Cloudflare Email Routing (Email → Email Routing → enable, then add the address). The address lives in `src/site.ts`.
