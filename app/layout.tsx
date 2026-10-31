import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site-config";
import { photos } from "@/data/photos";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ogImage } from "@/lib/utils";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lashkar Tours | Discover Hunza, Skardu & Northern Pakistan",
    template: "%s — Lashkar Tours",
  },
  description:
    "Explore Pakistan with Lashkar Tours. Discover Hunza, Skardu, Fairy Meadows, and northern Pakistan through customized journeys and personalized trip planning.",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    images: [{ url: ogImage(photos.passuConesRoad.src), width: 1200, alt: photos.passuConesRoad.alt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.forest,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-svh overflow-x-clip">
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
