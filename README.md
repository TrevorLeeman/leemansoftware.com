# leemansoftware.com

The website of Leeman Software, the product studio of Leeman Group LLC: the studio's home page, Wallyt's page, and the pages Google Play needs for Wallyt (privacy policy, account deletion, support).

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
| `src/pages/index.astro` | Home: products, about, contact |
| `src/pages/wallyt/index.astro` | Wallyt (coming soon) |
| `src/pages/wallyt/privacy.astro` | Wallyt privacy policy (Play: privacy policy URL) |
| `src/pages/wallyt/delete-account.astro` | Wallyt account deletion (Play: delete account URL) |
| `src/pages/wallyt/support.astro` | Wallyt support |
| `src/pages/privacy.astro` | Privacy notice for this website |
| `src/site.ts` | Company name, email addresses and the product list |
| `docs/google-play.md` | Console answers, Data safety draft, store listing draft, launch to-dos |

The Wallyt policy pages describe what the app actually does (checked against the Wallyt repo on 2026-10-02). When Wallyt's data handling changes, update them and their "Last updated" date in the same change.

## Deploy (Cloudflare Pages)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → connect this repo.
2. Framework preset **Astro**, build command `pnpm build`, output directory `dist`, environment variable `NODE_VERSION=24`.
3. Custom domains: `leemansoftware.com`, and `www.leemansoftware.com` redirected to it.
4. `public/_headers` sets the security headers and long-lived caching for hashed assets.

## Email

The site uses one address, `hello@leemansoftware.com`, for everything: questions, Wallyt support, privacy and deletion requests. It's also the public developer email on Google Play and the address of the Google account that owns the Play developer account. Forward it to your inbox with Cloudflare Email Routing (Email → Email Routing → enable, then add the address). The address lives in `src/site.ts`.
