import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { BlogPostsSection } from "@/components/sections/press/BlogPostsSection";
import { WatchTikTokSection } from "@/components/sections/press/WatchTikTokSection";
import { fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/press/');
  return rankMathSEOToMetadata(seo);
}

export default function PressPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Press', url: 'https://santaclaraplywood.com/press' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <SubpageBanner title="Press" backgroundImage="/images/press-banner.jpg"  />
        <BlogPostsSection />
        <WatchTikTokSection />
        <Footer />
      </div>
    </div>
  </>
  );
}
