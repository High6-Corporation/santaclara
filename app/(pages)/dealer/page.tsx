import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { SubpageBanner } from "@/app/components/globals/SubpageBanner";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { DealerInfoSection } from "@/app/components/sections/dealer/DealerInfoSection";
import { FadeIn } from "@/app/components/ui/FadeIn";

export default function DealerPage() {
  return (
    <main className="bg-white min-h-screen w-full overflow-x-hidden">
      <Header />
      <FadeIn direction="none">
        <SubpageBanner 
          title="Dealer" 
          backgroundImage="/images/press-banner.jpg"
        />
      </FadeIn>
      <FadeIn>
        <DealerInfoSection />
      </FadeIn>
      <FadeIn>
        <CtaSection />
      </FadeIn>
      <Footer />
    </main>
  );
}
