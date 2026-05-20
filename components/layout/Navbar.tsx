'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const servicePillars = [
  { label: 'Websites', href: '/web-design' },
  { label: 'SEO', href: '/seo' },
  { label: 'Lead capture', href: '/lead-capture' },
  { label: 'Automations', href: '/business-automation' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setServicesOpen(false);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setServicesOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.services-menu')) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-ink/95 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-ink border-b border-white/5 py-4'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo.png"
                alt="Business Sorted Kent"
                width={48}
                height={32}
                className="object-contain h-7 w-auto"
              />
              <span className="font-display text-lg md:text-xl text-paper tracking-tight whitespace-nowrap">
                Business Sorted Kent
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-7 text-sm">
              <div
                className="services-menu relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 py-2 text-paper/70 hover:text-paper transition-colors"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                    servicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <div className="w-56 bg-ink border border-white/10 rounded-md overflow-hidden shadow-xl">
                    {servicePillars.map((pillar) => (
                      <Link
                        key={pillar.href}
                        href={pillar.href}
                        className="block px-4 py-3 text-sm text-paper/70 hover:text-paper hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                      >
                        {pillar.label}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="block px-4 py-3 text-sm text-brand-gold hover:bg-white/5 transition-colors"
                    >
                      All services →
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/free-preview" className="py-2 text-paper/70 hover:text-paper transition-colors">
                Free preview
              </Link>
              <Link href="/case-studies" className="py-2 text-paper/70 hover:text-paper transition-colors">
                Case studies
              </Link>
              <Link href="/guides" className="py-2 text-paper/70 hover:text-paper transition-colors">
                Guides
              </Link>
              <Link href="/about" className="py-2 text-paper/70 hover:text-paper transition-colors">
                About
              </Link>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href="tel:+447522388055"
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-paper hover:text-brand-gold transition-colors"
                aria-label="Call 07522 388055"
              >
                <Phone className="w-4 h-4" />
                07522 388055
              </a>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center bg-brand-gold text-ink font-medium text-sm px-5 py-2.5 rounded-md hover:bg-paper transition-colors"
              >
                Get in touch
              </Link>
              <button
                className="md:hidden p-2 text-paper"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-ink z-40 transform transition-transform duration-300 md:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 max-w-sm mx-auto w-full">
          <div className="border-b border-white/10">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full text-xl font-display text-paper py-4 flex items-center justify-between"
            >
              Services
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  mobileServicesOpen ? 'rotate-180 text-brand-gold' : 'text-paper/50'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 pl-2 ${
                mobileServicesOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
              }`}
            >
              {servicePillars.map((pillar) => (
                <Link key={pillar.href} href={pillar.href} className="block text-base text-paper/70 hover:text-paper py-2.5">
                  {pillar.label}
                </Link>
              ))}
              <Link href="/services" className="block text-base text-brand-gold py-2.5">
                All services →
              </Link>
            </div>
          </div>

          <Link href="/free-preview" className="text-xl font-display text-paper py-4 border-b border-white/10">
            Free preview
          </Link>
          <Link href="/case-studies" className="text-xl font-display text-paper py-4 border-b border-white/10">
            Case studies
          </Link>
          <Link href="/guides" className="text-xl font-display text-paper py-4 border-b border-white/10">
            Guides
          </Link>
          <Link href="/about" className="text-xl font-display text-paper py-4 border-b border-white/10">
            About
          </Link>
          <Link href="/towns" className="text-base text-paper/60 py-3 mt-4">
            Areas we cover →
          </Link>
          <Link href="/industries" className="text-base text-paper/60 py-3">
            Industries we serve →
          </Link>

          <a
            href="tel:+447522388055"
            className="flex items-center gap-2 text-base text-paper/70 py-3 mt-2"
          >
            <Phone className="w-4 h-4" />
            07522 388055
          </a>

          <div className="mt-8">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center bg-brand-gold text-ink font-medium px-6 py-4 rounded-md text-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
