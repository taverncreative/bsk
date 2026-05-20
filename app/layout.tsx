import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SiteSchema from '@/components/seo/SiteSchema';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'wdth'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://businesssortedkent.co.uk'),
  title: 'Business Sorted Kent | Web Design & SEO',
  description: 'Honest pricing for web design, SEO and automation. Built faster, priced fairly.',
  openGraph: {
    title: 'Business Sorted Kent | Web Design & SEO',
    description: 'Honest pricing for web design, SEO and automation. Built faster, priced fairly.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${mono.variable}`}>
      <body className={inter.className}>
        <ScrollToTop />
        <SiteSchema />
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
