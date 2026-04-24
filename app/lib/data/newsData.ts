export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  redirectUrl?: string; // External URL for linking to external sites
}

// Note: Static newsData array has been removed.
// The site now uses WordPress GraphQL for dynamic news/posts.
// See graphqlService.ts for fetchPosts() function.
