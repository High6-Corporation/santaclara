"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { NewsListing } from "@/app/components/globals/NewsListing";
import { newsData } from "@/app/lib/data/newsData";

export default function PressPage() {
 return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <Section bgColor="bg-white">
          <Row>
            <div className="pt-[200px] pb-[100px] px-[60px]">
              <h1 className="text-4xl font-bold text-[#2c2525] mb-6">Press</h1>
              <p className="text-lg text-[#333] mb-12 max-w-[800px]">
                Stay updated with the latest news, announcements, and insights from Santa Clara Marine Plywood.
              </p>
              <NewsListing items={newsData} variant="press" />
            </div>
          </Row>
        </Section>
        <Footer />
      </div>
    </div>
  );
}
