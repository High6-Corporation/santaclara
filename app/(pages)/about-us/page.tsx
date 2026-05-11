import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { SubpageBanner } from "@/components/globals/SubpageBanner";
import { AboutCompanyOverviewSection } from "@/components/sections/about-us/AboutCompanyOverviewSection";
import { AboutHistoryOverviewSection } from "@/components/sections/about-us/AboutHistoryOverviewSection";
import { AboutMissionVisionSection } from "@/components/sections/about-us/AboutMissionVisionSection";
import { AboutCompanyValuesSection } from "@/components/sections/about-us/AboutCompanyValuesSection";
import { AboutTrustSignalsSection } from "@/components/sections/about-us/AboutTrustSignalsSection";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/about-us/');
  return rankMathSEOToMetadata(seo);
}

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'About Us', url: 'https://santaclaraplywood.com/about-us' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <FadeIn direction="none">
          <SubpageBanner title="About Us" backgroundImage="/images/about_us_banner.jpg" />
        </FadeIn>
        <FadeIn>
          <AboutCompanyOverviewSection />
        </FadeIn>
        <FadeIn>
          <AboutHistoryOverviewSection />
        </FadeIn>
        <FadeIn>
          <AboutMissionVisionSection />
        </FadeIn>
        <FadeIn>
          <AboutCompanyValuesSection />
        </FadeIn>
        <FadeIn>
          <AboutTrustSignalsSection />
        </FadeIn>
        <FadeIn>
          <CtaSection/>
        </FadeIn>
        <Footer />
      </div>
    </div>
  </>
  );
}
