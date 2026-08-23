import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RV Basecamp Near COTA for F1 Austin 2026 | Triple W Rentals",
  description:
    "Private, air-conditioned RV accommodations for the 2026 United States Grand Prix at Circuit of The Americas, Oct 22-26. Tell us your campsite and group size. We verify fit, deliver, set up and pick up. Call or text (972) 965-6901.",
  openGraph: {
    title: "Your Private RV Basecamp Near COTA for F1 Austin 2026",
    description:
      "Tell us your approved campsite and group size. Triple W matches the RV, verifies delivery feasibility, sets it up and collects it after the weekend.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101B2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${outfit.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10835426783"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10835426783');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
