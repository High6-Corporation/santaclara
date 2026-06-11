"use client";

import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface Testimonial {
  title: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    title: "Trusted by Boat Builders",
    quote: "As a boat maker, I trust Santa Clara Marine Plywood for its durability and consistent quality. It keeps my boats strong and professional.",
    name: "Bernard Albino",
    role: "Albino Watercraft Shop from Cebu"
  },
  {
    title: "Reliability You Can Build On",
    quote: "I rely on Santa Clara Marine Plywood for its durability and consistent quality. It ensures every piece is strong and professional.",
    name: "Harold Cabinetry",
    role: "Furniture"
  },
  {
    title: "When Quality Matters Most",
    quote: "Durable, reliable, and built to last — Santa Clara Marine Plywood is my go-to for all boat projects.",
    name: "Rickson",
    role: "Pinamalayan, Oriental Mindoro"
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-[#f5f6fa] relative rounded-[20px] w-full md:w-[calc(50%-10px)] xl:w-full flex flex-col border border-[#cdcdcd]">
      <div className="px-[20px] py-[41.5px] flex flex-col gap-[16px] flex-1">
        <p className="font-body font-medium leading-[1.3] lg:leading-[27px] text-[20px] md:text-[24px] text-black tracking-[-0.24px]">
          {testimonial.title}
        </p>
        <img src="/images/rating-stars.svg" alt="5 star rating" className="w-[144px] h-[24px]" />
        <p className="font-body font-normal leading-[1.5] lg:leading-[27px] text-[14px] md:text-[16px] text-black tracking-[-0.64px] flex-1 min-h-[84px]">
          {testimonial.quote}
        </p>
      </div>
      <div className="bg-[#04217b] p-[20px] rounded-b-[20px]">
        <div className="flex flex-col gap-[6px]">
          <p className="font-body font-semibold text-[16px] text-white tracking-[-0.64px]">{testimonial.name}</p>
          <p className="font-body font-normal text-[16px] text-white tracking-[-0.64px]">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation(0.2);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.1);

  return (
    <section id="testimonials" className="relative w-full bg-[rgba(4,33,123,0.04)] py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col gap-[40px] items-center w-full">
          {/* Title */}
          <div 
            ref={headingRef}
            className="flex flex-col gap-[24px] items-start w-full"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="inline-flex items-center justify-center px-[20px] py-[14px] rounded-[100px] border border-black">
              <span className="font-body font-normal text-[14px] text-black tracking-[-0.14px] whitespace-nowrap">Testimonials</span>
            </div>
            <h2 className="font-body font-normal text-[36px] md:text-[48px] lg:text-[60px] text-black tracking-[-2.4px]">What Our Clients Say</h2>
            <div className="w-full h-[2px] bg-[#CF2923]" />
          </div>

          {/* Testimonial Grid */}
          <div ref={cardsRef} className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap gap-[20px] items-stretch w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col"
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.9)",
                  transition: `opacity 0.8s ease-out ${0.2 + index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.15}s`,
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
