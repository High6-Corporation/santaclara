"use client";

import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";

export function SalesOfficeSection() {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAjbHyFs7o64UZtx5xVhryDsHxPHONhNC4";

  // Manila coordinates
  const manilaLat = 14.6009353;
  const manilaLng = 120.9715235;

  // Davao coordinates
  const davaoLat = 7.0138252;
  const davaoLng = 125.4974107;

  return (
    <Section bgColor="bg-[#F5F6FA] lg:py-[50px] md:py-[40px] py-[30px]">
      <Row className="!max-w-[1227px]">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] md:leading-[72.6px] tracking-[2.4px] text-[#333333] lg:mb-[50px] md:mb-[30px] mb-[20px]">
              SMWPI Sales Office
            </h2>
          </div>

          {/* Manila Row */}
          <div className="flex flex-col lg:flex-row gap-[30px] lg:mb-[50px] mb-[40px]">
            {/* Map Column */}
            <div className="lg:max-w-[670px] w-full">
              <div className="w-full h-[461px]">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.google.com/maps/embed/v1/place?q=${manilaLat},${manilaLng}&zoom=15&key=${GOOGLE_MAPS_API_KEY}`}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:max-w-[507px] w-full flex items-center">
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] lg:leading-[72.6px] tracking-[2.4px] text-[#333333] uppercase mb-[10px]">
                  Manila
                </h2>
                
                {/* Address with Icon */}
                <div className="flex gap-[12px] items-start">
                  <img src="/images/location-icon.svg" alt="Location" className="w-[24px] h-[24px] shrink-0 mt-[2px]" />
                  <a
                    href="https://www.google.com/maps/place/Tytana+Plaza,+Insular+St,+Binondo,+Manila,+1000+Metro+Manila/@14.6009353,120.9715235,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ca1025c484d1:0xb7f4f660f2aa9f8d!8m2!3d14.6009301!4d120.9740984!16s%2Fg%2F11xzgnf6jq?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    1824 Tytana Plaza, Plaza Lorenzo Ruiz, Binondo, Manila, Philippines
                  </a>
                </div>

                {/* Email with Icon */}
                <div className="flex gap-[12px] items-center">
                  <img src="/images/EmailIcon.svg" alt="Email" className="w-[24px] h-[24px] shrink-0" />
                  <a
                    href="mailto:info@santaclaraplywood.com"
                    className="md:text-base text-sm underline leading-[24px] tracking-[-0.72px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    info@santaclaraplywood.com
                  </a>
                </div>

                {/* Contact Number with Icon */}
                <div className="flex gap-[12px] items-center">
                  <img src="/images/mobile-icon.svg" alt="Phone" className="w-[24px] h-[24px] shrink-0" />
                  <a
                    href="tel:+6322425998"
                    className="md:text-base text-sm leading-[24px] tracking-[-0.72px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 2) 242-5998
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Davao Row - Reverse Layout */}
          <div className="flex flex-col lg:flex-row gap-[30px]">
            {/* Details Column */}
            <div className="lg:w-1/2 w-full flex items-center lg:order-1 order-2">
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal leading-[40px] lg:leading-[72.6px] tracking-[2.4px] text-[#333333] uppercase mb-[10px]">
                  Davao
                </h2>
                <div className="flex gap-[12px] items-start">
                  <img src="/images/location-icon.svg" alt="Location" className="w-[24px] h-[24px] shrink-0 mt-[2px]" />
                  <a
                    href="https://www.google.com/maps/place/Daliao,+Toril,+Davao+City,+Davao+del+Sur/@7.0138252,125.4974107,15z/data=!3m1!4b1!4m6!3m5!1s0x32f90c427ea824fd:0x749d6d2f5963642c!8m2!3d7.0158047!4d125.5083136!16s%2Fg%2F1ptxlnbn9?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base leading-[28px] tracking-[-0.64px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    Daliao, Toril, Davao City, Davao del Sur, Philippines
                  </a>
                </div>
               {/* Email with Icon */}
                <div className="flex gap-[12px] items-center">
                  <img src="/images/EmailIcon.svg" alt="Email" className="w-[24px] h-[24px] shrink-0" />
                  <a
                    href="mailto:info@santaclaraplywood.com"
                    className="md:text-base text-sm underline leading-[24px] tracking-[-0.72px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    info@santaclaraplywood.com
                  </a>
                </div>
                <div className="flex gap-[12px] items-center items-start">
                  <img src="/images/mobile-icon.svg" alt="Phone" className="w-[24px] h-[24px] mt-1 shrink-0" />
                  <div className="flex flex-col">
                  <a
                    href="tel:+63822910898"
                    className="text-base leading-[28px] tracking-[-0.64px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0898
                  </a>
                  <a
                    href="tel:+63822910899"
                    className="text-base leading-[28px] tracking-[-0.64px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0899
                  </a>
                  <a
                    href="tel:+63822910900"
                    className="text-base leading-[28px] tracking-[-0.64px] text-black hover:text-[#e31c26] transition-colors duration-200"
                  >
                    (+63 82) 291-0900
                  </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Column */}
            <div className="lg:max-w-[670px] w-full lg:order-2 order-1">
              <div className="w-full h-[461px]">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://www.google.com/maps/embed/v1/place?q=${davaoLat},${davaoLng}&zoom=15&key=${GOOGLE_MAPS_API_KEY}`}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
      </Row>
    </Section>
  );
}
