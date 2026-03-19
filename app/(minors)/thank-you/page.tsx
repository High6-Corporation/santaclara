"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowButton } from "@/components/ui/ArrowButton";
import Image from "next/image";

export default function ThankYouPage() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Hero Section with Background */}
      <div className="relative min-h-[785px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/thank-you-background.jpg')" }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 min-h-[785px] flex flex-col">
          <Header />
          
          <div className="flex-1 flex items-center justify-center px-6 md:px-[60px]">
            <div className="text-center max-w-[600px]">
              {/* Thank You Icon */}
              <div className="mb-6 flex justify-center">
                <Image 
                  src="/images/thank-you-icon.svg" 
                  alt="Thank you" 
                  width={80} 
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              
              <h1 className="text-[42px] md:text-[72px] lg:text-[84px] font-normal text-white mb-2">Thank You!</h1>
              <p 
                className="text-white mb-10"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.72px',
                  textAlign: 'center'
                }}
              >
                Thanks for reaching out!<br/>Your message just showed up in our inbox.<br className="lg:hidden" /> Talk to you soon!
              </p>
              <div className="inline-block">
                <ArrowButton href="/" variant="primary" className="px-6 py-3 text-sm">
                  Return to Homepage
                </ArrowButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Outside of background container */}
      <Footer />
    </div>
  );
}
