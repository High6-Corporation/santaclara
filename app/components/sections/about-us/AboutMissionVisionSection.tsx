"use client";

export function AboutMissionVisionSection() {
  return (
    <section className="relative w-full h-[600px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/7e0c58a94520b877241b31fd384100e7428bfc17.png')" }}
      />
      
      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-[5%] lg:px-[60px] h-full flex items-end pb-[50px]">
        <div className="flex flex-col lg:flex-row gap-[30px] items-stretch justify-center w-full">
          {/* Mission Card */}
          <div className="w-full lg:flex-1 bg-[#CF2923] p-[40px] flex flex-col justify-center min-h-[212px] max-w-[607px]">
            <h3 className="text-[24px] md:text-[32px] tracking-[-1.28px] font-semibold text-white font-body mb-[20px]">
              Mission
            </h3>
            <p className="text-[16px] leading-[28px] tracking-[-0.64px] text-white font-body">
              To satisfy the needs of the world for quality marine plywood and other wood products.
            </p>
          </div>

          {/* Vision Card */}
          <div className="w-full lg:flex-1 bg-[#CF2923] p-[40px] flex flex-col justify-center min-h-[212px] max-w-[607px]">
            <h3 className="text-[24px] md:text-[32px] tracking-[-1.28px] font-semibold text-white font-body mb-[20px]">
              Vision
            </h3>
            <p className="text-[16px] leading-[28px] tracking-[-0.64px] text-white font-body">
              To be the leader in the manufacture of the best quality plywood in the market, carrying the famous Santa Clara Brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
