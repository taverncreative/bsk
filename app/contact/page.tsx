import type { Metadata } from 'next';
import SecondaryContactForm from '@/components/ui/SecondaryContactForm';
import { Star, Mail, Phone, MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact Us | Business Sorted Kent',
  description: 'Get in touch about web design, SEO, and business automation in Kent. Contact the team at Business Sorted today.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* 1. Hero Section */}
      <section className="pt-40 md:pt-48 pb-20 px-4 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black border-b border-neutral-900" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Let's Talk About Growing Your Business
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-10">
              Whether you need a new website, better visibility on Google, or systems that turn visitors into enquiries, we can help. Send us a message and we'll point you in the right direction.
            </p>
            <a href="#message" className="inline-block px-8 py-4 bg-brand-gold text-black font-extrabold rounded-xl hover:bg-white transition-colors active:scale-95">
              Send A Message
            </a>
          </Reveal>
        </div>
      </section>

      {/* Split Section: Contact Form & Contact Details */}
      <section id="message" className="py-24 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Contact Form */}
            <div>
              <Reveal>
                <h2 className="text-3xl font-extrabold text-white mb-4">Send Us a Message</h2>
                <p className="text-neutral-400 mb-8">Fill out the quick form below and we'll get back to you directly.</p>
                <SecondaryContactForm />
              </Reveal>
            </div>

            {/* Trust Elements & Contact Details */}
            <div className="flex flex-col gap-10">
              {/* Trust Elements */}
              <Reveal delay={0.1}>
                <div className="bg-neutral-900 border border-brand-gold/20 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">Rated 5 Stars by Local Businesses</h3>
                  <p className="text-neutral-400 text-sm mb-6">Based on verified Google reviews across Kent.</p>

                  <blockquote className="border-l-2 border-brand-gold pl-4 italic text-neutral-300">
                    "Business Sorted transformed our completely outdated site into an actual lead generation tool. Brilliant local service."
                  </blockquote>
                </div>
              </Reveal>

              {/* Contact Details Card */}
              <Reveal delay={0.2}>
                <div className="bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-8 flex flex-col gap-6">
                  <a href="mailto:hello@businesssortedkent.co.uk" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-brand-gold transition-colors">
                      <Mail className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-white group-hover:text-brand-gold transition-colors font-medium">hello@businesssortedkent.co.uk</p>
                    </div>
                  </a>

                  <a href="tel:07522388055" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-brand-gold transition-colors">
                      <Phone className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-1">Phone</p>
                      <p className="text-white group-hover:text-brand-gold transition-colors font-medium">07522 388055</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-1">Address</p>
                      <p className="text-white leading-relaxed font-medium">
                        184 Sandyhurst Lane<br />
                        Ashford<br />
                        Kent<br />
                        TN25 4NX
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
