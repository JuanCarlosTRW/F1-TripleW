import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
