import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://madnutz.com.br"),
  title: {
    default: "MadNutz — Só mais uma, tá?",
    template: "%s · MadNutz",
  },
  description:
    "Snacks premium de castanhas com 99% nuts e 1% malícia. Crocância explosiva, sabores intensos e zero meio-termo. Só mais uma, tá?",
  keywords: ["castanhas", "snacks premium", "nuts", "MadNutz", "kit de castanhas"],
  openGraph: {
    title: "MadNutz — Só mais uma, tá?",
    description: "99% nuts, 1% malícia. Snacks premium sem meio-termo.",
    url: "https://madnutz.com.br",
    siteName: "MadNutz",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MadNutz — Só mais uma, tá?",
    description: "99% nuts, 1% malícia.",
  },
};

export const viewport: Viewport = {
  themeColor: "#C82830",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
