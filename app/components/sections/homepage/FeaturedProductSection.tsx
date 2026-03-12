"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { ContentBlock } from "@/app/components/blocks/ContentBlock";

interface ProductCardProps {
  image: string;
  overlayImage?: string;
  title: string;
  description: string;
}

function ProductCard({ image, overlayImage, title, description }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href="#" className="block bg-white h-[420px] lg:h-[460px] overflow-hidden relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="" 
          className="w-full h-full object-cover" 
          src={image} 
        />
      </div>
      
      {/* Overlay Image (if provided) */}
      {overlayImage && (
        <div className="absolute inset-0">
          <img 
            alt="" 
            className="w-full h-full object-cover opacity-50" 
            src={overlayImage} 
          />
        </div>
      )}
      
      {/* Icon */}
      <div className={`absolute right-[16px] lg:right-[24px] bottom-[24px] lg:bottom-[30px] size-[24px] lg:size-[32px] transition-transform duration-300 ease-in-out ${isHovered ? 'rotate-[-45deg]' : 'rotate-0'}`}>
       <img 
       src="/images/arrow-icon.svg" 
       alt="Arrow icon" 
       className="block size-full"
       />
      </div>
      
      {/* Product Info */}
      <div className="absolute left-[16px] lg:left-[30px] right-[16px] lg:right-[30px] bottom-[24px] lg:bottom-[30px] flex flex-col gap-[8px] lg:gap-[16px]">
        <p className="font-body font-semibold text-[18px] lg:text-[24px] leading-[1.3] text-white tracking-[-0.96px]">
          {title}
        </p>
        <p className="font-body font-normal text-[13px] lg:text-[16px] leading-[1.5] lg:leading-[28px] text-white tracking-[-0.64px]">
          {description}
        </p>
      </div>
    </a>
  );
}

function FeaturedProductsContainer() {
  return (
    <ContentBlock
      badge="High Quality"
      title="Our Products"
      paragraphs={[
        "We provide high-quality, durable marine plywood solutions designed for a variety of applications — from maritime use to construction and furniture making. Every sheet reflects over a century of craftsmanship and strict quality standards.",
      ]}
      primaryButton={{
        text: "Learn More",
        href: "#",
        variant: "primary",
      }}
      align="left"
      showLine={true}
      lineWidth="w-full"
      lineColor="bg-[#CF2923]"
      textColor="text-white"
      titleColor="text-white"
      badgeBorderColor="border-white"
      badgeTextColor="text-white"
      gap="gap-[24px]"
    />
  );
}



export function FeaturedProductSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "18%",
          variableWidth: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0px",
          variableWidth: false,
        },
      },
    ],
  };

  const sliderStyles = `
    /* Desktop: allow right overflow, clip left */
    @media (min-width: 981px) {
      .slick-list {
        overflow: visible !important;
        clip-path: inset(0 -100vw 0 0);
      }
    }
    .slick-track {
      display: flex !important;
      flex-wrap: nowrap !important;
    }
    .slick-slide {
      margin-right: 22px;
      float: none !important;
      height: auto;
    }
    .slick-slide > div {
      width: 425px;
      height: 460px;
    }

    /* Tablet: center mode with side peek */
    @media (max-width: 980px) {
      .slick-slider {
        overflow: visible !important;
      }
      .slick-list {
        overflow: visible !important;
        clip-path: none;
      }
      .slick-slide {
        margin-right: 0;
        padding: 0 10px;
        transition: all 0.4s ease;
      }
      .slick-slide > div {
        width: 100% !important;
        height: 420px;
        transform: scale(0.85);
        opacity: 0.6;
        transition: all 0.4s ease;
      }
      .slick-slide.slick-center > div {
        transform: scale(1);
        opacity: 1;
      }
    }

    /* Mobile: single slide */
    @media (max-width: 640px) {
      .slick-list {
        overflow: hidden !important;
        clip-path: none;
      }
      .slick-slide {
        padding: 0;
      }
      .slick-slide > div {
        transform: scale(1) !important;
        opacity: 1 !important;
        width: 100% !important;
        height: 420px;
      }
    }
  `;

  return (
    <>
      <style>{sliderStyles}</style>
      <section className="relative w-full bg-[#04217b] py-[100px] overflow-hidden">
      {/* Row Container - Constrained to 1440px and centered */}
      <div className="max-w-[1440px] mx-auto lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
          {/* Left Column - Title & Description */}
          <div className="w-full lg:w-[35%] xl:w-[40%] flex-shrink-0 px-[5%] lg:px-0 relative z-10">
            <FeaturedProductsContainer />
          </div>

          {/* Right Column - Product Carousel */}
          <div className="w-full lg:flex-1">
            <Slider {...settings} className="pb-[40px]">
              <ProductCard 
                image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                title="Marine Plywood"
                description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
              />
              <ProductCard 
                image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                title="Ordinary Plywood"
                description="Reliable plywood for general construction and interior projects, offering durability and versatility."
              />
              <ProductCard 
                image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                title="SMPly"
                description="Versatile plywood ideal for general construction and interior applications."
              />
              <ProductCard 
                image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                title="Plyboard"
                description="Premium Plyboard for high-quality interior and furniture applications."
              />
            </Slider>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}