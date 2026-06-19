import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import BackToTop from "./components/globals/BackToTop";
import { Preloader } from "./components/globals/Preloader";
import { StructuredData } from "./components/seo/StructuredData";
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
      {/*
        Google Analytics 4 — only loads on the Next.js frontend (santaclaraplywood.com).
        The WordPress admin (admin.santaclaraplywood.com) is a separate domain
        and does NOT include this script, so no admin tracking occurs.

        Verification: Open https://analytics.google.com > Realtime report,
        then visit your site — your session should appear within seconds.
      */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
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
        <Preloader>
          {children}
          <BackToTop />
        </Preloader>
      </body>
    </html>
  );
}
