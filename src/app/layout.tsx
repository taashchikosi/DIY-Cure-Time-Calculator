import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://diycuretimecalculator.com'),
  title: {
    default: 'DIY Cure Time Calculator — Temperature & Humidity Adjusted',
    template: '%s | DIY Cure Time Calculator',
  },
  description:
    'Calculate accurate cure times for wood glue, epoxy, silicone caulk, construction adhesive, and concrete — adjusted for your actual temperature and humidity. Science-based Q10 estimates from manufacturer TDS data.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DIY Cure Time Calculator',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'DIY Cure Time Calculator — Temperature & Humidity Adjusted',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://diycuretimecalculator.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--cream)' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
