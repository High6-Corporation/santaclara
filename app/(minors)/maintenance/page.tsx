"use client";

import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image - No Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/maintenance-background.jpg')" }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-8">
        <div className="text-center max-w-[766px]">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
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
          <h1 className="font-normal text-white mb-[31px] text-[36px] md:text-[60px] lg:text-[84px] leading-[1.07] tracking-[-0.02em]">
            Under Maintenance
          </h1>
          <p className="text-white mb-1 text-[14px] md:text-[16px] lg:text-[18px] leading-[1.55] tracking-[-0.04em] font-body">
            Exciting things are on the horizon! Stay tuned for our upcoming website.
          </p>
          <p className="text-white mb-[60px] text-[14px] md:text-[16px] lg:text-[18px] leading-[1.55] tracking-[-0.04em] font-body">
            Launching soon!
          </p>
          
          {/* Copyright */}
          <p className="text-[11px] text-white text-center">
            © 2026 SANTA CLARA MARINE PLYWOOD . All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
