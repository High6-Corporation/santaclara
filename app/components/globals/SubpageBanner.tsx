"use client";

interface SubpageBannerProps {
  title: string;
}

export function SubpageBanner({ title }: SubpageBannerProps) {
  return (
    <section className="relative w-full h-[400px] bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="" 
          className="w-full h-full object-cover" 
          src="/images/efd441c08cfadb81937e916cd41cc4b9a9c9c8f0.png" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] h-full flex items-center justify-center">
        <h1 className="text-white text-[42px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.72px] font-body text-center">
          {title}
        </h1>
      </div>
    </section>
  );
}