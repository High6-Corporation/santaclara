"use client";

import { useState } from "react";
import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { GalleryCard } from "@/app/components/blocks/GalleryCard";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { GalleryItem, normalizeGalleryImages } from "@/lib/graphqlService";

interface CompanyGallerySectionProps {
  galleries: GalleryItem[];
}

export function CompanyGallerySection({ galleries }: CompanyGallerySectionProps) {
  const [expanded, setExpanded] = useState(false);
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.1);

  const visibleGalleries = expanded ? galleries : galleries.slice(0, 3);
  const hasMore = galleries.length > 3;

  return (
    <section className="relative w-full bg-white py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col gap-[50px] items-center w-full max-w-[1320px] mx-auto">
          {/* Title */}
          <div
            ref={headingRef}
            className="flex flex-col gap-[24px] items-start w-full"
            style={{
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(30px)",
              transition:
                "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="inline-flex items-center justify-center px-[20px] py-[14px] rounded-[100px] border border-black">
              <span className="font-body font-normal text-[14px] text-black tracking-[-0.14px] whitespace-nowrap">
                Media Collection
              </span>
            </div>
            <h2 className="font-body font-normal text-[36px] md:text-[48px] lg:text-[60px] text-black tracking-[-2.4px]">
              Tradeshows and Exhibits
            </h2>
            <div className="w-full h-[2px] bg-[#CF2923]" />
          </div>

          {/* Gallery Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full"
          >
            {visibleGalleries.map((gallery, index) => {
              const images = normalizeGalleryImages(gallery.galleryFields?.galleryImages);
              const coverImage =
                images[0]?.sourceUrl ||
                "/images/gallery-image.jpg";

              return (
                <div
                  key={gallery.id}
                  style={{
                    opacity: gridVisible ? 1 : 0,
                    transform: gridVisible ? "scale(1)" : "scale(0.9)",
                    transition: `opacity 0.6s ease-out ${0.2 + index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.1}s`,
                  }}
                >
                  <GalleryCard
                    image={coverImage}
                    title={gallery.title}
                    href={`/gallery/${gallery.slug}`}
                  />
                </div>
              );
            })}
          </div>

          {/* CTA Button - View More / View Less */}
          {hasMore && (
            <div
              ref={ctaRef}
              style={{
                opacity: ctaVisible ? 1 : 0,
                transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
                transition:
                  "opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <ArrowButton onClick={() => setExpanded((prev) => !prev)}>
                {expanded ? "Show Less" : "View More Photos"}
              </ArrowButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
