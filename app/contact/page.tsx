import type { Metadata } from 'next';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | Business Sorted Kent',
  description: 'Get a free quote for web design, SEO, and business automation in Kent. Contact the team at Business Sorted today.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-48 px-4 text-center bg-white">
         <div className="container mx-auto max-w-4xl">
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Let's Grow Your Business
           </h1>
           <p className="text-xl text-slate-600 leading-relaxed">
             Tell us about your project and we will get back to you with a custom strategy.
           </p>
         </div>
      </section>
      <Contact />
    </main>
  );
}
