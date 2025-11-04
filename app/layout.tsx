import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './styles/globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

const geistSans = Geist({
  variable: '--font-main',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-accent',
  subsets: ['latin']
})

const title = 'React Component designs';
const description = 'A library of accessible and extensible react based components';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'React Component designs preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased main-wrapper font-main text-base`}
      >
        <Header />
        <main id="main-content" tabIndex={-1} className="flow-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
