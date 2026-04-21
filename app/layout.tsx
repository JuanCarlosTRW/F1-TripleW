import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RV Rental for F1 Austin 2026 | Triple W Rentals — Delivered to COTA",
  description:
    "Premium RV rentals delivered and set up at Circuit of The Americas for the 2026 United States Grand Prix. Skip the hotels. Wake up trackside. Call (972) 965-6901.",
  openGraph: {
    title: "RV Rental for F1 Austin 2026 | Triple W Rentals",
    description:
      "Premium RVs delivered to COTA for F1 race weekend. Skip the hotel chaos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
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
