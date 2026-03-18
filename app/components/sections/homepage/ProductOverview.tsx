"use client";

import { ArrowButton } from "@/app/components/ui/ArrowButton";

export function ProductOverview() {
  return (
    <section className="relative w-full bg-black py-[100px] lg:py-0 lg:h-[758px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="Product Overview Background" 
          className="w-full h-full object-cover" 
          src="/images/product-overview-background.jpg" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(-108deg,rgba(2,7,25,0)_-9.54%,#020719_78.8%)]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] h-full">
        <div className="flex flex-col gap-[40px] items-start justify-center h-full">
          {/* Title Section */}
          <div className="flex flex-col gap-[24px] items-start w-full lg:max-w-[682px]">
            <div className="inline-flex items-center justify-center px-[20px] py-[14px] rounded-[100px] border border-white">
              <span className="font-body text-[14px] text-white tracking-[-0.14px] whitespace-nowrap">Eucalyptus</span>
            </div>
            <h2 className="font-body text-[36px] md:text-[48px] lg:text-[60px] text-white tracking-[-2.4px]">
              Building Hope with Yellow Boat of Hope Foundation
            </h2>
            <div className="w-full h-[2px] bg-[#CF2923]" />
          </div>

          {/* Description & CTA */}
          <div className="flex flex-col gap-[40px] items-start w-full">
            <p className="text-[16px] leading-[28px] text-white tracking-[-0.64px] lg:max-w-[682px]">
              At Santa Clara Plywood, we believe that building strong communities goes beyond providing quality materials - it also means supporting initiatives that create meaningful change.
            </p>
            <ArrowButton href="#">Learn More</ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
