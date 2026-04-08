"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { PressCard } from "@/components/blocks/PressCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { newsData } from "@/app/lib/data/newsData";

const ITEMS_PER_PAGE = 4;

export function BlogPostsSection() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  
  const handleToggleItems = () => {
    if (visibleItems >= newsData.length) {
      // Show less - reset to initial 4 items
      setVisibleItems(ITEMS_PER_PAGE);
    } else {
      // Load more - show 4 more items
      setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, newsData.length));
    }
  };

  const visibleNewsData = newsData.slice(0, visibleItems);
  const showLoadMore = visibleItems < newsData.length;
  const showShowLess = visibleItems >= newsData.length && newsData.length > ITEMS_PER_PAGE;

  return (
    <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
      <Row>
        <div className="text-center max-w-[674px] mx-auto mb-[30px]">
          <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] md:leading-[72.6px] tracking-[2.4px] text-[#333333] md:mb-[30px] mb-[20px]">
            Latest Blog Posts
          </h2>
          <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
            Explore our latest articles designed to answer common questions and share practical knowledge.
          </p>
        </div>
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-[18px]">
          {visibleNewsData.map((item) => (
            <PressCard
              key={item.id}
              slug={item.slug}
              title={item.title}
              date={item.date}
              image={item.image}
            />
          ))}
        </div>
        {(showLoadMore || showShowLess) && (
          <div className="flex justify-center lg:mt-[50px] mt-[36px]">
            <ArrowButton onClick={handleToggleItems}>
              {showShowLess ? "Show Less" : "Load More"}
            </ArrowButton>
          </div>
        )}
      </Row>
    </Section>
  );
}
