// WordPress GraphQL Configuration
const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://santaclaraplywood.beta02.site/graphql';
const WP_QUERY_ID = '86c84bde4ab5f79ffb12787a019820e84c00e1c3454924bc9d68e97d46389b06';

// Product Category Types
export interface ProductCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  productCategoryBanner?: {
    categoryBanner?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    };
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText?: string;
      };
    };
  };
}

// Product Types
export interface Product {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  productCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  productGalleries?: {
    imageAndVideoGalleries: Array<{
      fileType: string[];
      file: {
        node: {
          sourceUrl: string;
        };
      };
    }>;
  };
  productMoreInfo?: {
    moreInfo: string;
  };
  productApplication?: {
    application: string;
  };
}

export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  date: string;
  excerpt: string;
  featuredImage?: {
    node: {
      mediaItemUrl: string;
      altText: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}

// Extract URL from excerpt/description
export function extractUrlFromExcerpt(excerpt: string): string | null {
  if (!excerpt) return null;
  
  // Remove HTML tags
  const plainText = excerpt.replace(/<[^>]*>/g, '');
  
  // Check if the plain text is a URL
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  
  if (urlPattern.test(plainText.trim())) {
    // Add https:// if not present
    return plainText.trim().startsWith('http') 
      ? plainText.trim() 
      : `https://${plainText.trim()}`;
  }
  
  return null;
}

export interface PostsResponse {
  data?: {
    posts: {
      nodes: Post[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

// Fetch posts from WordPress GraphQL
export async function fetchPosts(first: number = 4, after: string | null = null): Promise<PostsResponse> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: WP_QUERY_ID,
        variables: {
          first,
          after,
        },
      }),
      next: { revalidate: 60, tags: ['wordpress-posts', 'wordpress-sitemap'] }, // Cache for 1 minute
    });

    if (!response.ok) {
      console.error('GraphQL request failed:', response.statusText);
      return { errors: [{ message: 'Failed to fetch posts' }] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }] };
  }
}

// Fetch single post by slug from WordPress GraphQL
export interface SinglePostResponse {
  data?: {
    post: Post;
  };
  errors?: Array<{
    message: string;
  }>;
}

export async function fetchPostBySlug(slug: string): Promise<SinglePostResponse> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPostBySlug($slug: ID!) {
            post(id: $slug, idType: SLUG) {
              id
              slug
              title
              content
              date
              excerpt
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
            }
          }
        `,
        variables: {
          slug,
        },
      }),
      next: { revalidate: 60, tags: ['wordpress-posts'] }, // Cache for 1 minute
    });

    if (!response.ok) {
      console.error('GraphQL request failed:', response.statusText);
      return { errors: [{ message: 'Failed to fetch post' }] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return { errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }] };
  }
}

// Fetch product categories from WordPress GraphQL
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetProductCategories {
            productCategories(first: 100) {
              nodes {
                id
                databaseId
                name
                slug
                description
                productCategoryBanner {
                  categoryBanner {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600, tags: ['wordpress-products', 'wordpress-sitemap'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('GraphQL request failed:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return [];
    }

    return data.data?.productCategories?.nodes || [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

// Fetch a single product category by slug
export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetProductCategoryBySlug($slug: ID!) {
            productCategory(id: $slug, idType: SLUG) {
              id
              databaseId
              name
              slug
              description
              productCategoryBanner {
                categoryBanner {
                  node {
                    sourceUrl
                    altText
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600, tags: ['wordpress-products'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch product category:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data?.productCategory || null;
  } catch (error) {
    console.error('Error fetching product category by slug:', error);
    return null;
  }
}

// Fetch products by category slug
export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetAllProducts {
            products(first: 100) {
              nodes {
                id
                databaseId
                title
                slug
                content
                productCategories {
                  nodes {
                    name
                    slug
                  }
                }
                productGalleries {
                  imageAndVideoGalleries {
                    fileType
                    file {
                      node {
                        sourceUrl
                      }
                    }
                  }
                }
                productMoreInfo {
                  moreInfo
                }
                productApplication {
                  application
                }
              }
            }
          }
        `,
      }),
      next: { revalidate: 3600, tags: ['wordpress-products'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return [];
    }

    // Filter products client-side by category slug
    const allProducts = data?.data?.products?.nodes || [];
    return allProducts.filter((product: Product) => 
      product.productCategories?.nodes.some(
        (category) => category.slug === slug
      )
    );
  } catch (error) {
    console.error('Error fetching products by category slug:', error);
    return [];
  }
}

