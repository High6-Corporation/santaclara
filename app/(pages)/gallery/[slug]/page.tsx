import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/components/globals/SubpageBanner";
import { GalleryDetailSection } from "@/components/sections/gallery/GalleryDetailSection";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { getGalleries, getGalleryBySlug, normalizeGalleryImages } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

interface GalleryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gallery = await getGalleryBySlug(slug);
  if (!gallery) return {};
  return {
    title: `${gallery.title} | Gallery - Santa Clara Plywood`,
    description: `View photos from ${gallery.title} at Santa Clara Plywood.`,
  };
}

export async function generateStaticParams() {
  const galleries = await getGalleries();
  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }));
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;

  const gallery = await getGalleryBySlug(slug);

  if (!gallery) {
    notFound();
  }

  const images = normalizeGalleryImages(gallery.galleryFields?.galleryImages);

  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://santaclaraplywood.com/" },
          { name: "Gallery", url: "https://santaclaraplywood.com/gallery" },
          {
            name: gallery.title,
            url: `https://santaclaraplywood.com/gallery/${slug}`,
          },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
        <div className="relative w-full">
          <Header />
          <SubpageBanner title={gallery.title} backgroundImage="/images/press-banner.jpg" />

          {/* Gallery Images Grid */}
          <GalleryDetailSection images={images} />

          <CtaSection />
          <Footer />
        </div>
      </div>
    </>
  );
}
