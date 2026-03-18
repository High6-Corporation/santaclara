"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
      
      {/* Product Info */}
      <div className="absolute left-[16px] lg:left-[30px] right-[16px] lg:right-[30px] bottom-[24px] lg:bottom-[30px] flex flex-col gap-[8px] lg:gap-[16px]">
        {/* Title with Arrow */}
        <div className="flex items-start justify-between gap-[12px]">
          <p className="font-body font-semibold text-[18px] lg:text-[24px] leading-[1.3] text-white tracking-[-0.96px]">
            {title}
          </p>
          <div className={`shrink-0 size-[24px] lg:size-[32px] transition-transform duration-300 ease-in-out ${isHovered ? 'rotate-[-45deg]' : 'rotate-0'}`}>
            <img 
              src="/images/arrow-icon.svg" 
              alt="Arrow icon" 
              className="block size-full"
            />
          </div>
        </div>
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
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const tabletSwiperRef = useRef<SwiperType | null>(null);
  const mobileSwiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full bg-[#04217b] py-[100px]">
      {/* Row Container - Constrained to 1440px and centered */}
      <div className="max-w-[1440px] mx-auto lg:px-[60px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
          {/* Left Column - Title & Description */}
          <div className="w-full lg:w-[35%] xl:w-[40%] flex-shrink-0 px-[5%] lg:px-0 relative z-10">
            <FeaturedProductsContainer />
          </div>

          {/* Right Column - Product Carousel */}
          <div className="w-full lg:flex-1 min-w-0">
            {/* Desktop Swiper - Shows partial next slide */}
            <div className="hidden lg:block relative" style={{ clipPath: 'inset(0 -100vw 0 0)' }}>
              {/* Navigation Buttons */}
              <button 
                onClick={() => desktopSwiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Previous slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain" />
              </button>
              <button 
                onClick={() => desktopSwiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[48px] h-[48px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Next slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain rotate-180" />
              </button>
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={"auto"}
                spaceBetween={22}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => { desktopSwiperRef.current = swiper; }}
                className="!overflow-visible px-[60px]"
              >
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide className="!w-[425px]">
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
                
              </Swiper>
            </div>

            {/* Tablet Swiper - Center mode with side peek */}
            <div className="hidden sm:block lg:hidden relative">
              {/* Navigation Buttons */}
              <button 
                onClick={() => tabletSwiperRef.current?.slidePrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Previous slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain" />
              </button>
              <button 
                onClick={() => tabletSwiperRef.current?.slideNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Next slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain rotate-180" />
              </button>
              <Swiper
                modules={[Autoplay, Navigation]}
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                onSwiper={(swiper) => { tabletSwiperRef.current = swiper; }}
                className="pb-[40px] px-[50px]"
              >
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
                                <SwiperSlide>
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            {/* Mobile Swiper - Single slide */}
            <div className="sm:hidden relative">
              {/* Navigation Buttons */}
              <button 
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-[36px] h-[36px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Previous slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain" />
              </button>
              <button 
                onClick={() => mobileSwiperRef.current?.slideNext()}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-[36px] h-[36px] flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Next slide"
              >
                <img src="/images/slider-button.png" alt="" className="w-full h-full object-contain rotate-180" />
              </button>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => { mobileSwiperRef.current = swiper; }}
                className="pb-[40px]"
              >
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
                                <SwiperSlide>
                  <ProductCard 
                    image="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png"
                    overlayImage="/images/76e811688cf4a3b19460e7cce5d5a53f86817a84.png"
                    title="Marine Plywood"
                    description="High-quality marine plywood designed for durability, water resistance, and long-lasting performance."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png"
                    title="Ordinary Plywood"
                    description="Reliable plywood for general construction and interior projects, offering durability and versatility."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png"
                    title="SMPly"
                    description="Versatile plywood ideal for general construction and interior applications."
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard 
                    image="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png"
                    title="Plyboard"
                    description="Premium Plyboard for high-quality interior and furniture applications."
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}