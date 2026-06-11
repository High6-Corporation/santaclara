import type { Metadata } from "next";
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
import { getProductCategories, getGalleries, fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { websiteSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/');
  return rankMathSEOToMetadata(seo);
}

export default async function Home() {
  // Fetch product categories and galleries from WordPress
  const [categories, galleries] = await Promise.all([
    getProductCategories(),
    getGalleries(),
  ]);

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
        <Header />
        <Hero />
        <CompanyOverviewSection />
        <FeaturedProductSection categories={categories} />
        <ProductOverview />
        <CompanyGallerySection galleries={galleries} />
        <TestimonialsSection />
        <NewsSection />
        <CtaSection />
      <Footer />
    </main>
  </>
  );
}
