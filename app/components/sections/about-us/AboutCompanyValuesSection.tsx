"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ContentBlock } from "@/components/blocks/ContentBlock";

export function AboutCompanyValuesSection() {
  const leftSwiperRef = useRef<SwiperType | null>(null);
  const rightSwiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <style jsx global>{`
        .left-slider-pagination .swiper-pagination-bullet,
        .right-slider-pagination .swiper-pagination-bullet {
          width: 20px !important;
          height: 20px !important;
          background: #CF2923 !important;
          opacity: 1 !important;
          transition: all 0.2s ease !important;
        }
        .left-slider-pagination .swiper-pagination-bullet:hover,
        .right-slider-pagination .swiper-pagination-bullet:hover {
          border: 5px solid #04217B !important;
        }
        .left-slider-pagination .swiper-pagination-bullet-active,
        .right-slider-pagination .swiper-pagination-bullet-active {
          background: #CF2923 !important;
          border: 5px solid #04217B !important;
        }
      `}</style>
      <section className="relative w-full py-[100px] bg-white">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        {/* First Row - Existing Content */}
        <div className="flex flex-col lg:flex-row gap-[50px] items-center mb-[100px]">
          {/* Left Column - Image */}
          <div className="w-full lg:flex-[1.00]">
            <div className="aspect-[671/556] relative w-full">
              <img 
                alt="Santa Clara Company Values" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png" 
              />
            </div>
          </div>

          {/* Right Column - Content Block */}
          <div className="w-full lg:flex-[1.00]">
            <ContentBlock
              title="Our Purpose"
              paragraphs={[
                "• Quality – We are committed to delivering products that meet the highest standards of excellence.",
                "• Integrity – We conduct our business with honesty, transparency, and accountability.",
                "• Innovation – We continuously improve our processes and products to better serve our customers.",
                "• Sustainability – We are dedicated to responsible sourcing and environmentally conscious practices.",
                "• Customer Focus – We prioritize the needs and satisfaction of our customers in everything we do."
              ]}
              showLine={true}
              lineWidth="w-full"
              align="left"
              textColor="text-[#1e1e1e]"
              titleColor="text-[#04217B]"
              lineColor="bg-[#CF2923]"
              titleTracking="tracking-[-2.4px]"
              gap="gap-10"
              removeParagraphSpacing={true}
            />
          </div>
        </div>

        {/* Second Row - Two Columns with Sliders */}
        <div className="flex flex-col lg:flex-row gap-[50px] items-start">
          {/* Left Column - Slider with Content */}
          <div className="w-full lg:flex-[1.00] min-w-0">
            {/* Slider Container */}
            <div className="relative mb-8">
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{ 
                  clickable: true,
                  el: '.left-slider-pagination',
                }}
                onSwiper={(swiper) => { leftSwiperRef.current = swiper; }}
              >
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 1" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/974bbd648b8a0570fe415755bbe12be9898052ec.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 2" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 3" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png" 
                    />
                  </div>
                </SwiperSlide>
                
                {/* Custom Pagination Container - Positioned inside at bottom */}
                <div className="left-slider-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10"></div>
              </Swiper>
            </div>
            
            {/* Content Block Below Slider */}
            <div className="text-center">
              <ContentBlock
                title="Innovation"
                paragraphs={[
                  "We continuously strive to innovate and improve our processes to deliver superior products that meet the evolving needs of our customers."
                ]}
                showLine={true}
                lineWidth="w-16"
                align="center"
                textColor="text-[#1e1e1e]"
                titleColor="text-[#04217B]"
                lineColor="bg-[#CF2923]"
                titleTracking="tracking-[-2.4px]"
                gap="gap-6"
                removeParagraphSpacing={true}
              />
            </div>
          </div>

          {/* Right Column - Slider with Content */}
          <div className="w-full lg:flex-[1.00] min-w-0">
            {/* Slider Container */}
            <div className="relative mb-8">
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{ 
                  clickable: true,
                  el: '.right-slider-pagination',
                }}
                onSwiper={(swiper) => { rightSwiperRef.current = swiper; }}
              >
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 1" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/d16802cced46c5759edc3e11bddedf609c37f12f.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 2" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/c2bb0902a63cc5657b84887806e148b6262af2fe.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[671/556] relative w-full">
                    <img 
                      alt="Value Slider Image 3" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/82ab61a2c1183322d06f1184fc8aecd8366ae9ae.png" 
                    />
                  </div>
                </SwiperSlide>
                
                {/* Custom Pagination Container - Positioned inside at bottom */}
                <div className="right-slider-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10"></div>
              </Swiper>
            </div>
            
            {/* Content Block Below Slider */}
            <div className="text-center">
              <ContentBlock
                title="Sustainability"
                paragraphs={[
                  "We are committed to sustainable practices that protect the environment and ensure a better future for generations to come."
                ]}
                showLine={true}
                lineWidth="w-16"
                align="center"
                textColor="text-[#1e1e1e]"
                titleColor="text-[#04217B]"
                lineColor="bg-[#CF2923]"
                titleTracking="tracking-[-2.4px]"
                gap="gap-6"
                removeParagraphSpacing={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
