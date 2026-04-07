"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { PressCard } from "@/components/blocks/PressCard";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { newsData } from "@/app/lib/data/newsData";

export default function PressPage() {
 return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <SubpageBanner title="Press" />
        <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
          <Row>
              <div className="text-center max-w-[674px] mx-auto mb-[30px]">
              <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[72.6px] tracking-[2.4px] text-[#333333] mb-[30px]">Latest Blog Posts</h2>
              <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                Explore our latest articles designed to answer common questions and share practical knowledge.
              </p>
              </div>
              <div className="flex flex-wrap justify-center gap-[18px]">
                {newsData.map((item) => (
                  <PressCard
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    date={item.date}
                    image={item.image}
                  />
                ))}
              </div>
          </Row>
        </Section>
        <Footer />
      </div>
    </div>
  );
}
