// Facts that appear on more than one page. Change them here, not in the pages.

export const company = {
  brand: 'Leeman Software',
  legalName: 'Leeman Group LLC',
  domain: 'leemansoftware.com',
  url: 'https://leemansoftware.com',
};

// Every address forwards to the same inbox (Cloudflare Email Routing, see README).
export const email = {
  hello: 'hello@leemansoftware.com',
  support: 'support@leemansoftware.com',
  privacy: 'privacy@leemansoftware.com',
};

export type Product = {
  slug: string;
  name: string;
  summary: string;
  platforms: string;
  status: 'live' | 'soon';
  href: string;
  external: boolean;
  icon: string;
};

export const products: Product[] = [
  {
    slug: 'wallyt',
    name: 'Wallyt',
    summary:
      'Split rent, trips and dinners with the people you share them with. Everyone sees the same balances, in any currency, and settling up takes as few payments as possible.',
    platforms: 'Android, coming soon',
    status: 'soon',
    href: '/wallyt',
    external: false,
    icon: '/products/wallyt.webp',
  },
  {
    slug: 'osrs-exchange',
    name: 'OSRS Exchange',
    summary:
      'Live Grand Exchange prices for Old School RuneScape: real-time trades, market trends and high-margin flips, updated as they happen.',
    platforms: 'Web',
    status: 'live',
    href: 'https://www.osrs.exchange',
    external: true,
    icon: '/products/osrs-exchange.webp',
  },
  {
    slug: 'rs3-exchange',
    name: 'RS3 Exchange',
    summary:
      'The same live market for RuneScape 3: Grand Exchange prices, trends and flips, built on the same engine as OSRS Exchange.',
    platforms: 'Web',
    status: 'live',
    href: 'https://www.rs3.exchange',
    external: true,
    icon: '/products/rs3-exchange.webp',
  },
];
