"use client";

import { ContentBlock } from "@/app/components/blocks/ContentBlock";

interface ProductSubpageBannerProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  badge?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
}

export function ProductSubpageBanner({
  title,
  description,
  backgroundImage = "/images/category-listing-bg.jpg",
  badge,
  showButton = false,
  buttonText = "Explore Products",
  buttonHref = "#products",
}: ProductSubpageBannerProps) {
  const paragraphs = description ? [description] : [];

  return (
    <section 
      className="relative w-full bg-black overflow-hidden"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${backgroundImage}) lightgray 50% / cover no-repeat`
      }}
    >
      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] pt-[160px] md:pt-[230px] lg:pt-[220.61px] pb-[80px] md:pb-[150px] lg:pb-[140.61px]">
        <div className="max-w-[720px]">
          <ContentBlock
            badge={badge}
            title={title}
            paragraphs={paragraphs}
            titleTag="h1"
            primaryButton={showButton ? {
              text: buttonText,
              href: buttonHref,
              variant: "primary",
            } : undefined}
            showLine={true}
            lineWidth="w-full"
            lineColor="bg-white"
            textColor="text-white"
            titleColor="text-white"
            badgeBorderColor="border-white"
            badgeTextColor="text-white"
            gap="gap-[24px]"
            titleTracking="tracking-[-0.84px]"
            titleSize="text-[42px] md:text-[72px] lg:text-[84px]"
            textSize="text-[16px]"
            align="left"
            paragraphMarginTop="mt-[20px]"
          />
        </div>
      </div>
    </section>
  );
}
