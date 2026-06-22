import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BackToTop from "./components/globals/BackToTop";
import { Preloader } from "./components/globals/Preloader";
import { StructuredData } from "./components/seo/StructuredData";
import { ConsentProvider } from "./components/consent/ConsentProvider";
import { CookieConsentBanner } from "./components/consent/CookieConsentBanner";
import { CookieSettingsLink } from "./components/consent/CookieSettingsLink";
import { CookieSettingsModal } from "./components/consent/CookieSettingsModal";
import { ConsentScriptLoader } from "./components/consent/ConsentScriptLoader";
import {
  organizationSchema,
  localBusinessManilaSchema,
  localBusinessDavaoSchema,
} from "./lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Santa Clara Marine Plywood",
  description: "Santa Clara Marine Plywood - Quality products and services",
  icons: {
    icon: "/images/santa-clara-favicon.png",
  },
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://santaclaraplywood.com',
    siteName: 'Santa Clara Marine Plywood',
    title: 'Santa Clara Marine Plywood',
    description: 'Santa Clara Marine Plywood - Quality products and services',
    images: [
      {
        url: '/images/santa-clara-logo.png',
        width: 1200,
        height: 630,
        alt: 'Santa Clara Marine Plywood',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Santa Clara Marine Plywood',
    description: 'Santa Clara Marine Plywood - Quality products and services',
    images: ['/images/santa-clara-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData
          data={[
            organizationSchema(),
            localBusinessManilaSchema(),
            localBusinessDavaoSchema(),
          ]}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ConsentProvider>
          <Preloader>
            {children}
            <BackToTop />
          </Preloader>

          {/* GDPR Cookie Consent */}
          <CookieConsentBanner />
          <CookieSettingsLink />
          <CookieSettingsModal />
          <ConsentScriptLoader />
        </ConsentProvider>
      </body>
    </html>
  );
}
