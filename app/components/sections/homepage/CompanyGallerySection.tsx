"use client";

import { useState } from "react";
import { ArrowButton } from "@/app/components/ui/ArrowButton";
import { ContentBlock } from "@/app/components/blocks/ContentBlock";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { id: 'main', src: '/images/gallery-image.jpg', alt: 'Santa Clara Marine Plywood - Main Gallery Image' },
  { id: 'grid1', src: '/images/gallery-image-1.jpg', alt: 'Gallery Image 1' },
  { id: 'grid2', src: '/images/gallery-image-2.jpg', alt: 'Gallery Image 2' },
  { id: 'grid3', src: '/images/gallery-image-3.jpg', alt: 'Gallery Image 3' },
  { id: 'grid4', src: '/images/gallery-image-4.jpg', alt: 'Gallery Image 4' }
];

// Gallery Image Component
function GalleryImageCard({ 
  image, 
  onClick, 
  isMain = false 
}: { 
  image: GalleryImage; 
  onClick: (image: GalleryImage) => void;
  isMain?: boolean;
}) {
  return (
    <div 
      className={`bg-black overflow-hidden cursor-pointer ${
        isMain 
          ? "h-[300px] sm:h-[400px] lg:h-[487px] w-full"
          : "h-[200px] sm:h-[235px] w-full"
      }`}
      onClick={() => onClick(image)}
    >
      <img 
        alt={image.alt} 
        className="w-full h-full object-cover" 
        src={image.src} 
      />
    </div>
  );
}

// Lightbox Component
function Lightbox({ 
  selectedImage, 
  onClose, 
  onNavigate 
}: { 
  selectedImage: GalleryImage; 
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}) {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
        onClick={onClose}
      >
        ×
      </button>
      
      <button 
        className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
      >
        ‹
      </button>
      
      <img 
        src={selectedImage.src} 
        alt={selectedImage.alt} 
        className="max-w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      
      <button 
        className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
      >
        ›
      </button>
    </div>
  );
}

export function CompanyGallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    
    setSelectedImage(galleryImages[newIndex]);
  };

  const mainImage = galleryImages[0];
  const gridImages = galleryImages.slice(1);

  return (
    <section className="relative w-full bg-white py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
        <div className="flex flex-col gap-[50px] items-center w-full max-w-[1320px] mx-auto">
          {/* Title */}
          <div className="flex flex-col gap-[24px] items-start w-full">
            <div className="inline-flex items-center justify-center px-[20px] py-[14px] rounded-[100px] border border-black">
              <span className="font-body font-normal text-[14px] text-black tracking-[-0.14px] whitespace-nowrap">Media Collection</span>
            </div>
            <h2 className="font-body font-normal text-[36px] md:text-[48px] lg:text-[60px] text-black tracking-[-2.4px]">Our Gallery</h2>
            <div className="w-full h-[2px] bg-[#CF2923]" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[16px] xl:gap-[20px] w-full">
            {/* Main Image */}
            <div className="xl:row-span-2">
              <GalleryImageCard image={mainImage} onClick={handleImageClick} isMain />
            </div>
            {/* Grid Images - 2x2 layout */}
            <div className="grid grid-cols-2 gap-[16px] xl:gap-[20px]">
              {gridImages.map((image) => (
                <GalleryImageCard key={image.id} image={image} onClick={handleImageClick} />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <ArrowButton href="/coming-soon">View More Photos</ArrowButton>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <Lightbox 
          selectedImage={selectedImage} 
          onClose={closeLightbox} 
          onNavigate={navigateImage} 
        />
      )}
    </section>
  );
}
