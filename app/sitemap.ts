import type { MetadataRoute } from 'next';
import { getProductCategories, getGalleries, fetchPosts } from '@/lib/graphqlService';

const BASE_URL = 'https://santaclaraplywood.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data with graceful error handling — build won't fail if WP is down
  let categories: Awaited<ReturnType<typeof getProductCategories>> = [];
  let galleries: Awaited<ReturnType<typeof getGalleries>> = [];
  let posts: Awaited<ReturnType<typeof fetchPosts>> = {};

  try {
    [categories, galleries, posts] = await Promise.all([
      getProductCategories(),
      getGalleries(),
      fetchPosts(100), // fetch up to 100 posts for sitemap
    ]);
  } catch (error) {
    console.error('[Sitemap] Failed to fetch dynamic data from WordPress:', error);
    // Continue with empty arrays — static routes will still be generated
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dealer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/press`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Product category pages: /products/[slug]
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Gallery pages: /gallery/[slug]
  const galleryRoutes: MetadataRoute.Sitemap = galleries.map((gallery) => ({
    url: `${BASE_URL}/gallery/${gallery.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Press/Blog post pages: /press/[slug] (only include posts that have internal detail pages)
  const postSlugs = posts?.data?.posts?.nodes ?? [];
  const postRoutes: MetadataRoute.Sitemap = postSlugs
    .filter((post) => post.slug) // safety check
    .map((post) => ({
      url: `${BASE_URL}/press/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...categoryRoutes, ...galleryRoutes, ...postRoutes];
}
