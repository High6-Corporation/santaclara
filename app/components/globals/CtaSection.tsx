"use client";

import { ArrowButton } from "../ui/ArrowButton";

export function CtaSection() {
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
        <div className="flex flex-col items-center text-center w-full max-w-[90%] md:max-w-none">
          {/* Title */}
          <h2 className="font-body text-[36px] md:text-[48px] lg:text-[60px] text-white tracking-[-2.4px] leading-[1.1]">
            Your Project Deserves the Best Plywood
          </h2>
          {/* Paragraph */}
          <p className="font-body text-[24px] leading-[32px] text-white tracking-[-0.64px] mt-[16px]">
            Durable, reliable, and built to last — trusted by professionals nationwide.
          </p>
          {/* Button */}
          <div className="mt-[40px]">
            <ArrowButton href="/contact-us" variant="primary">
              Request a Quote
            </ArrowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
