"use client";

interface SubpageBannerProps {
  title: string;
  backgroundImage?: string;
}

export function SubpageBanner({ title, backgroundImage = "/images/efd441c08cfadb81937e916cd41cc4b9a9c9c8f0.png" }: SubpageBannerProps) {
  return (
    <section 
      className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] bg-black overflow-hidden"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${backgroundImage}) lightgray 50% / cover no-repeat`
      }}
    >
      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] h-full flex items-center justify-center pt-[80px] overflow-hidden">
        <h1 className="text-white text-[42px] md:text-[72px] lg:text-[84px] leading-[1.1] tracking-[-0.72px] font-body text-center">
          {title}
        </h1>
      </div>
    </section>
  );
}