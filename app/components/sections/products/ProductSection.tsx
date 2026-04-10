"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product as WPProduct } from "@/lib/graphqlService";
import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { InquiryModal } from "@/app/components/ui/InquiryModal";

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
        <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[60px] lg:gap-[50px] ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}>
          {/* Content Section */}
          <div className="flex flex-col gap-[40px] items-start w-full lg:w-[599px]">
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
                  <strong>Details:</strong>{" "}
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
                  <strong>More info:</strong>
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
                  <strong>Recommended Application:</strong>{" "}
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
          <div className="flex flex-col gap-[20px] items-start w-full lg:w-[671px]">
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
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={4}
                  navigation
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
                  navigation
                  pagination={{ clickable: true }}
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

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxMedia && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 text-white hover:text-[#e31c26] transition-colors duration-200"
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
        </div>
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
