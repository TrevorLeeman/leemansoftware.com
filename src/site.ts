import { url } from './url';

// Facts that appear on more than one page. Change them here, not in the pages.

export const company = {
  brand: 'Leeman Software',
  legalName: 'Leeman Group LLC',
  domain: 'leemansoftware.com',
  url: 'https://leemansoftware.com',
  /** What the studio does, after its name in the home page's search result. */
  tagline: 'Web and Android apps, built end to end',
};

// The one address for everything: questions, Wallyt help and privacy requests.
export const email = 'hello@leemansoftware.com';

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
};

export const organizationRef = { '@id': organization['@id'] };

export const jagexNotice =
  'OSRS Exchange and RS3 Exchange are independent and not affiliated with Jagex Ltd. RuneScape and Old School RuneScape are trademarks of Jagex Ltd.';

/** Wallyt's Google Play listing. Linked once Wallyt's status is 'live'. */
export const wallytPlayUrl = 'https://play.google.com/store/apps/details?id=com.wallyt.app';

export type Link = { label: string; href: string; external?: boolean };

export type Product = {
  slug: string;
  name: string;
  summary: string;
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
    summary:
      'Live Grand Exchange prices for Old School RuneScape, with margins, tax and profit worked out for every item as trades happen.',
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
      { label: 'Discord', href: 'https://discord.gg/BV4vGeKFUt', external: true },
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
    summary:
      'The same live market for RuneScape 3, with years of price history behind every item.',
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
      { label: 'Discord', href: 'https://discord.gg/BV4vGeKFUt', external: true },
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
    summary:
      'Split rent, trips and dinners with the people you share them with. Everyone sees the same balances, in any currency, and settles up in as few payments as possible.',
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
