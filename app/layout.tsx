import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Component designs",
  description: "A library of accessible and extensible react based components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased layout-wrapper`}
      >
        <Navigation className="width-full" />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer className="width-full" />
      </body>
    </html>
  );
}
