"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";

export default function ProductsPage() {
  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <Section bgColor="bg-white">
          <Row>
            <div className="pt-[200px] pb-[100px] px-[60px]">
              <h1 className="text-4xl font-bold text-[#2c2525] mb-6">Products</h1>
              <p className="text-lg text-[#333]">Content coming soon...</p>
            </div>
          </Row>
        </Section>
        <Footer />
      </div>
    </div>
  );
}
