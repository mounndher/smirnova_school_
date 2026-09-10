import type { MetadataRoute } from "next";
import { formations } from "@/lib/mock/formations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["", "/academy", "/formations", "/planning", "/gallery", "/testimonials", "/faq", "/contact", "/legal/mentions-legales", "/legal/cgv", "/legal/confidentialite", "/legal/cookies"];

  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...formations.map((formation) => ({
      url: `${base}/formations/${formation.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
