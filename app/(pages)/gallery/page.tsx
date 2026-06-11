import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/components/globals/SubpageBanner";
import { GalleryCard } from "@/components/blocks/GalleryCard";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { getGalleries, normalizeGalleryImages, fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/gallery/');
  return rankMathSEOToMetadata(seo);
}

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Gallery', url: 'https://santaclaraplywood.com/gallery' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
        <div className="relative w-full">
          <Header />
          <SubpageBanner title="Gallery" backgroundImage="/images/gallery-image.jpg" />

          {/* Gallery Grid */}
          <section className="w-full bg-white py-[80px] lg:py-[100px]">
            <div className="max-w-[1440px] mx-auto px-[5%] lg:px-[60px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full max-w-[1320px] mx-auto">
                {galleries.map((gallery) => {
                  const images = normalizeGalleryImages(gallery.galleryFields?.galleryImages);
                  const coverImage =
                    images[0]?.sourceUrl ||
                    "/images/gallery-image.jpg";

                  return (
                    <GalleryCard
                      key={gallery.id}
                      image={coverImage}
                      title={gallery.title}
                      href={`/gallery/${gallery.slug}`}
                    />
                  );
                })}
              </div>

              {galleries.length === 0 && (
                <p className="text-center font-body text-[16px] text-[#666] py-[60px]">
                  No galleries available at the moment.
                </p>
              )}
            </div>
          </section>

          <CtaSection />
          <Footer />
        </div>
      </div>
    </>
  );
}
