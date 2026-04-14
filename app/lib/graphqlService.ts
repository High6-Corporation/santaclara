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
      next: { revalidate: 60 }, // Cache for 1 minute
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
      next: { revalidate: 3600 }, // Cache for 1 hour
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
      next: { revalidate: 3600 },
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
      next: { revalidate: 3600 },
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
