import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/layout/Navbar';

import Footer from '@/components/layout/Footer';
import MobileCTA from '@/components/ui/MobileCTA';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business Sorted Kent | Web Design & SEO',
  description: 'High-Performance Web Design, SEO & Business Automation for Kent SMEs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pb-20 md:pb-0`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
