import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

const syne = localFont({
  src: "./fonts/syne-variable.woff2",
  variable: "--font-syne",
  weight: "100 900",
  display: "swap",
});

const outfit = localFont({
  src: "./fonts/outfit-variable.woff2",
  variable: "--font-outfit",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eachstone — Homme à tout faire | Trois-Rivières",
  description:
    "Rénovation, réparation, entretien — votre homme de confiance à Trois-Rivières. Plus de 10 ans d'expérience. Comptant, chèque ou virement Interac.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
