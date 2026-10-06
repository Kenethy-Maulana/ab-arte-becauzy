import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abartebecauzy.co.mz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/brand-board"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}