import type { MetadataRoute } from 'next';

// NOTE: To block indexing of the WordPress admin domain (admin.santaclaraplywood.com),
// configure robots.txt on the WordPress side via Rank Math SEO → General Settings → robots.txt,
// or add the following to the WP server's nginx/apache config:
//   User-agent: *
//   Disallow: /

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/404',
          '/coming-soon',
          '/maintenance',
          '/thank-you',
        ],
      },
    ],
    sitemap: 'https://santaclaraplywood.com/sitemap.xml',
  };
}
