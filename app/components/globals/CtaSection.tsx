"use client";

import { ContentBlock } from "../blocks/ContentBlock";

export function CtaSection() {
  return (
    <section className="relative w-full bg-black py-[100px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="w-full h-full object-cover"
          src="/images/82ab61a2c1183322d06f1184fc8aecd8366ae9ae.png"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Row Container - Constrained to 1440px and centered */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] flex items-center justify-center">
        <ContentBlock
          title="Your Project Deserves the Best Plywood"
          paragraphs={[
            "Durable, reliable, and built to last — trusted by professionals nationwide.",
          ]}
          primaryButton={{
            text: "Request a Quote",
            href: "#",
            variant: "primary",
          }}
          align="center"
          showLine={false}
          textColor="text-white"
          titleColor="text-white"
          className="w-full max-w-[90%] md:max-w-none"
          gap="gap-[40px]"
        />
      </div>
    </section>
  );
}
