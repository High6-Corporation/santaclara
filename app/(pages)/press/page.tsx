"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { BlogPostsSection } from "@/components/sections/press/BlogPostsSection";
import { WatchTikTokSection } from "@/components/sections/press/WatchTikTokSection";
import { FadeIn } from "@/app/components/ui/FadeIn";

export default function PressPage() {
  return (
    <div className="bg-white flex justify-center min-h-screen w-full">
      <div className="relative w-full">
        <Header />
        <FadeIn direction="none">
          <SubpageBanner title="Press" backgroundImage="/images/press-banner.jpg"  />
        </FadeIn>
        <FadeIn>
          <BlogPostsSection />
        </FadeIn>
        <FadeIn>
          <WatchTikTokSection />
        </FadeIn>
        <Footer />
      </div>
    </div>
  );
}
