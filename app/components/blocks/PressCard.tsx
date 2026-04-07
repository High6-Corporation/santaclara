"use client";

import { useState } from "react";
import Link from "next/link";

interface PressCardProps {
  slug: string;
  title: string;
  date: string;
  image: string;
}

export function PressCard({ slug, title, date, image }: PressCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="md:max-w-[315px] group">
      <div className="w-full">
        {/* Image */}
        <div className="w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full max-h-[300px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full text-left mt-[20px] mb-[24px]">
          <p className="text-[#333333] text-base md:leading-[32px] tracking-[-0.64px] font-medium mb-[8px] line-clamp-2">
            {title}
          </p>
          <p className="text-sm leading-[17px] tracking-[-0.56px] text-[#333333] opacity-70">
            {date}
          </p>
        </div>

        {/* Read More Button - Only this is clickable */}
        <Link 
          href={`/press/${slug}`}
          className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p className="font-body font-semibold leading-[normal] not-italic relative shrink-0 text-[#ff1c14] text-[14px] tracking-[-0.56px] whitespace-nowrap">
            Read More
          </p>
          <div className="relative shrink-0 w-[20px] h-[20px]">
            <img 
              src="/images/button-icon-red.svg" 
              alt="Arrow icon" 
              className={`absolute inset-0 size-full transition-transform duration-300 ${
                isHovered ? 'rotate-[-45deg]' : ''
              }`}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
