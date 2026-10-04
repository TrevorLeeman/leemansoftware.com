// Facts that appear on more than one page. Change them here, not in the pages.

export const company = {
  brand: 'Leeman Software',
  legalName: 'Leeman Group LLC',
  domain: 'leemansoftware.com',
  url: 'https://leemansoftware.com',
};

// The one address for everything: questions, Wallyt help and privacy requests.
export const email = 'hello@leemansoftware.com';

export type Product = {
  slug: string;
  name: string;
  summary: string;
  platforms: string;
  status: 'live' | 'soon';
  href: string;
  external: boolean;
  icon: string;
  /** Our most used product: shown first, with its screen across the full width. */
  featured?: boolean;
  /** The product's own brand color, used for small accents next to it. */
  color: string;
  /** A real screen from the product, shown in a browser or phone outline. */
  shot: {
    src: string;
    /** A half-width copy for small screens. */
    small?: string;
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
    featured: true,
    name: 'OSRS Exchange',
    summary:
      'Live Grand Exchange prices for Old School RuneScape, with margins, tax and profit worked out for every item as trades happen.',
    platforms: 'Web',
    status: 'live',
    href: 'https://www.osrs.exchange',
    external: true,
    icon: '/products/osrs-exchange.webp',
    color: '#4f46e5',
    shot: {
      src: '/shots/osrs-exchange.webp',
      small: '/shots/osrs-exchange-800.webp',
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
    href: 'https://www.rs3.exchange',
    external: true,
    icon: '/products/rs3-exchange.webp',
    color: '#047857',
    shot: {
      src: '/shots/rs3-exchange.webp',
      small: '/shots/rs3-exchange-800.webp',
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
    href: '/wallyt',
    external: false,
    icon: '/products/wallyt.webp',
    color: '#0f766e',
    shot: {
      src: '/shots/wallyt-light.webp',
      dark: '/shots/wallyt-dark.webp',
      width: 640,
      height: 1386,
      frame: 'phone',
      alt: 'Wallyt’s home screen for a ski trip group: Cara owes you $202.15, above the trip’s expenses.',
    },
  },
];