// Dealer Types
export interface Dealer {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string; // Contains Google Maps link
  details: {
    address: string;
    contactNumbers: Array<{
      mobileNumber: string;
    }>;
    emailAddress: string;
  };
  dealerRegions: {
    nodes: Array<{
      name: string;
      slug: string;
      taxonomyName?: string;
    }>;
  };
}

// Fetch all dealers
export async function getDealers(): Promise<Dealer[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: '7a395890b281c0d49726f0a98dbca2a536c7a4995f767bcd3197a407a6bbcf41',
      }),
      next: { revalidate: 3600, tags: ['wordpress-dealers'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch dealers:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return [];
    }

    return data?.data?.dealers?.nodes || [];
  } catch (error) {
    console.error('Error fetching dealers:', error);
    return [];
  }
}

// Helper function to extract coordinates from Google Maps URL
export function extractCoordinatesFromMapsUrl(url: string): { lat: number; lng: number } | null {
  if (!url) return null;
  
  try {
    // Match patterns like /@11.2445,125.0045,17z or /place/name/@11.2445,125.0045
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    
    if (match && match.length >= 3) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2])
      };
    }
  } catch (error) {
    console.error('Error parsing Google Maps URL:', error);
  }
  
  return null;
}

// Fetch dealer regions (tabs)
export async function getDealerRegions(): Promise<string[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: '28b910934666b9a399dfa1ae575838cf2295486225300c995f7e93cb6c461998',
      }),
      next: { revalidate: 3600, tags: ['wordpress-dealers'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch dealer regions:', response.statusText);
      return [];
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return [];
    }

    const regions = data?.data?.dealerRegions?.nodes || [];
    const regionNames = regions.map((region: { taxonomyName?: string; name?: string }) => {
      // Try different possible field names
      const name = region.taxonomyName || region.name || '';
      return name.toUpperCase();
    }).filter((name: string) => name); // Remove empty strings
    
    // Sort regions: NCR first, then alphabetically
    const ncrFirst = regionNames.filter((r: string) => r === 'NCR');
    const others = regionNames.filter((r: string) => r !== 'NCR').sort();
    
    return [...ncrFirst, ...others];
  } catch (error) {
    console.error('Error fetching dealer regions:', error);
    return [];
  }
}

// ============================================================
// Gallery Types & Queries
// ============================================================

export interface GalleryImageNode {
  sourceUrl: string;
  altText?: string;
}

export interface GalleryItem {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  galleryFields: {
    galleryImages: {
      nodes: GalleryImageNode[];
    };
  };
}

// Normalize galleryImages to a flat array
export function normalizeGalleryImages(galleryImages: GalleryItem['galleryFields']['galleryImages'] | undefined | null): GalleryImageNode[] {
  if (!galleryImages) return [];
  if (Array.isArray(galleryImages)) return galleryImages;
  return galleryImages?.nodes || [];
}

// Fetch all gallery posts
export async function getGalleries(): Promise<GalleryItem[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: '3e95dd6763c515b6d645475f9effe81e77f390d209a3d2ceb65e459183471998',
      }),
      next: { revalidate: 3600, tags: ['wordpress-galleries', 'wordpress-sitemap'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch galleries:', response.statusText);
      return [];
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return [];
    }

    return data?.data?.contentNodes?.nodes || [];
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
}

// Fetch a single gallery post by slug
export async function getGalleryBySlug(slug: string): Promise<GalleryItem | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: '395132d0a09ce9a132bf8098322f640dfc397b2804a9df750fe6890c31067ca9',
        variables: { slug },
      }),
      next: { revalidate: 3600, tags: ['wordpress-galleries'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch gallery:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data?.data?.gallery || null;
  } catch (error) {
    console.error('Error fetching gallery by slug:', error);
    return null;
  }
}

// ============================================================
// Rank Math SEO Integration
// ============================================================

import type { Metadata } from 'next';

export interface RankMathSEO {
  title: string;
  description: string;
  canonicalUrl: string;
  focusKeywords: string[] | null;
  breadcrumbTitle: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    image: {
      url: string;
    } | null;
  } | null;
}

