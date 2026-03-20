import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCTA from '@/components/ui/MobileCTA';
import SiteSchema from '@/components/seo/SiteSchema';
import AssistantElle from '@/components/ui/AssistantElle';
import MobileScrollCTA from '@/components/ui/MobileScrollCTA';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://businesssortedkent.co.uk'),
  title: 'Business Sorted Kent | Web Design & SEO',
  description: 'High-Performance Web Design, SEO & Business Automation for Kent SMEs',
  openGraph: {
    title: 'Business Sorted Kent | Web Design & SEO',
    description: 'High-Performance Web Design, SEO & Business Automation for Kent SMEs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-20 md:pb-0`}>
        <ScrollToTop />
        <SiteSchema />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
        <MobileScrollCTA />
        <AssistantElle />
      </body>
    </html>
  );
}
