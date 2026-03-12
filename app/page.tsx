import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/homepage/Hero";
import { CompanyOverviewSection } from "@/app/components/sections/homepage/CompanyOverviewSection";
import { FeaturedProductSection } from "@/app/components/sections/homepage/FeaturedProductSection";
import { ProductOverview } from "@/app/components/sections/homepage/ProductOverview";
import { CompanyGallerySection } from "@/app/components/sections/homepage/CompanyGallerySection";
import { TestimonialsSection } from "@/app/components/sections/homepage/TestimonialsSection";
import { NewsSection } from "@/app/components/sections/homepage/NewsSection";
import { CtaSection } from "@/app/components/globals/CtaSection";

export default function Home() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header />
      <Hero />
      <CompanyOverviewSection />
      <FeaturedProductSection />
      <ProductOverview />
      <CompanyGallerySection />
      <TestimonialsSection />
      <NewsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
