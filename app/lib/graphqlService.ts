// WordPress GraphQL Configuration
const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://santaclaraplywood.beta02.site/graphql';
const WP_QUERY_ID = '86c84bde4ab5f79ffb12787a019820e84c00e1c3454924bc9d68e97d46389b06';

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
