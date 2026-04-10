import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductSection } from "@/components/sections/products/ProductSection";
import { getProductCategoryBySlug, getProductsByCategorySlug } from "@/lib/graphqlService";
import { ProductSubpageBanner } from "@/app/components/globals/ProductSubpageBanner";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { FadeIn } from "@/app/components/ui/FadeIn";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // For now, return static params. In production, you can fetch from GraphQL
  return [
    { slug: "marine-plywood" },
    { slug: "ordinary-plywood" },
    { slug: "ordinary-plyboard" },
    { slug: "sm-ply" },
    { slug: "5mm" },
  ];
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  
  // Fetch the category from WordPress
  const category = await getProductCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  // Get products for this category from WordPress
  const products = await getProductsByCategorySlug(slug);

  // Get category banner image from ACF
  const bannerImage = category.productCategoryBanner?.categoryBanner?.node?.sourceUrl || 
                      category.productCategoryBanner?.featuredImage?.node?.sourceUrl ||
                      "/images/category-listing-bg.jpg";

  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <FadeIn direction="none">
          <ProductSubpageBanner 
            title={category.name}
            description={category.description}
            backgroundImage={bannerImage}
          />
        </FadeIn>

        {/* Product Sections - Alternating light and dark variants */}
        {products.map((product, index) => {
          // Even index (0, 2, 4) use light variant, Odd index (1, 3) use dark variant
          const variant = index % 2 === 0 ? "light" : "dark";

          return (
            <FadeIn key={product.id}>
              <ProductSection
                product={product}
                variant={variant}
                index={index}
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
  );
}
