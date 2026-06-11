"use client";

import { useEffect, useRef, useState } from "react";
import { ContentBlock } from "@/components/blocks/ContentBlock";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

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
      className="bg-[#cf2923] w-full min-h-[320px] md:min-h-[370px] p-6 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-[20px]">
        <img src={icon} alt="" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px]" />
        <p className="text-[36px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-none tracking-[-2.16px] text-white">
          {count}{suffix}
        </p>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] md:leading-[28px] tracking-[-0.64px] text-white text-center" dangerouslySetInnerHTML={{ __html: label }} />
      </div>
    </div>
  );
}

export function AboutCompanyOverviewSection() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative w-full bg-white py-[60px] md:py-[80px] lg:py-[100px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-[18px] items-start mb-[40px] md:mb-[60px] lg:mb-[80px]">
          {/* Left Column - Content Block */}
          <div 
            ref={contentRef}
            className="w-full lg:flex-[1.001]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
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
              gap="gap-6"
              paragraphMarginTop="mt-[20px]"
            />
          </div>

          {/* Right Column - Image */}
          <div 
            ref={imageRef}
            className="w-full lg:flex-[0.999]"
            style={{
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
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
        <div ref={statsRef} className="w-full max-w-[1035px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[20px] sm:gap-[30px] pt-[40px] md:pt-[60px]">
          {[
            { icon: "/images/century.svg", value: 103, label: "More than a century of excellence in marine plywood manufacturing" },
            { icon: "/images/employees.svg", value: 1000, label: "Employees supporting over a century<br />of excellence" },
            { icon: "/images/manufacturing-plants.svg", value: 2, label: "Strategically located manufacturing plants nationwide" },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
                transition: `opacity 0.8s ease-out ${0.2 + index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`,
              }}
            >
              <StatCard icon={stat.icon} value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
