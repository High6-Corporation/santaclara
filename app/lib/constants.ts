// App-wide constants and configuration
export const SITE_CONFIG = {
  name: 'Santa Clara Plywood',
  description: 'Premium plywood solutions with quality, durability, and sustainability',
  url: 'https://santaclara.com',
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
