"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { BlogPostsSection } from "@/components/sections/press/BlogPostsSection";
import { WatchTikTokSection } from "@/components/sections/press/WatchTikTokSection";

export default function PressPage() {
  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <SubpageBanner title="Press" backgroundImage="/images/press-banner.jpg"  />
        <BlogPostsSection />
        <WatchTikTokSection />
        <Footer />
      </div>
    </div>
  );
}
