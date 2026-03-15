'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Laptop, Search, MousePointerClick, Zap, MapPin, TrendingUp, Briefcase } from 'lucide-react';
import IconWrapper from '@/components/ui/IconWrapper';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveMenu(null);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.megamenu-container')) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ease-out border-b ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-neutral-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2' 
          : 'bg-black/40 backdrop-blur-sm border-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-50 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Business Sorted Kent Logo" 
              width={60} 
              height={40} 
              className={`object-contain drop-shadow-[0_0_12px_rgba(214,173,103,0.3)] transition-all duration-400 ease-out ${isScrolled ? 'h-8 w-auto' : 'h-10 w-auto'} group-hover:scale-105`}
            />
            <span className={`font-bold text-white tracking-tight transition-all duration-400 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Business Sorted Kent
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1 xl:space-x-2">
            
            {/* Services Dropdown */}
            <div 
              className="px-3 py-6 -my-6 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('services')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Services
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'services' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>
              
              {/* Mega Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[800px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {/* Core Services */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Core Growth Services</h3>
                      
                      <Link href="/web-design" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <Laptop className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Website Design</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">High-performance, conversion-optimised websites for local service businesses.</p>
                        </div>
                      </Link>

                      <Link href="/seo" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <Search className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">SEO & Google Rankings</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">Dominate local search results and capture high-intent commercial traffic.</p>
                        </div>
                      </Link>

                      <Link href="/lead-capture" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <MousePointerClick className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Lead Capture Systems</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">Funnels and integrated systems engineered specifically to generate daily enquiries.</p>
                        </div>
                      </Link>

                      <Link href="/business-automation" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <Zap className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Business Automation</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">Streamline operations, automate follow-ups, and manage leads without the manual work.</p>
                        </div>
                      </Link>
                    </div>

                    {/* Supporting Services */}
                    <div className="flex flex-col gap-6">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Supporting Services</h3>

                      <Link href="/branding" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <Briefcase className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Logo & Branding</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">Professional brand identities that make your business stand out and build trust.</p>
                        </div>
                      </Link>

                      <Link href="/social-media-setup" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <TrendingUp className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Social Media Setup</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">Optimised social media profiles structured to attract and convert local clients.</p>
                        </div>
                      </Link>

                      <Link href="/workwear-print" className="group/item flex items-start gap-4 p-4 -m-4 rounded-xl hover:bg-neutral-900/50 transition-colors">
                        <div className="shrink-0 bg-neutral-950 border border-neutral-800 p-3 rounded-xl group-hover/item:border-brand-gold/50 group-hover/item:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                          <Briefcase className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-1 group-hover/item:text-brand-gold transition-colors">Workwear & Print</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">High-quality physical marketing materials matched to your brand identity.</p>
                        </div>
                      </Link>
                    </div>

                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-neutral-800/50 pb-2">
                    <Link href="/services" className="inline-flex items-center text-sm font-bold text-brand-gold hover:text-white transition-colors group/link">
                      View All Services
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Towns Dropdown */}
            <div 
              className="px-3 py-6 -my-6 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('towns')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Towns
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'towns' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'towns' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              {/* Mega Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[600px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'towns' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Core Kent Coverage</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Ashford', 'Canterbury', 'Maidstone', 'Folkestone', 'Tunbridge Wells'].map((town) => (
                      <Link 
                        key={town} 
                        href={`/towns/${town.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center gap-3 p-3 -mx-3 rounded-lg hover:bg-neutral-900/60 transition-colors group/town"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/town:border-brand-gold/40 group-hover/town:shadow-[0_0_10px_rgba(214,173,103,0.1)] transition-all">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        </div>
                        <span className="text-neutral-300 group-hover/town:text-brand-gold font-medium transition-colors">{town}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-800/50 pb-2">
                    <Link href="/towns" className="inline-flex items-center text-sm font-bold text-brand-gold hover:text-white transition-colors group/link">
                      View All Kent Locations
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Links */}
            <Link href="/industries" className="px-3 py-6 -my-6 relative group">
              <span className="text-neutral-300 font-medium transition-colors hover:text-white group-hover:text-white pb-1">Industries</span>
              <span className="absolute bottom-[22px] left-3 right-3 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)]" />
            </Link>

            {/* Case Studies Dropdown */}
            <div 
              className="px-3 py-6 -my-6 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('case-studies')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Case Studies
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'case-studies' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'case-studies' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              {/* Mega Menu */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[650px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'case-studies' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Featured Results</h3>
                  
                  <div className="flex flex-col gap-4">
                    <Link href="/case-studies/gem-services" className="flex items-start gap-5 p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors group/cs">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/cs:border-brand-gold/50 group-hover/cs:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                        <TrendingUp className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover/cs:text-brand-gold transition-colors">GEM Services</h4>
                        <p className="text-sm text-neutral-400 mb-2">Pest Control | Kent</p>
                        <p className="text-xs font-semibold text-brand-gold bg-brand-gold/10 inline-block px-2.5 py-1 rounded-md">Built strong brand identity</p>
                      </div>
                    </Link>

                    <Link href="/case-studies/kent-iphone-repair" className="flex items-start gap-5 p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors group/cs">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/cs:border-brand-gold/50 group-hover/cs:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                        <Briefcase className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover/cs:text-brand-gold transition-colors">Kent iPhone Repair</h4>
                        <p className="text-sm text-neutral-400 mb-2">Mobile Phone Repair | Kent</p>
                        <p className="text-xs font-semibold text-brand-gold bg-brand-gold/10 inline-block px-2.5 py-1 rounded-md">Ranked in Google Map results</p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-800/50 pb-2">
                    <Link href="/case-studies" className="inline-flex items-center text-sm font-bold text-brand-gold hover:text-white transition-colors group/link">
                      View All Case Studies
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/guides" className="px-3 py-6 -my-6 relative group">
              <span className="text-neutral-300 font-medium transition-colors hover:text-white group-hover:text-white pb-1">Guides</span>
              <span className="absolute bottom-[22px] left-3 right-3 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)]" />
            </Link>

            <Link href="/about" className="px-3 py-6 -my-6 relative group">
              <span className="text-neutral-300 font-medium transition-colors hover:text-white group-hover:text-white pb-1">About</span>
              <span className="absolute bottom-[22px] left-3 right-3 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)]" />
            </Link>

          </div>

          {/* Right Side: Primary CTA & Mobile Toggle */}
          <div className="flex items-center shrink-0 ml-4 lg:ml-8 gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex group relative items-center justify-center bg-brand-gold text-black font-extrabold px-7 py-[2.5] h-12 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(214,173,103,0.3)] hover:shadow-[0_0_40px_rgba(214,173,103,0.5)] hover:bg-white active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get A Free Quote
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>

            <button 
              className="lg:hidden p-2 text-white hover:text-brand-gold transition-colors z-50 flex items-center justify-center min-h-[48px] min-w-[48px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 bg-black z-40 transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 flex-1 w-full max-w-sm mx-auto">
          <Link href="/" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Home
          </Link>
          
          <div className="border-b border-neutral-800/60">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center justify-between transition-colors"
            >
              Services
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileServicesOpen ? '-rotate-180 text-brand-gold' : 'text-neutral-500'}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${mobileServicesOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
              <Link href="/services" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">All Services Overview</Link>
              <Link href="/web-design" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Website Design</Link>
              <Link href="/seo" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">SEO & Rankings</Link>
              <Link href="/lead-capture" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Lead Capture</Link>
              <Link href="/business-automation" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Business Automation</Link>
            </div>
          </div>

          <Link href="/towns" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Locations
          </Link>
          <Link href="/industries" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Industries
          </Link>
          <Link href="/guides" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Guides
          </Link>
          <Link href="/about" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            About
          </Link>
          <Link href="/contact" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Contact
          </Link>
          
          <div className="mt-8 pt-4 pb-20">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center bg-brand-gold text-black font-extrabold px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(214,173,103,0.3)] min-h-[56px] text-lg active:scale-95 transition-transform"
            >
              Get A Free Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
