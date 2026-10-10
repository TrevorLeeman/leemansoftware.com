import { url } from './url';

// Facts that appear on more than one page. Change them here, not in the pages.

export const company = {
  brand: 'Leeman Software',
  legalName: 'Leeman Group LLC',
  domain: 'leemansoftware.com',
  url: 'https://leemansoftware.com',
  /** What the studio makes, after its name in the home page's search result. */
  tagline: 'OSRS Exchange, RS3 Exchange and Wallyt',
  /** The year the studio's first product, OSRS Exchange, was started. */
  since: 2022,
  /** The studio’s founder. */
  founder: 'Trevor Leeman',
  /** The headline on the studio's link card (public/og.png), remade with `mise run cards`. */
  card: ['Products people rely on.', 'Built and run to last.'],
};

// The one address for everything: questions, Wallyt help and privacy requests.
export const email = 'hello@leemansoftware.com';

/** The Exchange sites' Discord server, where players ask questions and get price alerts. */
export const discord = 'https://discord.gg/BV4vGeKFUt';

/**
 * How many players have used OSRS Exchange: unique lifetime visitors from the site's analytics,
 * "well over 500k" on 2026-10-04. It counts visitors, not accounts, and belongs to OSRS Exchange
 * alone (RS3 Exchange never quotes it). Round down when it changes, never up.
 */
export const playerCount = '500,000';
export const players = `${playerCount}+`;
/** OSRS Exchange lifetime page views, supplied by the studio owner. */
export const osrsPageViews = '5M+';

/**
 * Premium on both Exchange sites, from the osrs-exchange repo (packages/shared/src/constants.ts,
 * checked 2026-10-04). One membership covers both sites, and the charge reads `statement` on a
 * card statement.
 */
export const premium = { monthly: 4.99, annual: 49.99, trialDays: 7, statement: 'OSRS Exchange', checked: '2026-10-04' };

export const usd = (amount: number) => `$${amount.toFixed(2)}`;

const founderRef = { '@id': `${company.url}/about/#founder` };

/**
 * The studio as schema.org sees it. Every page describes it in full (see Base), so products and
 * pages point at it by its id: `publisher: organizationRef`.
 */
export const organization = {
  '@type': 'Organization',
  '@id': `${company.url}/#organization`,
  name: company.brand,
  legalName: company.legalName,
  url: `${company.url}/`,
  email,
  logo: { '@type': 'ImageObject', url: `${company.url}/apple-touch-icon.png`, width: 180, height: 180 },
  founder: { '@type': 'Person', ...founderRef, name: company.founder, jobTitle: 'Founder and developer', url: `${company.url}/about/` },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email, url: discord },
  knowsAbout: ['Web applications', 'Android apps', 'React Native', 'Next.js', 'NestJS', 'Stripe subscriptions', 'Discord bots', 'Real-time market data'],
  makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web and Android app development, from design to production' } },
};

export const organizationRef = { '@id': organization['@id'] };

export const jagexNotice =
  'OSRS Exchange and RS3 Exchange are independent and not affiliated with Jagex Ltd. RuneScape and Old School RuneScape are trademarks of Jagex Ltd.';

/** Wallyt's Google Play listing. Linked once Wallyt's status is 'live'. */
export const wallytPlayUrl = 'https://play.google.com/store/apps/details?id=com.wallyt.app';

export type Link = { label: string; href: string; external?: boolean };

/** A question a visitor asks, answered in plain text so the page, schema.org and /llms.txt share it. */
export type QA = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  /** One sentence that stands alone and starts with the name: what it is and who it's for. */
  definition: string;
  /** The line under the name on the product's own page: what it does for you. */
  tagline: string;
  /** The home page's paragraph: the outcome first, then what makes it trustworthy. */
  pitch: string;
  /** What it costs and where it stands, in a few words. */
  terms: string;
  /** The headline on its link card (public/og/<slug>.png), also read out as the card's alt text. */
  card: [string, string];
  platforms: string;
  status: 'live' | 'soon';
  /** The product's page on this site, its subsite's home. */
  href: string;
  /** The product itself, when it lives somewhere else (a website, a store listing). */
  site?: string;
  icon: string;
  /** Pixel-art icons are scaled without smoothing. */
  pixelIcon?: boolean;
  /** The product's own brand color, used for small accents next to it and across its subsite. */
  color: string;
  /** The same color, lightened to read on the dark theme. */
  colorDark: string;
  /** Links in the subsite's header. */
  nav: Link[];
  /** The subsite footer's links: help, community and policies. */
  footer: Link[];
  /** Fine print under the subsite's footer, such as a trademark notice. */
  notice?: string;
  /** A real screen from the product, shown in a browser or phone outline. */
  shot: {
    src: string;
    /** A half-width copy for small screens. */
    small?: string;
    /** A full-resolution copy for scaled-up 1440p and 4K screens. */
    large?: string;
    dark?: string;
    width: number;
    height: number;
    frame: 'browser' | 'phone';
    alt: string;
    /** The exact page the screen was taken from, shown in the browser outline and linked. */
    url?: string;
  };
};

