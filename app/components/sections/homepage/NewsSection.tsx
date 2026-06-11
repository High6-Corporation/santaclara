"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsListing } from "@/app/components/globals/NewsListing";
import { NewsItem } from "@/app/lib/data/newsData";
import { fetchPosts, Post, extractUrlFromExcerpt } from "@/lib/graphqlService";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

function SectionBadge() {
  return (
    <div className="content-stretch flex items-center justify-center px-[20px] py-[14px] relative rounded-[100px] shrink-0" data-name="Section Badge">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[100px]" />
      <p className="font-body font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">News and Events</p>
    </div>
  );
}

function NewsTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="NewsTitle">
      <SectionBadge />
      <p className="font-body font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[36px] md:text-[48px] lg:text-[60px] text-white tracking-[-2.4px] w-[min-content]">What&apos;s The Latest</p>
      <div className="h-0 relative shrink-0 w-full" data-name="DividerLine">
        <div className="absolute inset-[-2px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 548 2">
            <line id="DividerLine" stroke="var(--stroke-0, #CF2923)" strokeWidth="2" x2="548" y1="1" y2="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ReadMoreButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/press"
      className="bg-[#e31c26] content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[21px] relative rounded-[100px] shrink-0 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#a91f1a]"
      data-name="NewsButton"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-body font-semibold text-[16px] text-white tracking-[-0.64px] whitespace-nowrap">Read More</span>
      <div className={`relative shrink-0 size-[24px] transition-transform duration-300 ease-in-out ${isHovered ? 'rotate-[-45deg]' : 'rotate-0'}`}>
        <img src="/images/arrow-icon.svg" alt="Arrow icon" className="absolute inset-0 size-full" />
      </div>
    </Link>
  );
}

function NewsDescription() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="NewsDescription">
      <p className="font-body font-normal leading-[28px] min-w-full not-italic relative shrink-0 text-[16px] text-white tracking-[-0.64px] w-[min-content]">
        Stay updated with the latest developments, product launches, and industry insights from Santa Clara Marine Plywood.
      </p>
      <ReadMoreButton />
    </div>
  );
}

function NewsContentContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="NewsContentContainer">
      <NewsTitle />
      <NewsDescription />
    </div>
  );
}

// Convert WordPress Post to NewsItem format
function convertPostToNewsItem(post: Post): NewsItem {
  const redirectUrl = extractUrlFromExcerpt(post.excerpt);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: post.featuredImage?.node.mediaItemUrl || '/images/d966250cfb844e94dc527202c54d6a4db20d25f9.png',
    excerpt: post.excerpt.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
    content: post.excerpt,
    redirectUrl: redirectUrl || undefined,
  };
}

export function NewsSection() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);
  const { ref: listingRef, isVisible: listingVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const response = await fetchPosts(3);
        if (response.data?.posts?.nodes) {
          const items = response.data.posts.nodes.map(convertPostToNewsItem);
          setNewsItems(items);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <section className="relative w-full bg-[#020718] py-[124px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="content-stretch flex flex-col lg:flex-row justify-between items-start gap-[60px] lg:gap-[40px] relative shrink-0 w-full" data-name="NewsContainer">
          <div
            ref={contentRef}
            className="w-full lg:w-[45%]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <NewsContentContainer />
          </div>
          <div
            ref={listingRef}
            className="w-full lg:w-[50%]"
            style={{
              opacity: listingVisible ? 1 : 0,
              transform: listingVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-[200px]">
                <div className="text-white">Loading...</div>
              </div>
            ) : (
              <NewsListing items={newsItems} maxItems={3} variant="homepage" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}