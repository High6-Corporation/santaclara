"use client";

import { useEffect, useRef, useState } from "react";
import { ContentBlock } from "@/components/blocks/ContentBlock";

// Reusable hook for counter animation
function useCounterAnimation(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, targetValue, duration]);

  return { count, ref };
}

// Stat Card Component
interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

function StatCard({ icon, value, label, suffix = "" }: StatCardProps) {
  const { count, ref } = useCounterAnimation(value);

  return (
    <div
      ref={ref}
      className="bg-[#cf2923] w-full md:w-[325px] h-[370px] p-6 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-[20px]">
        <img src={icon} alt="" className="w-[70px] h-[70px]" />
        <p className="text-[46px] md:text-[54px] leading-none tracking-[-2.16px] text-white">
          {count}{suffix}
        </p>
        <p className="text-[16px] leading-[28px] tracking-[-0.64px] text-white text-center" dangerouslySetInnerHTML={{ __html: label }} />
      </div>
    </div>
  );
}

export function AboutCompanyOverviewSection() {
  return (
    <section className="relative w-full bg-white py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-[29px] items-start mb-[80px]">
          {/* Left Column - Content Block */}
          <div className="w-full lg:flex-[1.008]">
            <ContentBlock
              title="The Leading Manufacturer of Premium Wood Products"
              paragraphs={[
                "Since 1923, SMWPI Wood Products Inc. has been the leading manufacturer of high quality wood grade and marine plywood products in the Philippines, including the well-renowned Santa Clara Marine Plywood.",
                "With manufacturing plants located in Toril, Davao City and in Esperanza, Agusan Del Sur, SMWPI is committed to producing and delivering high quality products through an established manufacturing process from selection of quality raw materials, combination of technology and up-to-date production techniques, and stringent quality assurance process.",
                "Because of its unmatched quality, SMWPI's Santa Clara Marine Plywood and SM Ply continues to be the most trusted and sought after brand of marine plywood by boat builders, building contractors, and furniture makers."
              ]}
              showLine={true}
              lineWidth="w-full"
              align="left"
              textColor="text-[#333]"
              titleColor="text-black"
              lineColor="bg-[#CF2923]"
              titleTracking="tracking-[-2.4px]"
              gap="gap-10"
            />
          </div>

          {/* Right Column - Image */}
          <div className="w-full lg:flex-[0.99]">
            <div className="aspect-[650/556] relative w-full">
              <img 
                alt="Santa Clara Marine Plywood manufacturing" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/images/2f9795867bd1e30ab2f0d01eafe3731a1221a9d1.png" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - Stat Cards */}
        <div className="max-w-[1035px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[24px] pt-[60px]">
          <StatCard
            icon="/images/century.svg"
            value={103}
            label="More than a century of excellence in marine plywood manufacturing"
          />
          <StatCard
            icon="/images/employees.svg"
            value={1000}
            label="Employees supporting over a century<br />of excellence"
          />
          <StatCard
            icon="/images/manufacturing-plants.svg"
            value={2}
            label="Strategically located manufacturing plants nationwide"
          />
        </div>
      </div>
    </section>
  );
}
