"use client";

import { ContentBlock } from "@/components/blocks/ContentBlock";

export function AboutHistoryOverviewSection() {
  return (
    <section className="relative w-full bg-[#04217B] py-[100px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-[40px] items-center">
          {/* Left Column - Image */}
          <div className="w-full lg:flex-[1.06]">
            <div className="aspect-[671/556] max-w-[671px] relative w-full">
              <img 
                alt="Santa Clara Marine Plywood history" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/images/company_history.jpg" 
              />
            </div>
          </div>

          {/* Right Column - Content Block */}
          <div className="w-full lg:flex-[0.94]">
            <ContentBlock
              title="A Century of Excellence"
              paragraphs={[
                "Founded with a commitment to quality and durability, Santa Clara Plywood has become one of the most trusted plywood brands in the Philippines.",
                "Manufactured by SMWPI (SMWPI Wood Products, Inc.), our plywood products are known for their excellent strength, craftsmanship, and consistent performance.",
                "From marine-grade panels to ordinary plywood, Santa Clara has been supporting Filipino builders, craftsmen, and homeowners for decades—building a legacy of reliability, one sheet at a time."
              ]}
              showLine={true}
              lineWidth="w-full"
              align="left"
              textColor="text-white"
              titleColor="text-white"
              lineColor="bg-[#CF2923]"
              titleTracking="tracking-[-2.4px]"
              gap="gap-6"
              removeParagraphSpacing={true}
              paragraphMarginTop="mt-[20px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
