"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  value: number;
  label: string;
  suffix?: string;
  borderPosition?: "right" | "left" | "none";
}

function StatCard({ value, label, suffix = "", borderPosition = "right" }: StatCardProps) {
  // For "k" suffix, animate to 1000 but display as 1k at the end
  const animationValue = suffix === "k" ? 1000 : value;
  const { count, ref } = useCounterAnimation(animationValue);

  const borderClass = {
    right: "border-b md:border-r md:border-b",
    left: "border-b md:border-l md:border-b",
    none: "border-b md:border-b",
  };

  // Format the display value: if suffix is "k", show 0-999 during animation, then "1k" at end
  const displayValue = suffix === "k" 
    ? (count >= 1000 ? "1" : count.toString())
    : count.toString();
  const displaySuffix = suffix === "k" && count < 1000 ? "" : suffix;

  return (
    <div
      ref={ref}
      className={`bg-white h-auto md:h-[370px] w-full md:w-[325px] p-6 flex flex-col gap-[60px] md:gap-[114px] border-black/50 ${borderClass[borderPosition]} md:rounded-none rounded-[inherit]`}
    >
      <p className="text-[80px] md:text-[100px] leading-none tracking-[-4px] text-black">
        {displayValue}{displaySuffix}
      </p>
      <p className="text-[16px] leading-[28px] tracking-[-0.64px] text-[#333]" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

// CTA Card Component
function CTACard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/about-us"
      className={`h-auto md:h-[370px] w-full md:w-[325px] p-6 flex flex-col gap-[60px] md:gap-[160px] transition-colors duration-300 ${
        isHovered ? "bg-[#04217B]" : "bg-[#cf2923]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-[16px] leading-[28px] tracking-[-0.64px] text-white">
        Discover how we&apos;ve built over a century of excellence
      </p>
      <div className="flex items-center gap-[10px]">
        <span className="font-body font-semibold text-[16px] text-white tracking-[-0.64px] whitespace-nowrap">
          Explore our legacy
        </span>
        <div className={`relative shrink-0 size-[24px] transition-transform duration-300 ${isHovered ? "rotate-[-45deg]" : ""}`}>
          <img src="/images/arrow-icon.svg" alt="Arrow" className="absolute inset-0 size-full" />
        </div>
      </div>
    </Link>
  );
}

// Section Badge Component
function SectionBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex h-[48px] items-center justify-center px-[24px] relative rounded-[99px] border border-[#2c2525] w-fit">
      <span className="font-body font-normal text-[#2c2525] text-[16px] whitespace-nowrap">{text}</span>
    </div>
  );
}

// Section Title Component
function SectionTitle({ badge, title }: { badge: string; title: string }) {
  return (
    <div className="flex flex-col gap-[24px] w-full">
      <SectionBadge text={badge} />
      <h2 className="font-body font-normal text-[36px] md:text-[48px] lg:text-[60px] text-black tracking-[-2.4px]">
        {title}
      </h2>
      <div className="w-full h-[2px] bg-[#CF2923]" />
    </div>
  );
}

// Overview Content Component
function OverviewContent() {
  return (
    <div className="font-body font-normal text-[#333] text-[16px] leading-[28px] tracking-[-0.64px]">
      <p className="mb-4">
        <Link href="/products" className="text-[#CF2923] hover:underline font-semibold">
          Santa Clara Marine Plywood
        </Link>{' '}
        by SMWPI is the marine plywood brand name synonymous with unmatched quality. Its quality is known to withstand any weather condition, making it the ideal plywood for boat-making, home building, and furniture-making.
      </p>
      <p>
        Santa Clara Marine Plywood is produced locally from two manufacturing plants in Davao and Agusan. Each sheet carries the distinct quality seal after passing SMWPI&apos;s stringent quality assurance process. This ensures all products delivered to local and international clients have met quality and workmanship standards.{' '}
        <Link href="/about-us" className="text-[#CF2923] hover:underline font-semibold">
          Learn more about our legacy
        </Link>
        .
      </p>
    </div>
  );
}

// Stats Grid Component
function StatsGrid({ isVisible = false }: { isVisible?: boolean }) {
  const items = [
    { value: 103, label: "More than a century of excellence in marine plywood manufacturing", borderPosition: "right" as const },
    { value: 1, suffix: "k", label: "Employees supporting over a century<br />of excellence", borderPosition: "left" as const },
    { value: 2, label: "Strategically located manufacturing plants nationwide", borderPosition: "right" as const },
  ];

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-[24px] md:gap-0 w-full md:w-[650px] border-t border-black/50">
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
            transition: `opacity 0.8s ease-out ${0.2 + index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`,
          }}
        >
          <StatCard value={item.value} label={item.label} suffix={item.suffix || ""} borderPosition={item.borderPosition} />
        </div>
      ))}
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.9)",
          transition: `opacity 0.8s ease-out ${0.2 + 3 * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + 3 * 0.15}s`,
        }}
      >
        <CTACard />
      </div>
    </div>
  );
}

export function CompanyOverviewSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation(0.2);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative w-full bg-white py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col xl:flex-row gap-[80px] items-start xl:items-end">
          {/* Left Column - Content */}
          <div className="w-full xl:w-[550px] flex flex-col gap-[47px]">
            <div ref={headingRef}>
              <SectionTitle badge="Who We Are" title="Santa Clara Marine Plywood Built to Last" />
            </div>
            <div
              style={{
                opacity: headingVisible ? 1 : 0,
                transform: headingVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              <OverviewContent />
            </div>
            <div 
              ref={imageRef}
              className="aspect-[509/340] relative w-full"
              style={{
                opacity: imageVisible ? 1 : 0,
                transform: imageVisible ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <img 
                alt="Santa Clara Marine Plywood manufacturing" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/images/2f9795867bd1e30ab2f0d01eafe3731a1221a9d1.png" 
              />
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div ref={statsRef} className="w-full flex justify-center xl:justify-start xl:w-auto">
            <StatsGrid isVisible={statsVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}
