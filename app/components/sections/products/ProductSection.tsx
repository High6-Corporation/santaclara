"use client";

import { useState } from "react";
import { Product } from "@/types/index";
import { ArrowButton } from "@/app/components/ui/ArrowButton";

interface ProductSectionProps {
  product: Product;
  variant?: "light" | "dark";
}

export function ProductSection({ product, variant = "light" }: ProductSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  const isDark = variant === "dark";
  
  const allImages = [product.image, ...(product.gallery || [])];

  return (
    <section
      className={`relative w-full ${
        isDark ? "bg-[#04217b]" : "bg-white"
      } py-[100px] lg:py-[120px] overflow-hidden`}
    >
      <div className="w-[90%] max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[60px] lg:gap-[50px]">
          {/* Left Content */}
          <div className="flex flex-col gap-[40px] items-start w-full lg:w-[599px]">
            {/* Title Section */}
            <div className="flex flex-col gap-[24px] items-start w-full">
              <h2
                className={`font-['Inter',sans-serif] font-normal text-[36px] md:text-[48px] lg:text-[60px] leading-[normal] tracking-[-2.4px] w-full ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {product.name}
              </h2>
              <div className="w-full h-[2px] bg-[#CF2923]" />
            </div>

            {/* Description */}
            <div
              className={`font-['Inter',sans-serif] font-normal text-[16px] leading-[28px] tracking-[-0.64px] w-full ${
                isDark ? "text-white" : "text-[#333]"
              }`}
            >
              <p className="mb-[24px]">
                <span className="font-semibold">Details:</span> {product.description}
              </p>

              <p className="mb-[16px]">
                <span className="font-semibold">More info:</span>
              </p>
              <ul className="list-disc ml-[24px] mb-[24px] space-y-[8px]">
                {product.plyCount && <li>{product.plyCount}</li>}
                <li>C-Marine Type</li>
                {product.weight && <li>{product.weight}</li>}
                {product.boilTested && <li>{product.boilTested}</li>}
              </ul>

              {product.applications && product.applications.length > 0 && (
                <p>
                  <span className="font-semibold">Recommended Application:</span>{" "}
                  {product.applications.join(", ")}
                </p>
              )}
            </div>

            {/* CTA Button */}
            <ArrowButton href="#inquire">Inquire Now</ArrowButton>
          </div>

          {/* Right Gallery */}
          <div className="flex flex-col gap-[20px] items-start w-full lg:w-[671px]">
            {/* Main Image */}
            <div className="bg-white w-full h-[460px] overflow-clip relative">
              <img
                src={allImages[selectedImage] || product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-[20px] items-center w-full">
                {allImages.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-clip relative shrink-0 size-[153px] border-2 ${
                      selectedImage === index
                        ? "border-[#cf2923]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
