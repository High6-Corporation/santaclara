"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product as WPProduct } from "@/lib/graphqlService";
import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { InquiryModal } from "@/app/components/ui/InquiryModal";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";

interface ProductSectionProps {
  product: WPProduct;
  variant?: "light" | "dark";
  index?: number;
}

export function ProductSection({ product, variant = "light", index = 0 }: ProductSectionProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);
  const [mounted, setMounted] = useState(false);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation(0.1);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = variant === "dark";
  const isEven = index % 2 === 0;
  
  // Extract gallery items from ACF repeater
  const galleryItems = product.productGalleries?.imageAndVideoGalleries || [];
  
  // Filter images and videos - fileType is an ARRAY, not a string!
  const images = galleryItems.filter(item => 
    Array.isArray(item.fileType) && item.fileType.includes('image')
  );
  const videos = galleryItems.filter(item => 
    Array.isArray(item.fileType) && item.fileType.includes('video')
  );

  // Get media URL from file node - handle different possible structures
  const getMediaUrl = (item: typeof galleryItems[0]) => {
    const fileData = item.file as unknown as { node?: { sourceUrl?: string } };
    const url = fileData?.node?.sourceUrl || '';
    return url;
  };

  // Get all image URLs for thumbnail gallery
  const allImageUrls = images.map(getMediaUrl).filter(Boolean);

  return (
    <section
      className={`relative w-full ${
        isDark ? "bg-[#04217b]" : "bg-white"
      } py-[100px] lg:py-[120px] overflow-hidden`}
    >
      <div className="w-[90%] max-w-[1320px] mx-auto">
        <div className={`flex flex-col xl:flex-row items-start xl:items-center justify-between gap-[60px] xl:gap-[50px] ${
          isEven ? '' : 'xl:flex-row-reverse'
        }`}>
          {/* Content Section */}
          <div 
            ref={contentRef}
            className="flex flex-col gap-[40px] items-start w-full xl:w-[599px]"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            {/* Title Section */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <h2
                className={`font-['Inter',sans-serif] font-normal text-[36px] md:text-[48px] lg:text-[60px] leading-[normal] tracking-[-2.4px] w-full ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {product.productCategories?.nodes?.[0]?.name && (
                  <span className="font-normal">{product.productCategories.nodes[0].name} - </span>
                )}
                <span className="font-normal">{product.title}</span>
              </h2>
              <div className="w-full h-[2px] bg-[#CF2923]" />
            </div>

            {/* Description (Content) */}
            {product.content && (
              <div
                className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[28px] tracking-[-0.64px] w-full ${
                  isDark ? "text-white" : "text-[#333]"
                }`}
              >
                <div>
                  <span className="font-semibold">Details:</span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.content.replace(/^<p>|<\/p>$/g, ""),
                    }}
                  />
                </div>
              </div>
            )}

            {/* More Info (WYSIWYG) */}
            {product.productMoreInfo?.moreInfo && (
              <div
                className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[28px] tracking-[-0.64px] w-full ${
                  isDark ? "text-white" : "text-[#333]"
                }`}
              >
                <div>
                  <span className="font-semibold">More info:</span>
                </div>
                <div
                  className="more-info-content"
                  dangerouslySetInnerHTML={{
                    __html: product.productMoreInfo.moreInfo.replace(/^<p>|<\/p>$/g, ""),
                  }}
                />
              </div>
            )}

            {/* Application (WYSIWYG) */}
            {product.productApplication?.application && (
              <div
                className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[28px] tracking-[-0.64px] w-full ${
                  isDark ? "text-white" : "text-[#333]"
                }`}
              >
                <div className="mb-[16px]">
                  <span className="font-semibold">Recommended Application:</span>{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: product.productApplication.application.replace(/^<p>|<\/p>$/g, ""),
                    }}
                  />
                </div>
              </div>
            )}

            {/* CTA Button */}
            <ArrowButton onClick={() => setIsModalOpen(true)}>Inquire Now</ArrowButton>
          </div>

          {/* Gallery Section */}
          <div 
            ref={galleryRef}
            className="flex flex-col gap-[20px] items-start w-full xl:w-[671px]"
            style={{
              opacity: galleryVisible ? 1 : 0,
              transform: galleryVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            {/* Main Image Display - Clickable for Lightbox */}
            <div 
              className="bg-white w-full h-[460px] overflow-clip relative cursor-pointer"
              onClick={() => {
                if (allImageUrls[selectedMedia]) {
                  setLightboxMedia({ url: allImageUrls[selectedMedia], type: 'image' });
                  setIsLightboxOpen(true);
                }
              }}
            >
              {allImageUrls.length > 0 ? (
                <img
                  src={allImageUrls[selectedMedia]}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {allImageUrls.length > 1 && (
              <div className="w-full">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={4}
                  loop={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                  className="!pb-12"
                >
                  {allImageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                      <button
                        onClick={() => setSelectedMedia(index)}
                        className={`overflow-clip relative w-full aspect-square border-2 transition-all cursor-pointer ${
                          selectedMedia === index
                            ? "border-[#cf2923]"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={url}
                          alt={`${product.title} - Image ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Video Section (if any) */}
            {videos.length > 0 && (
              <div className="flex flex-col gap-[20px] w-full mt-[20px]">
                <h3 className={`font-['Inter',sans-serif] font-semibold text-[24px] ${
                  isDark ? "text-white" : "text-black"
                }`}>
                  Product Videos
                </h3>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  navigation={{
                    enabled: true,
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    320: {
                      navigation: {
                        enabled: false,
                      },
                    },
                    768: {
                      navigation: {
                        enabled: false,
                      },
                    },
                    1024: {
                      navigation: {
                        enabled: true,
                      },
                    },
                  }}
                >
                  {videos.map((video, index) => {
                    const videoUrl = getMediaUrl(video);
                    return videoUrl ? (
                      <SwiperSlide key={index}>
                        <div className="bg-white w-full h-[460px] overflow-clip relative">
                          <video
                            controls
                            className="absolute inset-0 w-full h-full object-cover"
                            src={videoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </SwiperSlide>
                    ) : null;
                  })}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal - Rendered via Portal */}
      {mounted && isLightboxOpen && lightboxMedia && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsLightboxOpen(false)}
          style={{ position: 'fixed' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-[100000] text-white hover:text-[#e31c26] transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Lightbox Content */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxMedia.type === 'image' ? (
              <img
                src={lightboxMedia.url}
                alt={product.title}
                className="max-w-full max-h-[90vh] object-contain"
              />
            ) : (
              <video
                controls
                autoPlay
                className="max-w-full max-h-[90vh] object-contain"
                src={lightboxMedia.url}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.title}
        productCategory={product.productCategories?.nodes?.[0]?.name || ''}
        formId="2"
      />
    </section>
  );
}
