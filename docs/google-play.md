# Wallyt on Google Play

Everything the Play Console asks for that this site answers, and what still has to happen before the first release. Written 2026-10-02, updated 2026-10-07.

`/wallyt` is Wallyt's own subsite: its header, footer and colors are Wallyt's, and every Wallyt page links to its support, privacy policy, terms and account deletion. The studio's pages don't link to Wallyt's policies, only to `/wallyt`. The subsite also has `/wallyt/splitwise-alternative`, a guide to importing a Splitwise group; Play doesn't need it, and it says what the app does the same way the pages below do.

## Links to paste into the Console

| Console field | Value |
|---|---|
| Store settings > Store listing contact details > Website | https://leemansoftware.com/wallyt/ |
| Store settings > Store listing contact details > Email | hello@leemansoftware.com |
| App content > Privacy policy | https://leemansoftware.com/wallyt/privacy/ |
| App content > Data safety > Delete account URL | https://leemansoftware.com/wallyt/delete-account/ |
| Developer page > Website (optional) | https://leemansoftware.com |

Google Cloud OAuth consent screen (Sign in with Google), Branding:

| Field | Value |
|---|---|
| App name | Wallyt |
| App home page | https://leemansoftware.com/wallyt/ |
| Privacy policy | https://leemansoftware.com/wallyt/privacy/ |
| Terms of service | https://leemansoftware.com/wallyt/terms/ |
| Authorized domain | leemansoftware.com (verify it in Google Search Console first) |

## What the website covers

| Requirement | Where |
|---|---|
| Privacy policy: public, not a PDF, names the app and the developer, says what's collected, used and shared, how long it's kept and how to delete it | `/wallyt/privacy` |
| Account deletion page: names the app and developer as on the store listing, gives the steps, says what's deleted and what's kept, and for how long | `/wallyt/delete-account` |
| A way to contact the developer | Every Wallyt page's footer, `/wallyt/support`, `/wallyt#maker` |
| OAuth home page: describes the app, links the privacy policy, on a verified domain | `/wallyt` (the privacy policy is linked beside the main button and again under Your data stays yours) |
| Terms (OAuth consent screen, and a future App Store listing) | `/wallyt/terms`. A plain-language draft: have it reviewed, and add a governing-law clause if you want one |

The deletion page shows "Wallyt, by Leeman Software". If the Play developer name is "Leeman Group LLC" instead, change that line (`meta` in `src/pages/wallyt/delete-account.astro`) to match it exactly.

When Wallyt goes live, set its `status` to `'live'` in `src/site.ts`. Every "coming soon" line then becomes a Get it on Google Play link to `wallytPlayUrl`.

## Before the first upload

The app side, and how to build, sign and submit, is the Wallyt repo's `docs/google-play.md`. Status as of 2026-10-07:

Done in the Wallyt repo:

1. **In-app account deletion**: Account, then Delete account (Wallyt docs/decisions.md #97). It does what `/wallyt/delete-account` says, which now lists it first; tested end to end on the web and against the server.
2. **Contacts permission text**: "Only the people you choose are added."
3. **A sign-in for Google's reviewers**: one review account with a fixed code, set by `WALLYT_REVIEW_EMAIL` and `WALLYT_REVIEW_CODE` on the server, with a demo group from `mise run review-account` (#98). The App access wording is in the Wallyt runbook.
4. **Release builds**: `eas.json` builds a signed `.aab` (`mise run build:android`), and a production build refuses to start without an `https://` server and allows no cleartext traffic.
5. **Permissions**: biometrics, storage and `SYSTEM_ALERT_WINDOW` are blocked. The release manifest asks only for internet, network state, vibrate and reading contacts.
6. **Server logs**: kept 3 days by migration, matching the privacy policy.
7. **Deleting a user in the database**: `created_by` no longer blocks it.

Still to do, by hand:

1. **Production server and domain.** Deploy per the Wallyt repo's `docs/deploy.md`, with SMTP, Google sign-in and the two review variables, then run `mise run review-account` against it.
2. **EAS and signing.** `eas init`, the `WALLYT_PRODUCTION_API_URL` EAS variable, the first build (let EAS create the upload key), then Play App Signing's SHA-1 on the Android OAuth client.
3. **Play Console.** Create the app under the Leeman Group LLC developer account, fill in App content with the answers below, upload the first `.aab` by hand to internal testing, and add the store listing graphics.
4. **Developer name.** The deletion page says "Wallyt, by Leeman Software". If the Play developer name ends up "Leeman Group LLC", change `meta` in `src/pages/wallyt/delete-account.astro` to match it exactly.
5. **Sign in with Apple.** The privacy policy mentions it. Android doesn't need it; don't add the button without the server side.

## Data safety answers (draft)

Encrypted in transit: **yes**. Users can request deletion: **yes**. No data is sold, and nothing is shared with third parties in Play's sense. The providers in the privacy policy act on our behalf, and data shown to other group members is shown at the user's own request.

| Data type | Collected | Required? | Purposes |
|---|---|---|---|
| Personal info: Name | Yes | Required | App functionality, Account management |
| Personal info: Email address | Yes | Required | App functionality, Account management |
| Personal info: User IDs (Google account ID) | Yes | Optional (Google sign-in only) | Account management |
| Photos and videos: Photos | Yes | Optional | App functionality |
| Contacts (names, emails and phone numbers of the people a user adds) | Yes (only the people a user picks or types in) | Optional | App functionality |
| Financial info: Other financial info (who owes whom) | Yes | Required | App functionality |
| App activity: Other user-generated content (expenses, notes, group names) | Yes | Required | App functionality |
| Location, Messages, Device IDs, Health, Web browsing, Crash logs, Diagnostics | No | | |

Re-check this table against the code before submitting if anything has changed.

## Other App content forms

- **Ads:** No ads.
- **Target audience:** 18 and over (the privacy policy says not for children under 13). This keeps the Families policy out of scope.
- **Content rating:** answer the questionnaire. There's no user-to-user chat, but there is user-generated text (notes) visible to group members.
- **Financial features:** Wallyt doesn't move money, lend, bank or trade. Pick the option closest to expense tracking, or "none" if no option fits.
- **Government app, news app, health:** No.

## Store listing (draft)

- **App name** (30 max): `Wallyt: Split Bills & Expenses`
- **Short description** (80 max): `Split rent, trips and dinners. Everyone sees the same balances, in any currency.`
- **Full description:**

> Wallyt keeps track of shared costs, so nobody has to keep a spreadsheet or remember who paid last.
>
> Make a group for your apartment, a trip or a standing dinner and share one link to bring everyone in. Add people before they join, by name or from your contacts, and start splitting right away.
>
> • Split equally, by exact amounts, by percentage or by shares, with one person paying or several
> • 161 currencies, converted at that day's exchange rate
> • Simplify debts settles the whole group in as few payments as possible
> • Repeating expenses for rent and subscriptions
> • A full history of every change, and deletes you can undo
> • Import from Splitwise or any spreadsheet, and export to CSV
> • No passwords: sign in with an email code or with Google
>
> Free, with no ads. No tracking. Your data is never sold.

- **Category:** Finance. **Tags:** expense splitting, bill splitting.
- **Graphics:** 512×512 icon, 1024×500 feature graphic, 2 to 8 phone screenshots.
