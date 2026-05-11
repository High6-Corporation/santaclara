import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CategorySection } from "@/components/sections/products/CategorySection";
import { getProductCategories, fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/products/');
  return rankMathSEOToMetadata(seo);
}

export default async function ProductsPage() {
  const categories = await getProductCategories();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Products', url: 'https://santaclaraplywood.com/products' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <FadeIn direction="none">
          <SubpageBanner title="Products" backgroundImage="/images/category-listing-bg.jpg" />
        </FadeIn>

        {/* Product Categories - Alternating light and dark variants */}
        {categories.map((category, index) => {
          // Even index (0, 2) use light variant, Odd index (1, 3) use dark variant
          const variant = index % 2 === 0 ? "light" : "dark";

          // Odd index categories have reversed layout (image on left)
          const reverseLayout = index % 2 !== 0;

          // Get featured image URL from ACF
          const featuredImage = category.productCategoryBanner?.featuredImage?.node?.sourceUrl || "/images/marine-plywood-category.jpg";

          return (
            <FadeIn key={category.id}>
              <CategorySection
                title={category.name}
                description={category.description}
                image={featuredImage}
                variant={variant}
                reverseLayout={reverseLayout}
                href={`/products/${category.slug}`}
              />
            </FadeIn>
          );
        })}

        {/* CTA Section */}
        <FadeIn>
          <CtaSection />
        </FadeIn>
        
        <Footer />
      </div>
    </div>
  </>
  );
}
