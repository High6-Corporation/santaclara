import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { ContactFormSection } from "@/components/sections/contact-us/ContactFormSection";
import { SalesOfficeSection } from "@/components/sections/contact-us/SalesOfficeSection";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { fetchPageSEOByUri, rankMathSEOToMetadata } from "@/lib/graphqlService";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchPageSEOByUri('/contact-us/');
  return rankMathSEOToMetadata(seo);
}

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Contact Us', url: 'https://santaclaraplywood.com/contact-us' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <FadeIn direction="none">
          <SubpageBanner title="Contact Us" backgroundImage="/images/contact-banner.jpg" />
        </FadeIn>
        <FadeIn>
          <ContactFormSection />
        </FadeIn>
        <FadeIn>
          <SalesOfficeSection />
        </FadeIn>
        <Footer />
      </div>
    </div>
  </>
  );
}
