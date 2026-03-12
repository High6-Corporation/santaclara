"use client";

import { useState } from "react";

export function Hero() {
  return (
    <section className="relative w-full bg-black lg:h-[785px] lg:max-h-[785px] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="" 
          className="w-full h-full object-cover" 
          src="/images/efd441c08cfadb81937e916cd41cc4b9a9c9c8f0.png" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content Container- Acts as Row */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] lg:h-full">
        <div className="flex flex-col lg:flex-row gap-[80px] items-start lg:items-end justify-between lg:h-full pt-[150px] lg:pt-[200px] pb-[50px] lg:pb-[100px]">
          {/* Left Column - Hero Text & CTA */}
          <div className="flex flex-col gap-[40px] items-start lg:w-[682px] flex-shrink">
            {/* Hero Text */}
            <div className="content-stretch flex flex-col gap-[12px] items-start text-white">
              <h1 className="text-[42px] md:text-[72px] lg:text-[84px] leading-[1.1] lg:leading-[90px] tracking-[-0.84px] font-body">
                A Proud<br />Filipino Product
              </h1>
              <p className="text-[20px] md:text-[24px] leading-[1.4] lg:leading-[36px] tracking-[-0.24px] font-body max-w-[686px]">
                Santa Clara Marine Plywood is a proud Filipino product and the country&apos;s most trusted marine-grade plywood brand.
              </p>
            </div>

            {/* CTA Button */}
            <HeroCTAButton />
          </div>

          {/* Right Column - Testimonial Card */}
          <div className="flex-shrink-0">
            <HeroTestimonialCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCTAButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href="#"
      className="bg-[#e31c26] flex gap-[10px] items-center justify-center px-[24px] py-[21px] rounded-[100px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#a91f1a]" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-body font-semibold text-[16px] text-white tracking-[-0.64px] whitespace-nowrap">Explore More</span>
      <div className={`relative shrink-0 size-[24px] transition-transform duration-300 ease-in-out ${isHovered ? 'rotate-[-45deg]' : 'rotate-0'}`}>
        <img src="/images/arrow-icon.svg" alt="Arrow" className="absolute inset-0 size-full" />
      </div>
    </a>
  );
}

function HeroTestimonialCard() {
  const scrollToTestimonials = () => {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-[280px] md:w-[319px]">
      {/* Testimonial Content */}
      <div className="relative backdrop-blur-[20px] bg-white/10 h-[110px] md:h-[120px] rounded-[8px] w-[240px] md:w-[274px]">
        {/* Rating */}
        <img 
          src="/images/rating-stars.svg" 
          alt="5 star rating" 
          className="absolute left-[10px] top-[12px] w-auto h-[14px] md:h-[16px]"
        />
        {/* Info */}
        <div className="absolute flex flex-col gap-[3px] md:gap-[4px] items-start left-[10px] md:left-[11px] top-[65px] md:top-[75px] text-[10px] md:text-[12px] text-white">
          <p className="font-body font-semibold">Bernard Albino</p>
          <p className="font-body font-normal">Albino Watercraft Shop from Cebu</p>
        </div>
        {/* Quote Text */}
        <p className="absolute font-body font-normal left-[10px] md:left-[11px] top-[40px] md:top-[45px] text-[14px] md:text-[16px] text-white tracking-[-0.64px] whitespace-nowrap">
          Trusted by Boat Makers
        </p>
        {/* Quote Icon */}
        <div className="absolute flex h-[18px] md:h-[21px] items-center justify-center left-[195px] md:left-[229px] top-[12px] md:top-[14px] w-[24px] md:w-[27px]">
          <div className="-scale-y-100 rotate-180">
            <img src="/images/quote-icon.svg" alt="Quote" className="w-[24px] md:w-[27px] h-[18px] md:h-[21px]" />
          </div>
        </div>
      </div>
      {/* Arrow Button */}
      <button 
        onClick={scrollToTestimonials}
        className="absolute backdrop-blur-[20px] bg-white/10 h-[110px] md:h-[120px] left-[245px] md:left-[279px] rounded-[6px] top-0 w-[35px] md:w-[40px] cursor-pointer hover:bg-white/20 transition-colors"
        aria-label="Scroll to testimonials"
      >
        <div className="absolute flex items-center justify-center left-1/2 -translate-x-1/2 size-[20px] md:size-[24px] top-[43px] md:top-[48px]">
          <img src="/images/testimonial-arrow-icon.svg" alt="Arrow" className="w-[20px] md:w-[24px] h-[20px] md:h-[24px]" />
        </div>
      </button>
    </div>
  );
}
