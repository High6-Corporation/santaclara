"use client";
import React from "react";
import Link from "next/link";
import { NewsItem } from "@/app/lib/data/newsData";

interface NewsListingProps {
  items?: NewsItem[];
  maxItems?: number;
  variant?: 'homepage' | 'press';
}

function ReadMore({ isHovered }: { isHovered?: boolean }) {
  return (
    <div className="flex gap-[4px] items-center relative shrink-0 w-auto pointer-events-none">
      <span className="font-body font-semibold text-[14px] text-[#ff1c14] tracking-[-0.56px] whitespace-nowrap">Read More</span>
      <img 
        src="/images/button-icon-red.svg" 
        alt="Arrow icon" 
        className={`w-[20px] h-[20px] transition-transform duration-300 ${isHovered ? 'rotate-[-45deg]' : ''}`}
      />
    </div>
  );
}

function HomepageNewsItem({ item }: { item: NewsItem }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link 
      href={`/press/${item.slug}`} 
      className="block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="content-stretch flex gap-[16px] md:gap-[24px] items-center relative shrink-0 w-full cursor-pointer"
        data-name="News Item"
      >
        <div className="bg-white h-[80px] md:h-[100px] overflow-clip relative shrink-0 w-[100px] md:w-[160px]" data-name="Image">
          <div className="absolute inset-0" data-name="Image">
            <img alt="" className="absolute inset-0 object-cover pointer-events-none size-full" src={item.image} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-white flex-1 min-w-0" data-name="NewsItemContent">
          <div className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 text-white w-full" data-name="NewsItemTitle">
            <p className="font-body font-medium leading-[1.4] lg:leading-[32px] relative shrink-0 text-[16px] md:text-[18px] lg:text-[20px] tracking-[-0.8px] w-full line-clamp-2">{item.title}</p>
            <p className="font-body font-normal leading-[normal] opacity-70 relative shrink-0 text-[12px] md:text-[14px] tracking-[-0.56px] w-full">{item.date}</p>
          </div>
          <ReadMore isHovered={isHovered} />
        </div>
      </div>
    </Link>
  );
}

function PressNewsItem({ item }: { item: NewsItem }) {
  return (
    <Link href={`/press/${item.slug}`} className="group block">
      <div className="flex gap-[30px] items-center py-[30px] border-b border-gray-200 hover:border-[#CF2923] transition-colors duration-300">
        <div className="shrink-0 w-[200px] h-[140px] overflow-hidden rounded-lg">
          <img
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={item.image}
          />
        </div>
        <div className="flex flex-col gap-[12px] items-start flex-1">
          <div className="flex flex-col gap-[8px]">
            <p className="font-body font-medium leading-[1.4] lg:leading-[32px] text-[20px] md:text-[24px] tracking-[-0.8px] text-[#2c2525] group-hover:text-[#CF2923] transition-colors duration-300">
              {item.title}
            </p>
            <p className="font-body font-normal text-[16px] text-gray-500">{item.date}</p>
          </div>
          <p className="font-body font-normal leading-[1.5] lg:leading-[28px] text-[14px] md:text-[16px] text-gray-600 line-clamp-2">
            {item.excerpt}
          </p>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 mt-[8px]" data-name="Read More">
            <p className="font-body font-semibold leading-[normal] not-italic relative shrink-0 text-[#CF2923] text-[16px] tracking-[-0.56px] whitespace-nowrap">Read Full Story</p>
            <img
              src="/images/button-icon-red.svg"
              alt="Arrow icon"
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsItemComponent({ item, variant }: { item: NewsItem; variant: 'homepage' | 'press' }) {
  if (variant === 'homepage') {
    return <HomepageNewsItem item={item} />;
  }
  return <PressNewsItem item={item} />;
}

export function NewsListing({ items = [], maxItems, variant = 'homepage' }: NewsListingProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  if (variant === 'homepage') {
   return (
      <div className="content-stretch flex flex-col gap-[24px] md:gap-[30px] items-start relative shrink-0 w-full lg:w-[50%]" data-name="NewsItemContainer">
        {displayItems.map((item) => (
          <NewsItemComponent key={item.id} item={item} variant={variant} />
        ))}
      </div>
    );
  }

  // Press page variant
 return (
    <div className="flex flex-col">
      {displayItems.map((item) => (
        <NewsItemComponent key={item.id} item={item} variant={variant} />
      ))}
    </div>
  );
}
