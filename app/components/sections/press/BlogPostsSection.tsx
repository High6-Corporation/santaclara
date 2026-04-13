"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { PressCard } from "@/components/blocks/PressCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { fetchPosts, Post } from "@/lib/graphqlService";

const ITEMS_PER_PAGE = 4;

export function BlogPostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch initial posts
  useEffect(() => {
    async function loadInitialPosts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetchPosts(ITEMS_PER_PAGE);
        
        if (response.errors) {
          setError('Failed to load posts');
          console.error('GraphQL errors:', response.errors);
          return;
        }
        
        if (response.data?.posts) {
          setPosts(response.data.posts.nodes);
          setEndCursor(response.data.posts.pageInfo.endCursor);
          setHasNextPage(response.data.posts.pageInfo.hasNextPage);
        }
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error loading posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadInitialPosts();
  }, []);

  const handleLoadMore = async () => {
    if (!hasNextPage || !endCursor || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchPosts(ITEMS_PER_PAGE, endCursor);
      
      if (response.errors) {
        setError('Failed to load more posts');
        console.error('GraphQL errors:', response.errors);
        return;
      }
      
      if (response.data?.posts) {
        // Append new posts to existing posts
        setPosts(prev => [...prev, ...response.data!.posts.nodes]);
        setEndCursor(response.data.posts.pageInfo.endCursor);
        setHasNextPage(response.data.posts.pageInfo.hasNextPage);
      }
    } catch (err) {
      setError('Failed to load more posts');
      console.error('Error loading more posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
      <Row>
        <div className="text-center max-w-[674px] mx-auto mb-[30px]">
          <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal tracking-[-2.4px] leading-[40px] md:leading-[72.6px] text-[#333333] md:mb-[30px] mb-[20px]">
            Latest Blog Posts
          </h2>
          <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
            Explore our latest articles designed to answer common questions and share practical knowledge.
          </p>
        </div>
        
        {error && (
          <div className="text-center text-red-600 mb-4">
            {error}
          </div>
        )}
        
        {isLoading && posts.length === 0 ? (
          <div className="text-center text-gray-600 py-10">Loading posts...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-[18px]">
              {posts.map((post) => (
                <PressCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  image={post.featuredImage?.node.mediaItemUrl || ''}
                />
              ))}
            </div>
            
            {hasNextPage && (
              <div className="flex justify-center lg:mt-[50px] mt-[36px]">
                <ArrowButton onClick={handleLoadMore}>
                  {isLoading ? 'Loading...' : 'Load More'}
                </ArrowButton>
              </div>
            )}
          </>
        )}
      </Row>
    </Section>
  );
}
