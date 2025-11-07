import type { Metadata } from "next";

export const siteDefaults = {
  siteName: "Coder Carl",
  url: "https://codercarl.dev",
  title: "Coder Carl",
  description: "I build things that help people use the web better.",
  locale: "en_AU",
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteDefaults.url),
  title: siteDefaults.title,
  description: siteDefaults.description,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    type: "website",
    locale: siteDefaults.locale,
    siteName: siteDefaults.siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "React Component designs preview",
      },
    ],
  },
  twitter: {
    title: siteDefaults.title,
    description: siteDefaults.description,
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};