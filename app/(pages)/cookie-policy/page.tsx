import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { SubpageBanner } from "@/components/globals/SubpageBanner";
import { CtaSection } from "@/app/components/globals/CtaSection";
import { StructuredData } from "@/app/components/seo/StructuredData";
import { breadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Cookie Policy - Santa Clara Marine Plywood",
  description: "Learn how Santa Clara Marine Plywood uses cookies and how you can manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://santaclaraplywood.com/' },
          { name: 'Cookie Policy', url: 'https://santaclaraplywood.com/cookie-policy' },
        ])}
      />
      <div className="bg-white flex justify-center min-h-screen w-full">
        <div className="relative w-full">
          <Header />
          <SubpageBanner title="Cookie Policy" backgroundImage="/images/about_us_banner.jpg" />

          <Section bgColor="bg-white py-[60px] md:py-[80px] lg:py-[100px]">
            <Row className="!max-w-[900px]">
              <div className="font-body text-[#333333] space-y-10">

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">What Are Cookies</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">How We Use Cookies</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    Our website uses a consent-based cookie system. No non-essential cookies or tracking scripts are loaded until you provide explicit consent. You are presented with a consent banner on your first visit and can manage your preferences at any time using the cookie settings icon on the bottom-left of the page.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Cookie Categories</h2>
                  <p className="text-base md:text-lg leading-relaxed mb-4">
                    We classify cookies and similar technologies into the following categories:
                  </p>

                  <div className="space-y-6">
                    <div className="border-l-4 border-[#04217B] pl-4">
                      <h3 className="text-xl font-semibold text-[#04217B] mb-1">Necessary</h3>
                      <p className="text-base leading-relaxed">
                        Required for the website to function properly. These include session management, security features, and basic functionality. They cannot be disabled.
                      </p>
                      <p className="text-sm text-gray-500 mt-1 italic">Examples: Session cookies, CSRF protection</p>
                    </div>

                    <div className="border-l-4 border-[#04217B] pl-4">
                      <h3 className="text-xl font-semibold text-[#04217B] mb-1">Analytics</h3>
                      <p className="text-base leading-relaxed">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the site.
                      </p>
                      <p className="text-sm text-gray-500 mt-1 italic">Examples: Google Analytics, page view tracking, scroll depth measurement</p>
                    </div>

                    <div className="border-l-4 border-[#04217B] pl-4">
                      <h3 className="text-xl font-semibold text-[#04217B] mb-1">Marketing</h3>
                      <p className="text-base leading-relaxed">
                        Used to track visitors across websites for advertising purposes. They allow us to display relevant ads and measure campaign performance.
                      </p>
                      <p className="text-sm text-gray-500 mt-1 italic">Examples: Meta Pixel, Google Ads remarketing tags</p>
                    </div>

                    <div className="border-l-4 border-[#04217B] pl-4">
                      <h3 className="text-xl font-semibold text-[#04217B] mb-1">Preferences</h3>
                      <p className="text-base leading-relaxed">
                        Allow the website to remember choices you have made (such as your preferred language or region) and provide enhanced, more personal features.
                      </p>
                      <p className="text-sm text-gray-500 mt-1 italic">Examples: Language selection, theme settings, layout preferences</p>
                    </div>

                    <div className="border-l-4 border-[#04217B] pl-4">
                      <h3 className="text-xl font-semibold text-[#04217B] mb-1">Embedded Content</h3>
                      <p className="text-base leading-relaxed">
                        When you allow embedded content, third-party services such as YouTube, Google Maps, or external forms may set their own cookies and track your activity on their platforms.
                      </p>
                      <p className="text-sm text-gray-500 mt-1 italic">Examples: YouTube videos, Google Maps, Gravity Forms</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">How We Store Your Consent</h2>
                  <p className="text-base md:text-lg leading-relaxed mb-4">
                    Your cookie preferences are stored in your browser&apos;s local storage (not as a cookie itself). The stored data includes:
                  </p>
                  <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
                    <li>Your consent choices for each category</li>
                    <li>The consent version (to detect policy updates)</li>
                    <li>A timestamp of when consent was given</li>
                  </ul>
                  <p className="text-base md:text-lg leading-relaxed mt-4">
                    This data is never sent to our servers. It remains entirely in your browser and is used only to determine which scripts and services to load.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Consent Expiration</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    Your consent preferences automatically expire after 365 days. When they expire, the consent banner will re-appear and you will be asked to make your choices again. This ensures your preferences remain current and reflects best practices for data protection compliance.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Managing Your Preferences</h2>
                  <p className="text-base md:text-lg leading-relaxed mb-4">
                    You can manage your cookie preferences at any time by:
                  </p>
                  <ul className="list-disc pl-6 text-base md:text-lg leading-relaxed space-y-2">
                    <li>Clicking the cookie icon (bottom-left corner of every page)</li>
                    <li>Toggling individual categories on or off in the settings modal</li>
                    <li>Clicking &quot;Reject All&quot; to disable all non-essential cookies</li>
                    <li>Clicking &quot;Accept All&quot; to enable all categories</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Browser Cookie Controls</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    In addition to our consent system, most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, delete existing cookies, or alert you when a cookie is being set. Note that disabling cookies may affect the functionality of some parts of the website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Contact Us</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    If you have any questions about this Cookie Policy, please contact us at <a href="mailto:smwpipurchasing@gmail.com" className="text-[#04217B] underline hover:text-[#e31c26] transition-colors">smwpipurchasing@gmail.com</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#04217B] mb-4">Changes to This Policy</h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make significant changes, the consent version will be updated, which will invalidate previous consent and prompt you to review and accept the new terms.
                  </p>
                </div>

              </div>
            </Row>
          </Section>

          <CtaSection />
          <Footer />
        </div>
      </div>
    </>
  );
}
