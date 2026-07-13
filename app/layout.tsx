import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import SiteSchema from '@/components/seo/SiteSchema';
import ScrollToTop from '@/components/ui/ScrollToTop';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://businesssortedkent.co.uk'),
  title: 'Business Sorted Kent | Web Design & SEO',
  description: 'Web design, SEO and automations for Kent businesses. Built properly, with rigorous checks for speed, security and SEO.',
  openGraph: {
    title: 'Business Sorted Kent | Web Design & SEO',
    description: 'Web design, SEO and automations for Kent businesses. Built properly, with rigorous checks for speed, security and SEO.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className={nunitoSans.className}>
        <GoogleAnalytics />
        <ScrollToTop />
        <SiteSchema />
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
