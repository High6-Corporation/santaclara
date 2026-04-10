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
import { getProductCategories } from "@/lib/graphqlService";
import { FadeIn } from "@/app/components/ui/FadeIn";

export default async function Home() {
  // Fetch product categories from WordPress
  const categories = await getProductCategories();

  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header />
      <FadeIn direction="none">
        <Hero />
      </FadeIn>
      <FadeIn>
        <CompanyOverviewSection />
      </FadeIn>
      <FadeIn>
        <FeaturedProductSection categories={categories} />
      </FadeIn>
      <FadeIn>
        <ProductOverview />
      </FadeIn>
      <FadeIn>
        <CompanyGallerySection />
      </FadeIn>
      <FadeIn>
        <TestimonialsSection />
      </FadeIn>
      <FadeIn>
        <NewsSection />
      </FadeIn>
      <FadeIn>
        <CtaSection />
      </FadeIn>
      <Footer />
    </main>
  );
}
