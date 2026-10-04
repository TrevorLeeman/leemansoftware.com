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
  /** The product's own brand color, used for small accents next to it. */
  color: string;
  /** A real screen from the product, shown in a browser or phone outline. */
  shot: { src: string; dark?: string; frame: 'browser' | 'phone'; alt: string };
};

export const products: Product[] = [
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
      frame: 'phone',
      alt: 'Wallyt’s home screen for a ski trip group: Cara owes you $202.15, above the trip’s expenses.',
    },
  },
  {
    slug: 'osrs-exchange',
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
      frame: 'browser',
      alt: 'OSRS Exchange’s Grand Exchange Tracker: a table of items with live buy and sell prices, margin, tax, profit and return.',
    },
  },
  {
    slug: 'rs3-exchange',
    name: 'RS3 Exchange',
    summary:
      'The same live market for RuneScape 3, built on the engine behind OSRS Exchange.',
    platforms: 'Web',
    status: 'live',
    href: 'https://www.rs3.exchange',
    external: true,
    icon: '/products/rs3-exchange.webp',
    color: '#047857',
    shot: {
      src: '/shots/rs3-exchange.webp',
      frame: 'browser',
      alt: 'RS3 Exchange’s Grand Exchange Tracker: the same live table of prices and profits for RuneScape 3 items.',
    },
  },
];
