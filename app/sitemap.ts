import type { MetadataRoute } from "next";
import { portfolioPieces } from "@/lib/data/portfolio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abartebecauzy.co.mz";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/portfolio",
    "/servicos",
    "/processo",
    "/atelier",
    "/sobre",
    "/agendar",
    "/acompanhar-pedido",
    "/contactos",
  ];

  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolioPieces.map((piece) => ({
    url: `${BASE_URL}/portfolio/${piece.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...portfolioEntries];
}