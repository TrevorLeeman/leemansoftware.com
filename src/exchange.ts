import { company, discord, email, osrsPageViews, playerCount, premium, product, usd, type QA } from './site';

// What the two Exchange pages say. OSRS Exchange and RS3 Exchange are one app run for two games, so
// the copy is written once here, with each game's own facts filled in where the games differ (tax
// rules, ads, launch, player quotes). Checked against the osrs-exchange repo and both live sites on
// 2026-10-04. When the sites change, change it here.
//
// The pages are written for a player deciding whether to use the site or pay for Premium: what
// they'd use it for, what other players say, what's free and what Premium adds, where the numbers
// come from, who runs it, and the questions they came with. They leave the searches the products
// rank for themselves ("Grand Exchange prices", "live GE tracker") to osrs.exchange and
// rs3.exchange: those phrases appear only as the text of links there.

export type Point = { title: string; body: string; tag?: string; link?: { label: string; href: string } };
export type Quote = { text: string; who: string; where: string; when?: string; image: string; width: number; height: number };
export type Plan = { name: string; price: string; note: string; points: string[] };

/** How often prices and alerts are checked, in seconds, and how many alerts each plan has. */
export const limits = { refresh: { free: 30, premium: 6 }, alertCheck: 6, alerts: { free: 1, premium: 25 }, freeNotifications: 3 };

