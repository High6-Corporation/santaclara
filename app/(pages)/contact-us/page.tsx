"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { ContactFormSection } from "@/components/sections/contact-us/ContactFormSection";
import { SalesOfficeSection } from "@/components/sections/contact-us/SalesOfficeSection";

export default function ContactPage() {
  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <SubpageBanner title="Contact Us" backgroundImage="/images/contact-banner.jpg" />
        <ContactFormSection />
        <SalesOfficeSection />
        <Footer />
      </div>
    </div>
  );
}
