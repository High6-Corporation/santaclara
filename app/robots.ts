import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/404', '/coming-soon', '/maintenance', '/thank-you'],
    },
    sitemap: 'https://santaclaraplywood.com/sitemap.xml',
  };
}
