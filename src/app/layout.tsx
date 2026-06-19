import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiln & Hearth — Made Slowly. Used Daily.",
  description:
    "Handcrafted ceramics made in small batches with intention. Every piece carries the mark of the hand that made it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-kiln-ash text-charred-oak font-dm antialiased">
        <FunnelTracker />
        <SmoothScroll>
          <Navigation />
          {children}
          <Footer />
        </SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
