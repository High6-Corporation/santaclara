import type { Metadata } from "next";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { DealerInfoSection } from "@/app/components/sections/dealer/DealerInfoSection";
import { fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/dealers/');
  return rankMathSEOToMetadata(seo);
}

export default function DealerPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Dealers', url: 'https://santaclaraplywood.com/dealers' },
        ])}
      />
      <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header />
      <SubpageBanner 
        title="Dealer" 
        backgroundImage="/images/press-banner.jpg"
      />
      <DealerInfoSection />
      <CtaSection />
      <Footer />
    </main>
  </>
  );
}
