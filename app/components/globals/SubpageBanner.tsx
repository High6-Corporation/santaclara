"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface SubpageBannerProps {
  title: string;
  backgroundImage?: string;
}

export function SubpageBanner({ title, backgroundImage = "/images/efd441c08cfadb81937e916cd41cc4b9a9c9c8f0.png" }: SubpageBannerProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section 
      className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] bg-black overflow-hidden"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${backgroundImage}) lightgray 50% / cover no-repeat`
      }}
    >
      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] h-full flex items-center justify-center pt-[80px] overflow-hidden">
        <h1 
          ref={ref}
          className="text-white text-[42px] md:text-[72px] lg:text-[84px] leading-[1.1] tracking-[-0.72px] font-body text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
            transition: "opacity 1s ease-out 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}