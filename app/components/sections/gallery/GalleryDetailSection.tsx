"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import type { GalleryImageNode } from "@/lib/graphqlService";

interface GalleryDetailSectionProps {
  images: GalleryImageNode[];
}

// Lightbox Component
function Lightbox({
  selectedImage,
  images,
  onClose,
  onNavigate,
}: {
  selectedImage: GalleryImageNode;
  images: GalleryImageNode[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
      style={{ position: "fixed" }}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-[100000]"
        onClick={onClose}
      >
        ×
      </button>

      <button
        className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-[100000]"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
      >
        ‹
      </button>

      <img
        src={selectedImage.sourceUrl}
        alt={selectedImage.altText || ""}
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-[100000]"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
      >
        ›
      </button>
    </div>
  );
}

export function GalleryDetailSection({ images }: GalleryDetailSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction: "prev" | "next") => {
    let newIndex = direction === "prev" ? selectedIndex - 1 : selectedIndex + 1;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setSelectedIndex(newIndex);
  };

  return (
    <section className="w-full bg-white py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px] w-full max-w-[1320px] mx-auto"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-black overflow-hidden cursor-pointer h-[280px] sm:h-[300px] lg:h-[320px]"
              onClick={() => handleImageClick(index)}
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "scale(1)" : "scale(0.92)",
                transition: `opacity 0.6s ease-out ${0.1 + index * 0.06}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.06}s`,
              }}
            >
              <img
                src={image.sourceUrl}
                alt={image.altText || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Rendered via Portal */}
      {mounted &&
        lightboxOpen &&
        images[selectedIndex] &&
        createPortal(
          <Lightbox
            selectedImage={images[selectedIndex]}
            images={images}
            onClose={closeLightbox}
            onNavigate={navigateImage}
          />,
          document.body
        )}
    </section>
  );
}
