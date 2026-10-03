# Wallyt on Google Play

Everything the Play Console asks for that this site answers, and what still has to happen before the first release. Written 2026-10-02.

## Links to paste into the Console

| Console field | Value |
|---|---|
| Developer website | https://leemansoftware.com |
| Developer email (public) | support@leemansoftware.com |
| App > Privacy policy | https://leemansoftware.com/wallyt/privacy |
| Data safety > Delete account URL | https://leemansoftware.com/wallyt/delete-account |
| Store listing > Website | https://leemansoftware.com/wallyt |

## Before the first upload

These are in the Wallyt repo, not here, and the pages on this site assume them.

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
6. **Smaller cleanups.** Turn off `usesCleartextTraffic` in production builds, and add `android.permission.SYSTEM_ALERT_WINDOW` to `blockedPermissions`.

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
> • Any currency, converted at that day's exchange rate
> • Simplify debts settles the whole group in as few payments as possible
> • Repeating expenses for rent and subscriptions
> • A full history of every change, and deletes you can undo
> • Import your history from Splitwise
> • No passwords: sign in with an email code or with Google
>
> No ads. No tracking. Your data is never sold.

- **Category:** Finance. **Tags:** expense splitting, bill splitting.
- **Graphics:** 512×512 icon, 1024×500 feature graphic, 2 to 8 phone screenshots.
