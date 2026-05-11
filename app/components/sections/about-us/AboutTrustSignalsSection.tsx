"use client";

import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import Link from "next/link";

const trustSignals = [
  {
    title: "100+ Years of Expertise",
    description:
      "Since 1923, SMWPI has been manufacturing premium wood products, making Santa Clara one of the oldest and most trusted plywood brands in the Philippines.",
    icon: "/images/century.svg",
  },
  {
    title: "Stringent Quality Assurance",
    description:
      "Every sheet of Santa Clara Marine Plywood undergoes rigorous quality testing to ensure it meets international standards for strength, durability, and weather resistance.",
    icon: "/images/superior_quality.jpg",
  },
  {
    title: "Nationwide Dealer Network",
    description:
      "With authorized dealers across NCR, Luzon, Visayas, and Mindanao, Santa Clara products are accessible to builders and craftsmen throughout the Philippines.",
    icon: "/images/location-icon.svg",
  },
  {
    title: "Locally Manufactured",
    description:
      "Proudly produced in manufacturing plants in Davao and Agusan, supporting local industry while delivering world-class marine plywood quality.",
    icon: "/images/manufacturing-plants.svg",
  },
];

export function AboutTrustSignalsSection() {
  return (
    <Section bgColor="bg-white lg:py-[100px] md:py-[60px] py-[40px]">
      <Row>
        <div className="text-center max-w-[800px] mx-auto mb-[50px]">
          <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal tracking-[-2.4px] leading-[40px] md:leading-[72.6px] text-[#333333] mb-[20px]">
            Why Trust Santa Clara
          </h2>
          <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
            For over a century, Santa Clara Marine Plywood has been the benchmark for quality,
            durability, and reliability in the Philippine plywood industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {trustSignals.map((signal) => (
            <div
              key={signal.title}
              className="flex gap-[20px] items-start p-[30px] border border-gray-200 rounded-lg hover:border-[#CF2923] transition-colors duration-300"
            >
              <div className="shrink-0 w-[50px] h-[50px] relative">
                <img
                  src={signal.icon}
                  alt={signal.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold text-[#2c2525] mb-[8px]">
                  {signal.title}
                </h3>
                <p className="text-[14px] md:text-[16px] leading-[24px] text-[#333333]">
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-[40px]">
          <Link
            href="/products"
            className="inline-flex items-center gap-[10px] bg-[#CF2923] text-white px-[24px] py-[16px] rounded-[100px] font-semibold text-[16px] hover:bg-[#a91f1a] transition-colors duration-300"
          >
            Explore Our Products
            <img src="/images/arrow-icon.svg" alt="Arrow" className="w-[20px] h-[20px]" />
          </Link>
        </div>
      </Row>
    </Section>
  );
}