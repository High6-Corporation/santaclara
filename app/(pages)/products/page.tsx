"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CategorySection } from "@/components/sections/products/CategorySection";
import { productCategories } from "@/lib/data/products";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";

export default function ProductsPage() {
  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <SubpageBanner title="Products" backgroundImage="/images/category-listing-bg.jpg" />

        {/* Product Categories - Alternating light and dark variants */}
        {productCategories.map((category, index) => {
          // Even index (0, 2) use light variant, Odd index (1, 3) use dark variant
          const variant = index % 2 === 0 ? "light" : "dark";

          // Odd index categories have reversed layout (image on left)
          const reverseLayout = index % 2 !== 0;

          return (
            <CategorySection
              key={category.id}
              title={category.title}
              description={category.description}
              image={category.image}
              variant={variant}
              reverseLayout={reverseLayout}
              href={category.href}
            />
          );
        })}

        {/* CTA Section */}
        <CtaSection />
        
        <Footer />
      </div>
    </div>
  );
}
