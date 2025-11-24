import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Playfair_Display } from 'next/font/google'
import './styles/globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { baseMetadata } from '@/lib/utils/generateMeta/default'

const geistSans = Geist({
  variable: '--font-main',
  subsets: ['latin']
})

const playfairDisplay = Playfair_Display({
  variable: '--font-accent',
  subsets: ['latin']
})

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-theme={"dark"}
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased main-wrapper font-main text-base`}
      >
        <div className="overlay-backdrop" aria-hidden="true" />
        <Header />
        <main id="main-content" tabIndex={-1} className="flow-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
