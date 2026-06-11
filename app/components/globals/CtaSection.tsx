"use client";

import { ArrowButton } from "../ui/ArrowButton";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export function CtaSection() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);

  return (
    <section className="relative w-full bg-black py-[126px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/images/cta-new-background.jpg"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Row Container - Constrained to 1440px and centered */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] flex items-center justify-center">
        <div ref={contentRef} className="flex flex-col items-center text-center w-full max-w-[90%] md:max-w-none">
          {/* Title */}
          <h2 
            className="font-body text-[36px] md:text-[48px] lg:text-[60px] text-white tracking-[-2.4px] leading-[1.1]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "scale(1) translateY(0)" : "scale(0.9) translateY(30px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Your Project Deserves the Best Plywood
          </h2>
          {/* Paragraph */}
          <p 
            className="font-body text-[24px] leading-[32px] text-white tracking-[-0.64px] mt-[16px]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            Durable, reliable, and built to last — trusted by professionals nationwide.
          </p>
          {/* Button */}
          <div 
            className="mt-[40px]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.6s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <ArrowButton href="/contact-us" variant="primary">
              Request a Quote
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
