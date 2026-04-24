import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowButton } from "@/components/ui/ArrowButton";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative w-full">
      {/* Hero Section with Background */}
      <div className="relative min-h-[785px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/error-404-background.jpg')" }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 min-h-[785px] flex flex-col">
          <Header />
          
          <div className="flex-1 flex items-center justify-center px-6 md:px-[60px]">
            <div className="w-full max-w-[1200px]">
              {/* Mobile/Tablet (<981px): 404 Icon on top, then text */}
              {/* Desktop (>=981px): Two columns - text left, icon right */}
              <div className="flex flex-col-reverse items-center justify-between gap-8 [@media(min-width:981px)]:flex-row [@media(min-width:981px)]:gap-12">
                {/* Left Column - Text */}
                <div className="text-center [@media(min-width:981px)]:text-left max-w-[500px]">
                  <h1 className="text-[42px] md:text-[72px] lg:text-[84px] font-normal text-white mb-2">Ooops...</h1>
                  <h2 className="text-xl md:text-2xl text-white mb-6">Page not found</h2>
                  <p 
                    className="text-white/80 mb-8"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontWeight: 400,
                      lineHeight: '28px',
                      letterSpacing: '-0.72px'
                    }}
                  >
                    The page you are looking for doesn&apos;t exist or another error occurred, go back to homepage.
                  </p>
                  <div className="inline-block">
                    <ArrowButton href="/" variant="primary" className="px-6 py-3 text-sm">
                      Return to Homepage
                    </ArrowButton>
                  </div>
                </div>
                
                {/* Right Column - 404 Icon */}
                <div className="flex-shrink-0">
                  <Image 
                    src="/images/404-icon.png" 
                    alt="404" 
                    width={400} 
                    height={300}
                    className="w-[280px] md:w-[350px] lg:w-[400px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
