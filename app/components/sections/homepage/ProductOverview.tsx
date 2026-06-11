"use client";

import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export function ProductOverview() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);

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
        <div ref={contentRef} className="flex flex-col gap-[40px] items-start justify-center h-full">
          {/* Title Section */}
          <div 
            className="flex flex-col gap-[24px] items-start w-full lg:max-w-[682px]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <h2 className="font-body text-[36px] md:text-[48px] lg:text-[60px] text-white tracking-[-2.4px]">
              Building Hope with Yellow Boat of Hope Foundation
            </h2>
            <div className="w-full h-[2px] bg-[#CF2923]" />
          </div>

          {/* Description & CTA */}
          <div className="flex flex-col gap-[40px] items-start w-full">
            <p 
              className="text-[16px] leading-[28px] text-white tracking-[-0.64px] lg:max-w-[682px]"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              At Santa Clara Plywood, we believe that building strong communities goes beyond providing quality materials - it also means supporting initiatives that create meaningful change.
            </p>
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out 0.6s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
              }}
            >
              <ArrowButton href="https://nowyouknowph.rappler.com/723/santa-clara-marine-plywood-yellow-boat-of-hope-foundation-forge-partnership-for-coastal-communities/">Learn More</ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
