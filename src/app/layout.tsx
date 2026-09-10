import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileBar } from "@/components/site/MobileBar";
import { school } from "@/lib/mock/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", weight: ["300", "400", "500", "600"], display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["300", "400", "500", "600"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Smirnova School — Académie professionnelle de manucure",
    template: "%s · Smirnova School",
  },
  description:
    "Smirnova School, académie parisienne de formation professionnelle en manucure : manucure à la cire, manucure russe, nail architecture et formations avancées. Fondée par Elena Smirnova.",
  keywords: [
    "Smirnova School",
    "formation manucure",
    "formation manucure professionnelle",
    "manucure russe",
    "wax manicure",
    "nail architecture",
    "formation prothésiste ongulaire",
    "Elena Smirnova",
  ],
  authors: [{ name: school.founder }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: school.name,
    title: "Smirnova School — Académie professionnelle de manucure",
    description: "Formations professionnelles en manucure à Paris et à l’international. Petit groupe, pratique intensive, attestation remise sur place.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Manucure professionnelle réalisée par Smirnova School" }],
  },
  twitter: { card: "summary_large_image", title: "Smirnova School", description: "Académie professionnelle de manucure — Paris & international." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Smirnova School",
    description: "Académie de formation professionnelle en manucure.",
    founder: { "@type": "Person", name: school.founder, jobTitle: "Fondatrice et éducatrice" },
    address: { "@type": "PostalAddress", streetAddress: "12 rue de Turenne", postalCode: "75003", addressLocality: "Paris", addressCountry: "FR" },
    email: school.email,
    telephone: school.phone,
    url: siteUrl,
    sameAs: [`https://instagram.com/${school.instagram.replace("@", "")}`],
  };

  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-milk text-ink antialiased">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-milk">
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu" className="pt-[68px] lg:pt-[88px]">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
