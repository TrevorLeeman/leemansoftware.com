# Wallyt on Google Play

Everything the Play Console asks for that this site answers, and what still has to happen before the first release. Written 2026-10-02, updated 2026-10-04.

`/wallyt` is Wallyt's own subsite: its header, footer and colors are Wallyt's, and every Wallyt page links to its support, privacy policy, terms and account deletion. The studio's pages don't link to Wallyt's policies, only to `/wallyt`.

## Links to paste into the Console

| Console field | Value |
|---|---|
| Store settings > Store listing contact details > Website | https://leemansoftware.com/wallyt |
| Store settings > Store listing contact details > Email | hello@leemansoftware.com |
| App content > Privacy policy | https://leemansoftware.com/wallyt/privacy |
| App content > Data safety > Delete account URL | https://leemansoftware.com/wallyt/delete-account |
| Developer page > Website (optional) | https://leemansoftware.com |

Google Cloud OAuth consent screen (Sign in with Google), Branding:

| Field | Value |
|---|---|
| App name | Wallyt |
| App home page | https://leemansoftware.com/wallyt |
| Privacy policy | https://leemansoftware.com/wallyt/privacy |
| Terms of service | https://leemansoftware.com/wallyt/terms |
| Authorized domain | leemansoftware.com (verify it in Google Search Console first) |

## What the website covers

| Requirement | Where |
|---|---|
| Privacy policy: public, not a PDF, names the app and the developer, says what's collected, used and shared, how long it's kept and how to delete it | `/wallyt/privacy` |
| Account deletion page: names the app and developer as on the store listing, gives the steps, says what's deleted and what's kept, and for how long | `/wallyt/delete-account` |
| A way to contact the developer | Every Wallyt page's footer, `/wallyt/support`, `/wallyt#maker` |
| OAuth home page: describes the app, links the privacy policy, on a verified domain | `/wallyt` |
| Terms (OAuth consent screen, and a future App Store listing) | `/wallyt/terms`. A plain-language draft: have it reviewed, and add a governing-law clause if you want one |

The deletion page shows "Wallyt, by Leeman Software". If the Play developer name is "Leeman Group LLC" instead, change that line (`meta` in `src/pages/wallyt/delete-account.astro`) to match it exactly.

When Wallyt goes live, set its `status` to `'live'` in `src/site.ts`. Every "coming soon" line then becomes a Get it on Google Play link to `wallytPlayUrl`.

## Before the first upload

These are in the Wallyt repo, not here, and the pages on this site assume them. None of them was done as of 2026-10-04.

1. **In-app account deletion.** Play requires a way to delete the account from inside the app as well as the web page. Wallyt has none yet (no hook runs on user deletion either). Build it to do what `/wallyt/delete-account` promises:
   - delete the user record, its Google/Apple link and sessions;
   - blank the email and photo on every member row that was theirs, keeping the name so balances still add up;
   - delete groups where they were the only person;
   - hand ownership of shared groups to an admin, or to another member when there are none.
   Then add "In the app: Account, then Delete account" as the first option on the deletion page.
2. **Contacts permission text.** `app.config.ts` says contacts "stay on your phone", but the names and emails of people you pick are uploaded, and so are their photos when an owner or admin adds them. Reword it, for example: "Wallyt uses your contacts so you can add people to a group without typing their names and emails. Only the people you choose are added."
3. **A sign-in path for Google's reviewers.** Sign-in is by emailed code, and a reviewer can't read the inbox. The App access form needs working credentials, for example one review account with a fixed code.
4. **Production server and domain.** Deploy per `docs/deploy.md` in the Wallyt repo and build with `WALLYT_PRODUCTION_API_URL`.
5. **Release signing.** Use EAS Build (or an upload keystore). Today's release build is signed with the debug key.
6. **Smaller cleanups.** Turn off `usesCleartextTraffic` in production builds, and add `android.permission.SYSTEM_ALERT_WINDOW` to `blockedPermissions`. The release manifest also asks for `USE_BIOMETRIC`, `USE_FINGERPRINT` and storage permissions up to Android 12: block what Wallyt doesn't use before filling in Data safety.
7. **Server logs.** The privacy policy says server logs (with IP addresses) are deleted after a few days. Check the log retention in the production PocketBase admin (Settings > Logs) and keep it at a few days.
8. **Sign in with Apple.** The privacy policy mentions it. If production won't have Apple configured, either is fine, but don't add the button without the server side.
9. **Deleting an account in the database.** `expenses.created_by` and `imports.created_by` require a user, so deleting a user who has added anything will fail until those relations allow it (or the deletion hook clears them).

## Data safety answers (draft)

Encrypted in transit: **yes**. Users can request deletion: **yes**. No data is sold, and nothing is shared with third parties in Play's sense. The providers in the privacy policy act on our behalf, and data shown to other group members is shown at the user's own request.

| Data type | Collected | Required? | Purposes |
|---|---|---|---|
| Personal info: Name | Yes | Required | App functionality, Account management |
| Personal info: Email address | Yes | Required | App functionality, Account management |
| Personal info: User IDs (Google account ID) | Yes | Optional (Google sign-in only) | Account management |
| Photos and videos: Photos | Yes | Optional | App functionality |
| Contacts | Yes (only the people a user picks) | Optional | App functionality |
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
