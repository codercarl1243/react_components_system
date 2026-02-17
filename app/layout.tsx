import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Playfair_Display } from 'next/font/google'
import './styles/globals.css'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { baseMetadata } from '@/lib/utils/generateMeta/default'
import { cookies } from 'next/headers'

const geistSans = Geist({
  variable: '--font-main',
  subsets: ['latin']
})

const playfairDisplay = Playfair_Display({
  variable: '--font-accent',
  subsets: ['latin']
})

export const metadata: Metadata = baseMetadata;

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {

  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? 'light';

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased main-wrapper font-main text-base`}
      >
        <div className="overlay-backdrop" aria-hidden="true" />
        <Header userTheme={theme}/>
        <main id="main-content" tabIndex={-1} className="flow-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
