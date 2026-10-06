import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const SITE_NAME = "AB Arte Becauzy";
const SITE_TAGLINE = "Corte & Costura";
const SITE_DESCRIPTION =
  "Ateliê de alfaiataria em Moçambique. Peças por medida, corte e costura com identidade. A arte de vestir a sua identidade.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abartebecauzy.co.mz"; // TODO: substituir pelo domínio real

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "alfaiataria",
    "corte e costura",
    "roupa por medida",
    "AB Arte Becauzy",
    "Moçambique",
    "Maputo",
    "personalização",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body
        className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} bg-ink font-sans text-cream antialiased`}
      >
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}