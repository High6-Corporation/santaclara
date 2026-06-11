"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ContentBlock } from "@/components/blocks/ContentBlock";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

export function AboutCompanyValuesSection() {
  const leftSwiperRef = useRef<SwiperType | null>(null);
  const rightSwiperRef = useRef<SwiperType | null>(null);
  const { ref: topImageRef, isVisible: topImageVisible } = useScrollAnimation(0.1);
  const { ref: topContentRef, isVisible: topContentVisible } = useScrollAnimation(0.2);
  const { ref: slidersRef, isVisible: slidersVisible } = useScrollAnimation(0.1);

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
      <section className="relative w-full py-[100px] bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        {/* First Row - Existing Content */}
        <div className="flex flex-col lg:flex-row gap-[50px] items-center mb-[100px]">
          {/* Left Column - Image */}
          <div 
            ref={topImageRef}
            className="w-full lg:flex-[1.06]"
            style={{
              opacity: topImageVisible ? 1 : 0,
              transform: topImageVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 1.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="aspect-[671/556] relative w-full">
              <img 
                alt="Santa Clara Company Values" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="/images/our_purpose.jpg" 
              />
            </div>
          </div>

          {/* Right Column - Content Block */}
          <div 
            ref={topContentRef}
            className="w-full lg:flex-[0.94]"
            style={{
              opacity: topContentVisible ? 1 : 0,
              transform: topContentVisible ? "translateX(0)" : "translateX(60px)",
              transition: "opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <ContentBlock
              title="Our Purpose"
              paragraphs={[
                "To be able to continue improving our products in order to perpetuate the life of the business.",
                "To cope with the pace and challenges facing the world's wood industry through updated technology.",
                "To have a dynamic organization to carry out the task of innovative undertakings.",
                "To motivate our people into higher level of commitment in fulfilling our mission.",
                "To be able to sustain growth and continue improving our human resources, machineries and structural facilities."
              ]}
              showLine={true}
              lineWidth="w-full"
              align="left"
              textColor="text-[#333]"
              titleColor="text-black"
              lineColor="bg-[#CF2923]"
              titleTracking="tracking-[-2.4px]"
              gap="gap-6"
              bulletIcon="/images/bullet_icon.svg"
              paragraphMarginTop="mt-[20px]"
            />
          </div>
        </div>

        {/* Second Row - Two Columns with Sliders */}
        <div 
          ref={slidersRef}
          className="flex flex-col lg:flex-row gap-[20px] items-start"
          style={{
            opacity: slidersVisible ? 1 : 0,
            transform: slidersVisible ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          {/* Left Column - Slider with Content */}
          <div className="w-full lg:flex-[1.00] min-w-0">
            {/* Slider Container */}
            <div className="relative mb-8 overflow-hidden">
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
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 1" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/superior_quality.jpg" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 2" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/7d9187bda933145126e88ddb487babf0a9a6ff9e.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 3" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/7e0c58a94520b877241b31fd384100e7428bfc17.png" 
                    />
                  </div>
                </SwiperSlide>
                
                {/* Custom Pagination Container - Positioned inside at bottom */}
                <div className="left-slider-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10 gap-3"></div>
              </Swiper>
            </div>
            
            {/* Content Block Below Slider */}
            <div className="text-center max-w-[600px] mx-auto">
              <ContentBlock
                title="Superior Quality"
                paragraphs={[
                  "SMWPI prides itself on the renowned Santa Clara Marine Plywood. The Santa Clara Marine Plywood brand gained the acceptance of customers because of its unmatched quality. A set of Santa Clara Marine Plywood sample is taken from each batch produced and subjected to the 72-hour continuous boiling test to make sure that it can withstand even the toughest weather conditions. The superior quality of Santa Clara Marine Plywood is also a result of using the right adhesive and correct pressing temperature, and careful manual inspection of each Santa Clara Marine Plywood sheet."
                ]}
                showLine={true}
                lineWidth="w-full"
                align="center"
                textColor="text-[#333]"
                titleColor="text-black"
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
            <div className="relative mb-8 overflow-hidden">
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
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 1" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/authenticity_guarantee.jpg" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 2" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/c2bb0902a63cc5657b84887806e148b6262af2fe.png" 
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="aspect-[650/650] relative w-full">
                    <img 
                      alt="Value Slider Image 3" 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src="/images/82ab61a2c1183322d06f1184fc8aecd8366ae9ae.png" 
                    />
                  </div>
                </SwiperSlide>
                
                {/* Custom Pagination Container - Positioned inside at bottom */}
                <div className="right-slider-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10 gap-3"></div>
              </Swiper>
            </div>
            
            {/* Content Block Below Slider */}
            <div className="text-center max-w-[600px] mx-auto">
              <ContentBlock
                title="Authenticity Guarantee"
                paragraphs={[
                  "Customers are assured that they receive only the best products through the authenticity markings, such as Santa Clara Marine Plywood stickers with barcode and tracking number, stamped logos and/or laser etching. Customers can track or inquire about a product through SMWPI’s hotline."
                ]}
                showLine={true}
                lineWidth="w-full"
                align="center"
                textColor="text-[#333]"
                titleColor="text-black"
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
