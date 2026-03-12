"use client";

import { ArrowButton } from "@/components/ui/ArrowButton";
import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen w-full bg-white [@media(min-width:981px)]:bg-transparent">
      {/* Full Page Background Image - Desktop only */}
      <div 
        className="hidden [@media(min-width:981px)]:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/coming-soon-background.jpg')" }}
      />
      
      {/* Full Page Gradient Overlay - Desktop only */}
      <div 
        className="hidden [@media(min-width:981px)]:block absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 40%, rgba(255, 255, 255, 0.8) 55%, #FFF 65%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - empty (background visible) - Desktop only */}
        <div className="hidden [@media(min-width:981px)]:block w-1/2" />
        
        {/* Right side - content */}
        <div className="w-full [@media(min-width:981px)]:w-1/2 flex flex-col justify-center items-center px-8 py-16 [@media(min-width:981px)]:px-16 [@media(min-width:981px)]:lg:px-20">
          <div className="max-w-[566px] w-full">
            {/* Logo */}
            <div className="mb-8 flex justify-center [@media(min-width:981px)]:justify-center">
              <Image 
                src="/images/minor-logo.png" 
                alt="Santa Clara Marine Plywood" 
                width={412} 
                height={183}
                className="w-[280px] md:w-[350px] lg:w-[412px] h-auto"
                style={{ aspectRatio: '412/183' }}
              />
            </div>
            
            {/* Content */}
            <div className="text-center [@media(min-width:981px)]:text-center">
              <h1 
                className="font-normal text-black mb-4"
                style={{
                  fontSize: 'clamp(36px, 5vw, 84px)',
                  lineHeight: '1.07',
                  letterSpacing: '-0.02em'
                }}
              >
                Coming Soon
              </h1>
              <p 
                className="text-black mb-2 text-center [@media(min-width:981px)]:text-center"
                style={{
                  fontFamily: 'Inter',
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  fontWeight: 400,
                  lineHeight: '1.55',
                  letterSpacing: '-0.04em'
                }}
              >
                Exciting things are on the horizon! Stay tuned for our upcoming website.
              </p>
              <p 
                className="text-black mb-8 text-center [@media(min-width:981px)]:text-center"
                style={{
                  fontFamily: 'Inter',
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  fontWeight: 400,
                  lineHeight: '1.55',
                  letterSpacing: '-0.04em'
                }}
              >
                Launching soon!
              </p>
              
              <div className="flex justify-center [@media(min-width:981px)]:justify-center mb-12">
                <ArrowButton href="/" variant="primary" className="px-6 py-3 text-sm ">
                  Return to Homepage
                </ArrowButton>
              </div>
            </div>
            
            {/* Copyright */}
            <p className="text-[11px] text-black text-center [@media(min-width:981px)]:text-center">
              © 2026 SANTA CLARA MARINE PLYWOOD . All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
