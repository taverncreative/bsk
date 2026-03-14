import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-400 pt-16 pb-8 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/logo.png" 
                alt="Business Sorted Kent Logo" 
                width={48} 
                height={32} 
                className="w-auto h-8 object-contain drop-shadow-[0_0_12px_rgba(214,173,103,0.3)]" 
              />
              <h2 className="text-2xl font-bold tracking-tight text-white m-0">Business Sorted Kent</h2>
            </div>
            <p className="leading-relaxed pr-4">
              Helping Kent businesses get found, get leads, and grow online.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/web-design" className="hover:text-brand-gold transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="/seo" className="hover:text-brand-gold transition-colors">
                  SEO & Rankings
                </Link>
              </li>
              <li>
                <Link href="/lead-capture" className="hover:text-brand-gold transition-colors">
                  Lead Capture Systems
                </Link>
              </li>
              <li>
                <Link href="/business-automation" className="hover:text-brand-gold transition-colors">
                  Business Automation
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/branding" className="text-sm text-neutral-500 hover:text-brand-gold transition-colors">
                  Logo & Branding
                </Link>
              </li>
              <li>
                <Link href="/social-media-setup" className="text-sm text-neutral-500 hover:text-brand-gold transition-colors">
                  Social Media Setup
                </Link>
              </li>
              <li>
                <Link href="/workwear-print" className="text-sm text-neutral-500 hover:text-brand-gold transition-colors">
                  Workwear & Print
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Areas */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Areas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/towns/ashford" className="hover:text-brand-gold transition-colors">
                  Ashford
                </Link>
              </li>
              <li>
                <Link href="/towns/canterbury" className="hover:text-brand-gold transition-colors">
                  Canterbury
                </Link>
              </li>
              <li>
                <Link href="/towns/maidstone" className="hover:text-brand-gold transition-colors">
                  Maidstone
                </Link>
              </li>
              <li>
                <Link href="/towns/folkestone" className="hover:text-brand-gold transition-colors">
                  Folkestone
                </Link>
              </li>
              <li>
                <Link href="/towns/tunbridge-wells" className="hover:text-brand-gold transition-colors">
                  Tunbridge Wells
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/guides" className="hover:text-brand-gold transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 mt-8 text-center md:text-left">
          <p className="text-neutral-500 text-sm">
            &copy; Business Sorted Kent {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
