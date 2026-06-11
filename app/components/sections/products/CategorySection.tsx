"use client";

import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface CategorySectionProps {
  title: string;
  description: string;
  image: string;
  variant?: "light" | "dark";
  reverseLayout?: boolean;
  href?: string;
}

export function CategorySection({
  title,
  description,
  image,
  variant = "light",
  reverseLayout = false,
  href = "#",
}: CategorySectionProps) {
  const isDark = variant === "dark";
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.1);

  return (
    <section
      className={`relative w-full ${
        isDark ? "bg-[#04217b]" : "bg-white"
      } py-[50px] sm:py-[70px] lg:py-[100px] overflow-hidden`}
    >
      <div className="w-[90%] lg:w-[91.67%] max-w-[1320px] mx-auto">
        <div
          className={`flex flex-col-reverse ${
            reverseLayout ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center justify-between gap-[30px] lg:gap-[50px]`}
        >
          {/* Content */}
          <div 
            ref={contentRef}
            className="flex flex-col gap-[40px] items-start w-full lg:w-[599px]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* Title Section */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <h2
                className={`font-heading font-normal text-4xl md:text-5xl lg:text-6xl leading-[normal] tracking-[-2.4px] tracking-[-2.4px] w-full ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {title}
              </h2>
              <div className="w-full h-[2px] bg-[#CF2923]" />
            </div>

            {/* Description */}
            <p
              className={`font-body font-normal text-sm sm:text-base leading-[175%] tracking-[-0.64px] w-full ${
                isDark ? "text-white" : "text-[#333]"
              }`}
            >
              {description}
            </p>

            {/* CTA Button */}
            <ArrowButton href={href}>Explore</ArrowButton>
          </div>

          {/* Image */}
          <div 
            ref={imageRef}
            className="bg-white w-full lg:w-[671px] h-auto lg:h-[460px] overflow-clip relative"
            style={{
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: reverseLayout ? "left" : "right",
              transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
