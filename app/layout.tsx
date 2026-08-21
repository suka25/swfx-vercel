import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayout from './layout.client';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Gunakan URL yang valid
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swfx-flax.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SWFX — Suka Wedana Forex | Real-Time Market Intelligence',
    template: '%s | SWFX',
  },
  description: 'Real-time forex market intelligence, trading signals, technical analysis, and trading education.',
  keywords: ['forex', 'trading', 'forex signals', 'technical analysis', 'forex education', 'trading community', 'SWFX'],
  authors: [{ name: 'SWFX' }],
  creator: 'SWFX',
  publisher: 'SWFX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'SWFX — Suka Wedana Forex',
    title: 'SWFX — Suka Wedana Forex | Real-Time Market Intelligence',
    description: 'Real-time forex market intelligence, trading signals, technical analysis, and trading education.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'SWFX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SWFX — Suka Wedana Forex',
    description: 'Real-time forex market intelligence, trading signals, and education.',
    images: [`${siteUrl}/og-image.png`],
    creator: '@swfxglobal',
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#39FF88',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#080A0D] text-[#F5F7FA] antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