export const exchange = (slug: 'osrs-exchange' | 'rs3-exchange') => {
  const p = product(slug);
  const osrs = slug === 'osrs-exchange';
  const other = product(osrs ? 'rs3-exchange' : 'osrs-exchange');
  const site = p.site!;
  const host = new URL(site).hostname.replace(/^www\./, '');
  const game = osrs ? 'Old School RuneScape' : 'RuneScape 3';
  const abbr = osrs ? 'OSRS' : 'RS3';
  const price = `${usd(premium.monthly)} a month or ${usd(premium.annual)} a year`;
  // Each game's prices come from its own wiki.
  const wiki = osrs ? 'OSRS Wiki' : 'RuneScape Wiki';

  // What a player does with the site, each with a link into the tool that does it.
  const jobs: Point[] = [
    {
      title: 'Find a flip worth making',
      tag: 'Free',
      body: 'One table of every tradeable item: buy and sell price, margin after tax, daily volume and buy limit. Sort it by profit and filter out what doesn’t trade.',
      link: { label: `${abbr} Grand Exchange prices`, href: `${site}/` },
    },
    {
      title: 'Check an item before you commit',
      tag: 'Free',
      body: 'Every item has its own page, with price and volume charts from the last 24 hours back through years of trading, so you can tell a dip from a slide.',
      link: { label: osrs ? 'Dragon bones price history' : 'Elder rune bar price history', href: p.shot.url! },
    },
    {
      title: 'Earn from the skills you have',
      tag: 'Free to start',
      body: `See what each recipe makes at today’s prices. Type your RuneScape name and it shows only what your levels can make${osrs ? '' : ', up to level 120'}. Free-to-play recipes are free, and Premium opens the members’ ones.`,
      link: { label: `${abbr} recipe profit calculator`, href: `${site}/recipes` },
    },
    {
      title: 'Stop watching the screen',
      tag: 'Free to try',
      body: `Set a price on any item and get a Discord message or an email when it gets there. Alerts are checked every ${limits.alertCheck} seconds. One alert with ${limits.freeNotifications} notifications is free, and Premium gives you ${limits.alerts.premium} alerts with no limit.`,
      link: { label: `${abbr} price alerts`, href: `${site}/alerts` },
    },
    ...(osrs
      ? [
          {
            title: 'Fill Death’s Coffer for less',
            tag: 'Free',
            body: 'Death’s Coffer values what you sacrifice at 105% of its guide price. The calculator ranks the items that save you the most gold when you fill it.',
            link: { label: 'Death’s Coffer calculator', href: `${site}/deaths-coffer` },
          },
          {
            title: 'Pick up where you left off',
            tag: 'Free account',
            body: 'Favourite and pin the items you trade, and a free account keeps them in step on every device you sign in on.',
            link: { label: 'OSRS Exchange quick guide', href: `${site}/quick-guide` },
          },
        ]
      : []),
  ];

  // Messages players sent in the OSRS Exchange Discord, shown as the screenshots in
  // public/testimonials. RS3 Exchange is new and has none of its own, and never borrows these.
  const quotes: Quote[] = osrs
    ? [
        { text: 'gotta say, best site I’ve found for tracking prices', who: 'Bubba', image: '/testimonials/4_Bubba_best_price_site.png', width: 483, height: 114, where: 'Discord' },
        { text: 'Thanks mate, your sites amazing, new to flipping and it’s made it so easy', who: 'dropbear', image: '/testimonials/1_dropbear_flipping_made_easy.png', width: 560, height: 191, where: 'Discord', when: 'July 2023' },
        { text: 'This site is a hidden gem fr', who: 'Floppy', image: '/testimonials/3_Floppy_hidden_gem.png', width: 620, height: 116, where: 'Discord', when: 'June 2023' },
        { text: 'Its a priceless resource', who: 'Lendonos', image: '/testimonials/5_Lendonos_priceless_resource.png', width: 295, height: 96, where: 'Discord', when: 'April 2023' },
      ]
    : [];

  const plans: Plan[] = [
    {
      name: 'Free',
      price: '$0',
      note: `No account needed for prices, charts and recipes. ${osrs ? 'Shows ads.' : 'No ads.'}`,
      points: [
        'The full price table, with margins after tax, volume and buy limits',
        'A page and charts for every item',
        'Recipe profit for free-to-play recipes, filtered by your levels',
        ...(osrs ? ['The Death’s Coffer calculator'] : []),
        `${limits.alerts.free} price alert, with ${limits.freeNotifications} notifications in total`,
        'Favourites and pinned items on every device, with a free account',
        `New prices checked every ${limits.refresh.free} seconds`,
      ],
    },
    {
      name: 'Premium',
      price: `${usd(premium.monthly)} a month`,
      note: `Or ${usd(premium.annual)} a year. New members get a ${premium.trialDays}-day free trial.`,
      points: [
        `New prices checked every ${limits.refresh.premium} seconds`,
        'Every members’ recipe',
        `${limits.alerts.premium} price alerts, with no limit on notifications`,
        'Saved table presets and unlimited item lists',
        'Trend percentages and trend-filled charts',
        'Buy and sell pressure on every item',
        'Margin lines on charts, showing profit after tax',
        ...(osrs ? ['No ads'] : []),
      ],
    },
  ];

  // Where the numbers on the site come from, for the player who wants to check them.
  const sources: Point[] = [
    {
      title: 'Live prices from the Wiki',
      body: `Buy and sell prices come from the ${wiki}’s real-time price data, which reports what items are actually trading for. The feed refreshes about once a minute, and ${p.name} checks it every ${limits.refresh.free} seconds, or every ${limits.refresh.premium} on Premium.`,
    },
    osrs
      ? {
          title: 'Years of history',
          body: 'Long-range charts are drawn from WeirdGloop’s archive of daily Grand Exchange prices, which goes back years.',
        }
      : {
          title: 'History older than the feed',
          body: 'RuneScape 3’s real-time price feed only began in July 2026, so longer charts are drawn from WeirdGloop’s archive of daily Grand Exchange prices, which goes back five years and more.',
        },
    {
      title: 'Tax worked out for you',
      body: osrs
        ? 'Every profit is after the Grand Exchange’s 2% tax, with its 5 million gp cap, no tax on prices under 50 gp, and the exempt items such as bonds.'
        : 'Every profit is after the Grand Exchange’s 2% tax, which has no cap in RuneScape 3, with no tax on prices under 50 gp and the bond exempt.',
    },
    {
      title: 'Levels from the hiscores',
      body: `The recipe filter reads your levels from Jagex’s public hiscores, using the name you type. ${p.name} never asks for your game login.`,
    },
  ];

  // Who is behind the site and how it's run: what a player wants to know before paying.
  const runs: Point[] = [
    {
      title: osrs ? `Independent since ${company.since}` : 'One platform, two games',
      body: osrs
        ? `We started OSRS Exchange in July ${company.since} and have shipped every release since. More than ${playerCount} players have used it.`
        : `We started OSRS Exchange in July ${company.since} and brought the same platform to RuneScape 3 in 2026. Both sites ship from one codebase.`,
    },
    {
      title: 'Your card stays with Stripe',
      body: `Premium is billed by Stripe. Card details go straight to Stripe and never reach ${p.name}’s servers.`,
    },
    {
      title: `Charges read ${premium.statement}`,
      body: osrs
        ? `Premium shows on your card statement as ${premium.statement}, whether you signed up here or on ${other.name}.`
        : `One membership covers both sites, so Premium bought on ${p.name} shows on your card statement as ${premium.statement}.`,
    },
    {
      title: 'A person answers',
      body: 'Questions on Discord or by email come straight to us, the studio that writes the code, not to an outsourced support queue.',
      link: { label: `${p.name} on Discord`, href: discord },
    },
    {
      title: 'Proven to work and scale',
      body: osrs
        ? `More than 4,000 automated tests cover prices, tax rules, alerts and payments, and the platform has carried more than ${playerCount} players and ${osrsPageViews} page views.`
        : `More than 4,000 automated tests cover prices, tax rules, alerts and payments, on the platform that has run OSRS Exchange since ${company.since}.`,
    },
    {
      title: 'Independent of Jagex',
      body: `${p.name} isn’t affiliated with Jagex. It reads public price data and never touches your game account.`,
    },
  ];

  const questions: QA[] = [
    {
      q: `Is ${p.name} free?`,
      a: `Yes. The price table, every item’s charts${osrs ? ', the Death’s Coffer calculator' : ''} and recipe profit for free-to-play recipes are free and need no account. ${osrs ? 'The free plan shows ads.' : 'There are no ads on any plan.'} Premium is ${price} and adds faster price checks, members’ recipes and more alerts${osrs ? ', and removes the ads' : ''}.`,
    },
    {
      q: `How much is ${p.name} Premium?`,
      a: `${price[0].toUpperCase()}${price.slice(1)}. New members get a ${premium.trialDays}-day free trial first: it needs a card, and nothing is charged until it ends. One membership covers both ${p.name} and ${other.name}.`,
    },
    {
      q: `How do I cancel ${p.name} Premium?`,
      a: `From your account settings on ${host}. Cancelling stops future charges, you keep Premium until the end of the period you’ve paid for, and your presets, item lists and favourites stay on your account.`,
    },
    {
      q: 'Can I get a refund?',
      a: `Refunds are handled case by case and in good faith. Ask in the ${p.name} Discord or email ${email} from your account’s email address. An approved refund goes back through Stripe and takes 5 to 10 business days to appear.`,
    },
    {
      q: `I don’t recognise a charge from ${premium.statement}. What is it?`,
      a: `A Premium membership, ${price}, started on ${osrs ? 'osrs.exchange or rs3.exchange' : 'rs3.exchange or osrs.exchange'}. Both sites bill as ${premium.statement}. If it wasn’t you, email ${email} before disputing it and it will be looked into.`,
    },
    {
      q: 'Where do the prices come from?',
      a: `From the ${wiki}’s real-time price data, which reports what items are actually trading for. Long-range history comes from WeirdGloop’s archive of daily Grand Exchange prices.`,
    },
    {
      q: 'How often do the prices update?',
      a: `The Wiki’s feed refreshes about once a minute. ${p.name} checks it every ${limits.refresh.free} seconds on the free plan and every ${limits.refresh.premium} seconds on Premium, so Premium sees a move sooner.`,
    },
    {
      q: 'Are the margins after Grand Exchange tax?',
      a: osrs
        ? 'Yes. Every profit is after the 2% tax, with its 5 million gp cap, no tax on prices under 50 gp, and the exempt items such as bonds.'
        : 'Yes. Every profit is after the 2% tax, which has no cap in RuneScape 3, with no tax on prices under 50 gp and the bond exempt.',
    },
    {
      q: 'Do I need an account?',
      a: `Not to look up prices, charts or recipes. A free account, made with an email address or Google, adds favourites that follow you across devices and one price alert with ${limits.freeNotifications} notifications.`,
    },
    {
      q: `Does my membership cover ${other.name} too?`,
      a: `Yes. One membership covers both sites. Sign in with the same account on ${other.name} and Premium is already there.`,
    },
    {
      q: `Does ${p.name} need my RuneScape login?`,
      a: 'No, and it never asks for it. The recipe filter reads your levels from Jagex’s public hiscores, using the name you type.',
    },
    {
      // RuneLite is an Old School client, so only OSRS players ask about a plugin for it.
      q: osrs ? 'Is there an OSRS Exchange app or RuneLite plugin?' : 'Is there an RS3 Exchange app?',
      a: `No. ${p.name} is a website that works in any phone or desktop browser. It doesn’t connect to your game client or log your trades for you.`,
    },
    {
      q: `How is it different from the ${wiki}’s price pages?`,
      a: `${p.name} uses the Wiki’s price data and builds tools on top of it: a sortable table of margins after tax, recipe profit filtered by your own levels${osrs ? ', a Death’s Coffer calculator' : ''} and price alerts by Discord message or email.`,
    },
    ...(osrs
      ? [
          {
            q: 'How is OSRS Exchange different from GE Tracker?',
            a: `They’re separate, independent websites. On OSRS Exchange the price table, item charts and free-to-play recipe profit are free without an account, Premium is ${usd(premium.monthly)} a month, and the same membership covers RS3 Exchange.`,
          },
        ]
      : []),
    {
      q: `Who makes ${p.name}?`,
      a: `${company.brand}, an independent software studio founded by ${company.founder}. We’ve built and run ${osrs ? `it since ${company.since}` : 'it since its launch in 2026, on the platform behind OSRS Exchange'}. ${p.name} is not affiliated with Jagex Ltd, the makers of ${game}.`,
    },
  ];

  return {
    product: p,
    other,
    site,
    host,
    title: `${p.name}: what it is, what it costs`,
    description: osrs
      ? `OSRS Exchange is a free Grand Exchange price tracker for Old School RuneScape, used by ${playerCount}+ players. What’s free, what Premium costs and who runs it.`
      : 'RS3 Exchange is a free Grand Exchange price tracker for RuneScape 3, with no ads on any plan. What’s free, what Premium costs and who runs it.',
    lede: osrs
      ? `${p.definition} More than ${playerCount} players have used it since ${company.since}, across ${osrsPageViews} page views.`
      : `${p.definition} It launched in 2026 on the platform behind OSRS Exchange.`,
    jobs,
    quotes,
    plans,
    /** What both plans share, said once under them. */
    billing: `One membership covers both ${p.name} and ${other.name}. The ${premium.trialDays}-day trial needs a card and charges nothing until it ends. Billing runs through Stripe and shows on your statement as ${premium.statement}. Cancel from your account settings and you keep Premium to the end of the period you paid for.`,
    sources,
    runs,
    questions,
    /**
     * For schema.org. The YouTube channel is named for OSRS Exchange, so only it claims the
     * channel: both claiming it would tell a search engine the two sites are one thing.
     */
    sameAs: osrs ? ['https://www.youtube.com/@OSRSExchange'] : [],
    /** For schema.org: what the app does, and what each plan costs. */
    features: [
      'Live buy and sell prices for every tradeable item',
      'Profit after Grand Exchange tax',
      'Price and volume charts',
      'Recipe profit calculator',
      'Price alerts by Discord message or email',
      ...(osrs ? ['Death’s Coffer calculator'] : []),
    ],
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', url: site },
      {
        '@type': 'Offer',
        name: 'Premium, monthly',
        price: premium.monthly.toFixed(2),
        priceCurrency: 'USD',
        url: `${site}/premium`,
        description: `One membership covers ${p.name} and ${other.name}. New members get a ${premium.trialDays}-day free trial.`,
      },
      {
        '@type': 'Offer',
        name: 'Premium, annual',
        price: premium.annual.toFixed(2),
        priceCurrency: 'USD',
        url: `${site}/premium`,
        description: `One membership covers ${p.name} and ${other.name}. New members get a ${premium.trialDays}-day free trial.`,
      },
    ],
  };
};