export const products: Product[] = [
  {
    slug: 'osrs-exchange',
    name: 'OSRS Exchange',
    definition: `OSRS Exchange is a free website that shows live Grand Exchange prices for every tradeable item in Old School RuneScape, with the profit on each one worked out after tax.`,
    tagline: 'Know what’s worth flipping before you buy.',
    pitch: `Find out what’s worth flipping before you spend a coin. Live Grand Exchange prices for every tradeable item in Old School RuneScape, with the profit already worked out after tax. It’s free, and more than ${playerCount} players have used it.`,
    terms: `Free · Premium ${usd(premium.monthly)} a month`,
    card: ['Live Grand Exchange prices', 'for Old School RuneScape.'],
    platforms: 'Web',
    status: 'live',
    href: url('/osrs-exchange'),
    site: 'https://www.osrs.exchange',
    icon: url('/products/osrs-exchange.webp'),
    pixelIcon: true,
    color: '#4f46e5',
    colorDark: '#818cf8',
    nav: [],
    footer: [
      { label: 'Quick Guide', href: 'https://www.osrs.exchange/quick-guide', external: true },
      { label: 'Discord', href: discord, external: true },
      { label: 'Privacy policy', href: 'https://www.osrs.exchange/privacy-policy', external: true },
      { label: 'Terms of service', href: 'https://www.osrs.exchange/terms-of-service', external: true },
    ],
    notice: jagexNotice,
    shot: {
      src: url('/shots/osrs-exchange.webp'),
      small: url('/shots/osrs-exchange-800.webp'),
      large: url('/shots/osrs-exchange-2400.webp'),
      width: 1600,
      height: 925,
      frame: 'browser',
      url: 'https://www.osrs.exchange/item/dragon-bones',
      alt: 'OSRS Exchange’s one-month chart for Dragon bones with trend fill: buy and sell prices climbing from about 3,300 to 3,900 gp, marked Climbing, up 18.2% this month, with daily volume underneath.',
    },
  },
  {
    slug: 'rs3-exchange',
    name: 'RS3 Exchange',
    definition: `RS3 Exchange is a free website that shows live Grand Exchange prices for every tradeable item in RuneScape 3, with the profit on each one worked out after tax and no ads on any plan.`,
    tagline: 'See the profit before you place the offer.',
    pitch:
      'The same market tools for RuneScape 3: live prices and profit after tax, years of daily history, and no ads on any plan. One Premium membership covers both games.',
    terms: `Free, no ads · Premium ${usd(premium.monthly)} a month`,
    card: ['Live Grand Exchange prices', 'for RuneScape 3.'],
    platforms: 'Web',
    status: 'live',
    href: url('/rs3-exchange'),
    site: 'https://www.rs3.exchange',
    icon: url('/products/rs3-exchange.webp'),
    pixelIcon: true,
    color: '#047857',
    colorDark: '#34d399',
    nav: [],
    footer: [
      { label: 'Quick Guide', href: 'https://www.rs3.exchange/quick-guide', external: true },
      { label: 'Discord', href: discord, external: true },
      { label: 'Privacy policy', href: 'https://www.rs3.exchange/privacy-policy', external: true },
      { label: 'Terms of service', href: 'https://www.rs3.exchange/terms-of-service', external: true },
    ],
    notice: jagexNotice,
    shot: {
      src: url('/shots/rs3-exchange.webp'),
      small: url('/shots/rs3-exchange-800.webp'),
      large: url('/shots/rs3-exchange-2400.webp'),
      width: 1600,
      height: 925,
      frame: 'browser',
      url: 'https://www.rs3.exchange/item/elder-rune-bar',
      alt: 'RS3 Exchange’s five-year market price chart for the Elder rune bar: from about 12k gp in 2022 to a peak near 26k in 2024, back to about 14k now.',
    },
  },
  {
    slug: 'wallyt',
    name: 'Wallyt',
    definition: `Wallyt is a free app for splitting shared costs such as rent, trips and dinners: everyone in a group sees the same balances, and it simplifies settling up into as few payments as it can.`,
    tagline: 'Who owes whom, without the spreadsheet.',
    pitch:
      'Split rent, trips and dinners without a spreadsheet. Everyone in the group sees the same balances, in any of 161 currencies, and when it’s time to settle, Wallyt cuts the payments down to as few as it can.',
    terms: 'Free, no ads',
    card: ['Split rent, trips', 'and dinners.'],
    platforms: 'Android',
    status: 'soon',
    href: url('/wallyt'),
    icon: url('/products/wallyt.webp'),
    color: '#0f766e',
    colorDark: '#2dd4bf',
    nav: [
      { label: 'Support', href: url('/wallyt/support') },
      { label: 'Privacy', href: url('/wallyt/privacy') },
    ],
    footer: [
      { label: 'Support', href: url('/wallyt/support') },
      { label: 'Privacy policy', href: url('/wallyt/privacy') },
      { label: 'Terms of use', href: url('/wallyt/terms') },
      { label: 'Delete your account', href: url('/wallyt/delete-account') },
    ],
    shot: {
      src: url('/shots/wallyt-light.webp'),
      dark: url('/shots/wallyt-dark.webp'),
      width: 640,
      height: 1386,
      frame: 'phone',
      alt: 'Wallyt’s home screen for a ski trip group: Cara owes you $202.15, above the trip’s expenses.',
    },
  },
];

