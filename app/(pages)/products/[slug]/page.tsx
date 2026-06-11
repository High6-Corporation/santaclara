import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductSection } from "@/components/sections/products/ProductSection";
import { getProductCategories, getProductCategoryBySlug, getProductsByCategorySlug, fetchProductCategorySEOBySlug, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { ProductSubpageBanner } from "@/app/components/globals/ProductSubpageBanner";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema, productSchema } from "@/app/lib/schema";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = await fetchProductCategorySEOBySlug(slug);
  return rankMathSEOToMetadata(seo);
}

export async function generateStaticParams() {
  // Fetch dynamic product categories from WordPress
  const categories = await getProductCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
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

  const categoryUrl = `https://santaclaraplywood.com/products/${slug}`;

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://santaclaraplywood.com/' },
            { name: 'Products', url: 'https://santaclaraplywood.com/products' },
            { name: category.name, url: categoryUrl },
          ]),
          ...products.map((product) =>
            productSchema({
              name: product.title,
              description: product.content.replace(/<[^>]*>/g, '').slice(0, 160),
              image: product.productGalleries?.imageAndVideoGalleries?.[0]?.file?.node?.sourceUrl || '/images/santa-clara-logo.png',
              category: category.name,
              url: `${categoryUrl}#${product.slug}`,
            })
          ),
        ]}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
        <div className="relative w-full">
          <Header />
          <ProductSubpageBanner
            title={category.name}
            description={category.description}
            backgroundImage={bannerImage}
          />

        {/* Product Sections - Alternating light and dark variants */}
        {products.map((product, index) => {
          // Even index (0, 2, 4) use light variant, Odd index (1, 3) use dark variant
          const variant = index % 2 === 0 ? "light" : "dark";

          return (
            <ProductSection
              key={product.id}
              product={product}
              variant={variant}
              index={index}
            />
          );
        })}

        {/* CTA Section */}
        <CtaSection />
        
        <Footer />
      </div>
    </div>
  </>
  );
}