export interface PageSEOResponse {
  data?: {
    page: {
      seo: RankMathSEO;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface PostSEOResponse {
  data?: {
    post: {
      seo: RankMathSEO;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface ProductCategorySEOResponse {
  data?: {
    productCategory: {
      seo: RankMathSEO;
    } | null;
  };
  errors?: Array<{ message: string }>;
}

export interface AllPagesSEOResponse {
  data?: {
    pages: {
      nodes: Array<{
        slug: string;
        uri: string;
        seo: RankMathSEO;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

// Fetch all pages SEO (bulk query)
export async function fetchAllPagesSEO(): Promise<AllPagesSEOResponse> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryId: '4d45c72014d814b4f254d5ecea5caec5fddb44df5f54f731a052fbe19d0f35ad',
      }),
      next: { revalidate: 3600, tags: ['wordpress-pages'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch all pages SEO:', response.statusText);
      return { errors: [{ message: 'Failed to fetch all pages SEO' }] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all pages SEO:', error);
    return { errors: [{ message: error instanceof Error ? error.message : 'Unknown error' }] };
  }
}

// Fetch page SEO by URI
export async function fetchPageSEOByUri(uri: string): Promise<RankMathSEO | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPageSEOByUri($uri: ID!) {
            page(id: $uri, idType: URI) {
              seo {
                title
                description
                canonicalUrl
                focusKeywords
                breadcrumbTitle
                openGraph {
                  title
                  description
                  url
                  type
                  image {
                    url
                  }
                }
              }
            }
          }
        `,
        variables: { uri },
      }),
      next: { revalidate: 3600, tags: ['wordpress-pages'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch page SEO:', response.statusText);
      return null;
    }

    const data: PageSEOResponse = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return null;
    }

    return data.data?.page?.seo || null;
  } catch (error) {
    console.error('Error fetching page SEO:', error);
    return null;
  }
}

// Fetch post SEO by slug
export async function fetchPostSEOBySlug(slug: string): Promise<RankMathSEO | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPostSEOBySlug($slug: ID!) {
            post(id: $slug, idType: SLUG) {
              seo {
                title
                description
                canonicalUrl
                focusKeywords
                breadcrumbTitle
                openGraph {
                  title
                  description
                  url
                  type
                  image {
                    url
                  }
                }
              }
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600, tags: ['wordpress-posts'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch post SEO:', response.statusText);
      return null;
    }

    const data: PostSEOResponse = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return null;
    }

    return data.data?.post?.seo || null;
  } catch (error) {
    console.error('Error fetching post SEO:', error);
    return null;
  }
}

// Fetch product category SEO by slug
export async function fetchProductCategorySEOBySlug(slug: string): Promise<RankMathSEO | null> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetProductCategorySEOBySlug($slug: ID!) {
            productCategory(id: $slug, idType: SLUG) {
              seo {
                title
                description
                canonicalUrl
                focusKeywords
                breadcrumbTitle
                openGraph {
                  title
                  description
                  url
                  type
                  image {
                    url
                  }
                }
              }
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600, tags: ['wordpress-products'] },
    });

    if (!response.ok) {
      console.error('Failed to fetch product category SEO:', response.statusText);
      return null;
    }

    const data: ProductCategorySEOResponse = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return null;
    }

    return data.data?.productCategory?.seo || null;
  } catch (error) {
    console.error('Error fetching product category SEO:', error);
    return null;
  }
}

// Convert Rank Math SEO data to Next.js Metadata
export function rankMathSEOToMetadata(seo: RankMathSEO | null): Metadata {
  if (!seo) {
    return {};
  }

  const metadata: Metadata = {
    title: seo.title || undefined,
    description: seo.description || undefined,
    keywords: seo.focusKeywords || undefined,
    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
  };

  if (seo.openGraph) {
    metadata.openGraph = {
      title: seo.openGraph.title || seo.title || undefined,
      description: seo.openGraph.description || seo.description || undefined,
      url: seo.openGraph.url || seo.canonicalUrl || undefined,
      type: (seo.openGraph.type as 'website' | 'article') || 'website',
      images: seo.openGraph.image?.url ? [{ url: seo.openGraph.image.url }] : undefined,
    };
  }

  return metadata;
}