export const product = (slug: string) => products.find((p) => p.slug === slug)!;

/** Where a product that isn't out yet is headed, said the same way everywhere. */
export const comingSoon = 'Coming soon to Google Play';

/**
 * The scale of what the studio runs. Checked on 2026-10-04: items are the item
 * pages in both live sitemaps (4,512 and 7,061), commits are the merged history of OSRS/RS3
 * Exchange plus Wallyt's (2,846 and 156), tests are counted test cases across both (4,125 and 908).
 * Round down when they change, never up.
 */
export const scale = [
  { value: players, label: 'players have used OSRS Exchange' },
  { value: '11,500+', label: 'items tracked across two games' },
  { value: '3,000+', label: `commits since ${company.since}` },
  { value: '4,900+', label: 'automated tests' },
];

/**
 * The outside services the products are built on, each with what it means for the person using the
 * product (Wallyt's are built and tested). Not a list of everyone who handles data: each product's
 * privacy policy has that.
 */
export const integrations = [
  { title: 'Stripe', body: 'Takes your card for Premium, so the number never touches our servers. Checkout, sales tax, the free trial, renewals and cancelling all run there, and the charge reads OSRS Exchange.' },
  { title: 'Google', body: 'Sign in with the Google account you already have: One Tap on the Exchange sites, and Android’s own account sheet in Wallyt. No new password to remember.' },
  { title: 'Discord', body: 'Where price alerts arrive as a direct message, where players ask us questions, and where your Premium role follows your membership.' },
  { title: 'RuneScape Wiki', body: 'The source of every live price: the OSRS Wiki’s real-time data for Old School and the RuneScape Wiki’s for RuneScape 3, the same numbers players already check.' },
  { title: 'WeirdGloop', body: 'Years of daily Grand Exchange prices for both games, behind the long-range charts, so you can see how an item traded long before the live feed existed.' },
  { title: 'Amazon SES and Postmark', body: 'Sign-in codes, account emails and price alerts go out through Amazon SES. Newsletters go through Postmark, which honours bounces and unsubscribes automatically.' },
  { title: 'Cloudflare', body: 'In front of both Exchange sites, keeping them fast and reachable, with Turnstile keeping bots out of sign-up.' },
  { title: 'Frankfurter', body: 'Central-bank exchange rates for Wallyt’s 161 currencies, with a second source as backup. The rate of the day is saved with each expense, so a debt doesn’t drift with the market.' },
  { title: 'Sentry', body: 'Reports errors to us the moment they happen, with what’s needed to fix them.' },
];

/** What people ask about the studio itself. On the home page, in its schema.org data and in /llms.txt. */
export const studioQuestions: QA[] = [
  {
    q: `What is ${company.brand}?`,
    a: `${company.brand} is an independent software studio. We design, build and run OSRS Exchange and RS3 Exchange, websites with live Grand Exchange prices for RuneScape players, and Wallyt, an app for splitting shared costs, and we’re open to client projects.`,
  },
  {
    q: `Who is behind ${company.brand}?`,
    a: `${company.brand} was founded by ${company.founder} in ${company.since}, when OSRS Exchange began. We’ve designed, built and run every product here since, and answer support for all of them directly.`,
  },
  {
    q: `Why is there a charge from ${premium.statement} on my card?`,
    a: `OSRS Exchange and RS3 Exchange are ${company.brand} products, and a Premium membership on either shows on a card statement as ${premium.statement}. Billing runs through Stripe. If you don’t recognise the charge, email ${email} before disputing it and we’ll look into it.`,
  },
  {
    q: 'Are OSRS Exchange and RS3 Exchange affiliated with Jagex?',
    a: 'No. Both are independent websites that read public price data and never touch your game account. RuneScape and Old School RuneScape are trademarks of Jagex Ltd.',
  },
  {
    q: 'When does Wallyt come out?',
    a:
      product('wallyt').status === 'live'
        ? 'Wallyt is out now on Google Play for Android.'
        : `Wallyt is in testing and is coming to Google Play first. Email ${email} to be told when it’s out.`,
  },
  {
    q: 'How do I reach a person?',
    a: `Email ${email}. For the Exchange sites you can also ask in the Discord. Either way the reply comes from us, not a bot or an outsourced desk.`,
  },
  {
    q: 'Do you take on client work?',
    a: 'Yes. Everything we’ve shipped so far is our own, and we’re open to client projects too: web apps, Android apps, and the payments, sign-in and servers behind them.',
  },
];
