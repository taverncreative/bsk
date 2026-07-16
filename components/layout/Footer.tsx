import Link from 'next/link';
import Image from 'next/image';

const services = [
  { label: 'Websites', href: '/web-design' },
  { label: 'SEO', href: '/seo' },
  { label: 'Lead capture', href: '/lead-capture' },
  { label: 'Automations', href: '/business-automation' },
];

const supporting = [
  { label: 'Logo & branding', href: '/branding' },
  { label: 'Social media setup', href: '/social-media-setup' },
  { label: 'Workwear & print', href: '/workwear-print' },
];

const towns = [
  { label: 'Ashford', href: '/towns/ashford' },
  { label: 'Canterbury', href: '/towns/canterbury' },
  { label: 'Maidstone', href: '/towns/maidstone' },
  { label: 'Folkestone', href: '/towns/folkestone' },
  { label: 'Sevenoaks', href: '/towns/sevenoaks' },
  { label: 'Medway', href: '/towns/medway' },
  { label: 'Sittingbourne', href: '/towns/sittingbourne' },
  { label: 'Faversham', href: '/towns/faversham' },
  { label: 'Margate', href: '/towns/margate' },
  { label: 'Ramsgate', href: '/towns/ramsgate' },
  { label: 'Broadstairs', href: '/towns/broadstairs' },
  { label: 'Deal', href: '/towns/deal' },
  { label: 'Tunbridge Wells', href: '/towns/tunbridge-wells' },
];

const industries = [
  { label: 'Electricians', href: '/industries/electricians' },
  { label: 'Plumbers', href: '/industries/plumbers' },
  { label: 'Roofers', href: '/industries/roofers' },
  { label: 'Builders', href: '/industries/builders' },
  { label: 'Carpenters', href: '/industries/carpenters' },
  { label: 'Painters & decorators', href: '/industries/painters-and-decorators' },
  { label: 'Landscapers', href: '/industries/landscapers' },
  { label: 'Garden services', href: '/industries/garden-services' },
  { label: 'Cleaning companies', href: '/industries/cleaning-companies' },
  { label: 'Removal companies', href: '/industries/removal-companies' },
  { label: 'Letting agents', href: '/industries/letting-agents' },
  { label: 'Property maintenance', href: '/industries/property-maintenance' },
  { label: 'Holiday lets', href: '/industries/holiday-lets' },
  { label: 'Accountants', href: '/industries/accountants' },
  { label: 'Solicitors', href: '/industries/solicitors' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mb-16 pb-16 border-b border-white/10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Business Sorted Kent" width={48} height={32} className="w-auto h-7 object-contain" />
              <span className="font-display text-2xl text-paper">Business Sorted Kent</span>
            </div>
            <p className="font-display text-2xl md:text-3xl text-paper leading-snug">
              Websites, SEO and automations for Kent businesses.
              <span className="block text-paper/60 mt-1">Built properly, and priced to your project.</span>
            </p>
          </div>
          <div className="md:text-right">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-4">Get in touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@businesssortedkent.co.uk" className="text-paper hover:text-brand-gold transition-colors">
                  hello@businesssortedkent.co.uk
                </a>
              </li>
              <li>
                <a href="tel:+447522388055" className="text-paper hover:text-brand-gold transition-colors">
                  07522 388055
                </a>
              </li>
              <li className="text-paper/50 leading-relaxed">
                84 Abbots Walk, Wye<br />
                Ashford, Kent TN25 5ES
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-5">Services</h3>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-paper/70 hover:text-brand-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 border-t border-white/10 mt-3 text-xs uppercase tracking-[0.16em] text-paper/50 font-mono">
                Add-ons
              </li>
              {supporting.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-paper/50 hover:text-brand-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-5">Areas we cover</h3>
            <ul className="space-y-2.5 text-sm">
              {towns.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-paper/70 hover:text-brand-gold transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/towns" className="text-brand-gold hover:text-paper transition-colors">
                  All Kent towns →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-5">Industries</h3>
            <ul className="space-y-2.5 text-sm">
              {industries.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-paper/70 hover:text-brand-gold transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/industries" className="text-brand-gold hover:text-paper transition-colors">
                  All industries →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-paper/50 mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-paper/70 hover:text-brand-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-paper/70 hover:text-brand-gold transition-colors">
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-paper/70 hover:text-brand-gold transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/kent-business-growth" className="text-paper/70 hover:text-brand-gold transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-paper/70 hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 space-y-4 text-xs text-paper/50 font-mono">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-brand-gold transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-brand-gold transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand-gold transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-brand-gold transition-colors">
                Accessibility
              </Link>
            </li>
          </ul>
          <p className="text-paper/40 normal-case tracking-normal font-sans leading-relaxed max-w-3xl">
            Business Sorted Kent is a sole trader registered in England. Business address: 84
            Abbots Walk, Wye, Ashford, Kent, TN25 5ES. Contact:{' '}
            <a
              href="mailto:hello@businesssortedkent.co.uk"
              className="hover:text-brand-gold transition-colors"
            >
              hello@businesssortedkent.co.uk
            </a>
            .
          </p>
          <p>&copy; Business Sorted Kent {new Date().getFullYear()} · Kent, UK</p>
        </div>
      </div>
    </footer>
  );
}
