const WP_GRAPHQL_URL = `${process.env.WP_SITE_URL}/graphql`;

interface MediaItem {
  node: {
    id: string;
    sourceUrl: string;
    mediaDetails: {
      sizes: Array<{
        sourceUrl: string;
        width: number;
        height: number;
      }>;
    };
  };
}

export interface ProductCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  link: string;
  productCategoryBanner: {
    featuredImage: MediaItem;
    categoryBanner: MediaItem;
  };
}

interface ProductCategoriesResponse {
  productCategories: {
    nodes: ProductCategory[];
  };
}

// Persisted query alias from WPGraphQL Smart Cache
const PERSISTED_QUERY_ALIAS = '0a546f0218f0c8493effe6758456d6086e21bda4b2278e79cdf982c1b6ffb29b';

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: PERSISTED_QUERY_ALIAS,
      }),
      // Enable caching with revalidation
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch product categories');
    }

    const data: ProductCategoriesResponse = json.data;
    return data.productCategories.nodes;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
}

export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  const categories = await getProductCategories();
  return categories.find((cat) => cat.slug === slug) || null;
}

// Product types
interface ProductGalleryItem {
  fileType: string;
  file: {
    node: {
      id: string;
      sourceUrl: string;
      mediaType: string;
      mediaDetails: {
        sizes: Array<{
          sourceUrl: string;
          width: number;
          height: number;
        }>;
      };
    };
  };
}

export interface Product {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  productCategories: {
    nodes: Array<{
      id: string;
      databaseId: number;
      name: string;
      slug: string;
    }>;
  };
  productMoreInfo: {
    moreInfo: string;
  };
  productApplication: {
    application: string;
  };
  productGalleries: {
    imageAndVideoGalleries: ProductGalleryItem[];
  };
}

interface ProductsResponse {
  products: {
    nodes: Product[];
  };
}

// Persisted query alias for GetProductsByCategory
const PERSISTED_QUERY_PRODUCTS = '5c7a4b4abc97a74fe998feb6527d129461aa6d5d2b4bc7ed1a1ad5a5f81cdcb6';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: PERSISTED_QUERY_PRODUCTS,
      }),
      // Enable caching with revalidation
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    const json = await response.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error('Failed to fetch products');
    }

    const data: ProductsResponse = json.data;
    return data.products.nodes;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) =>
    product.productCategories.nodes.some((cat) => cat.slug === categorySlug)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProducts = await getAllProducts();
  return allProducts.find((product) => product.slug === slug) || null;
}
