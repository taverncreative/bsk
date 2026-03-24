'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Menu, X, MapPin, TrendingUp, Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';
import MegaMenuCTA from '@/components/ui/MegaMenuCTA';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileLocationsOpen(false);
    setMobileIndustriesOpen(false);
    setMobileGuidesOpen(false);
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
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 ease-out border-b ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md border-[rgba(255,255,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2' 
            : 'bg-black/40 backdrop-blur-sm border-[rgba(255,255,255,0.06)] py-3'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between w-full gap-4 md:gap-8 transition-all duration-200">
          
          {/* Logo */}
          <div className="flex shrink-0 min-w-0 md:min-w-[220px]">
            <Link href="/" className="flex items-center gap-3 group relative z-50 shrink-0">
              <Image 
                src="/logo.png" 
                alt="Business Sorted Kent Logo" 
                width={60} 
                height={40} 
                className={`object-contain drop-shadow-[0_0_12px_rgba(214,173,103,0.3)] transition-all duration-400 ease-out ${isScrolled ? 'h-8' : 'h-10'} w-auto group-hover:scale-105`}
              />
              <span className={`font-bold text-white tracking-tight transition-all duration-400 ${isScrolled ? 'text-lg' : 'text-xl'} whitespace-nowrap`}>
                Business Sorted Kent
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-1 lg:space-x-4 xl:space-x-6 whitespace-nowrap text-[0.93em] z-[60]">
            
            {/* Services Dropdown */}
            <div 
              className="px-4 py-3 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('services')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Services
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'services' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'services' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>
              
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[1200px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 relative overflow-hidden flex gap-8 whitespace-normal text-left">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <div className="flex-1 grid grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-white tracking-tight">Website Design</h3>
                      <p className="text-xs text-brand-gold/80 font-medium mb-1">High-performance websites built to rank and convert.</p>
                      <Link href="/web-design" className="text-sm text-neutral-300 hover:text-white transition-colors">Website Design</Link>
                      <Link href="/web-design" className="text-sm text-neutral-300 hover:text-white transition-colors">Small Business Websites</Link>
                      <Link href="/web-design" className="text-sm text-neutral-300 hover:text-white transition-colors">Ecommerce Websites</Link>
                      <Link href="/web-design" className="text-sm text-neutral-300 hover:text-white transition-colors">Website Redesign</Link>
                      <Link href="/web-design" className="text-sm text-neutral-300 hover:text-white transition-colors">Mobile Optimised Websites</Link>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-white tracking-tight">SEO</h3>
                      <p className="text-xs text-brand-gold/80 font-medium mb-1">Helping local businesses appear when customers search.</p>
                      <Link href="/seo" className="text-sm text-neutral-300 hover:text-white transition-colors">SEO Services In Kent</Link>
                      <Link href="/seo" className="text-sm text-neutral-300 hover:text-white transition-colors">Local SEO</Link>
                      <Link href="/seo" className="text-sm text-neutral-300 hover:text-white transition-colors">SEO For Trades</Link>
                      <Link href="/seo" className="text-sm text-neutral-300 hover:text-white transition-colors">Google Business Optimisation</Link>
                      <Link href="/seo" className="text-sm text-neutral-300 hover:text-white transition-colors">Technical SEO</Link>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-white tracking-tight">Automation</h3>
                      <p className="text-xs text-brand-gold/80 font-medium mb-1">Streamlining processes to save you time and money.</p>
                      <Link href="/business-automation" className="text-sm text-neutral-300 hover:text-white transition-colors">Business Automation</Link>
                      <Link href="/business-automation" className="text-sm text-neutral-300 hover:text-white transition-colors">Automated Lead Handling</Link>
                      <Link href="/business-automation" className="text-sm text-neutral-300 hover:text-white transition-colors">Email Automation</Link>
                      <Link href="/business-automation" className="text-sm text-neutral-300 hover:text-white transition-colors">Workflow Automation</Link>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold text-white tracking-tight">Lead Capture</h3>
                      <p className="text-xs text-brand-gold/80 font-medium mb-1">Converting traffic into ready-to-buy enquiries.</p>
                      <Link href="/lead-capture" className="text-sm text-neutral-300 hover:text-white transition-colors">Lead Capture Systems</Link>
                      <Link href="/lead-capture" className="text-sm text-neutral-300 hover:text-white transition-colors">Contact Form Optimisation</Link>
                      <Link href="/lead-capture" className="text-sm text-neutral-300 hover:text-white transition-colors">Conversion Optimisation</Link>
                      <Link href="/lead-capture" className="text-sm text-neutral-300 hover:text-white transition-colors">Enquiry Automation</Link>
                    </div>
                  </div>
                  
                  {/* CTA Panel */}
                  <div className="w-[320px] shrink-0 border-l border-neutral-800/50 pl-8 pb-2">
                    <MegaMenuCTA onClick={() => setActiveMenu(null)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Locations Dropdown */}
            <div 
              className="px-4 py-3 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('towns')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Locations
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'towns' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'towns' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[1000px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'towns' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 relative overflow-hidden flex gap-8 whitespace-normal text-left">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <div className="flex-1 grid grid-cols-4 gap-6">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">East Kent</h3>
                      <Link href="/towns/ashford" className="text-sm text-neutral-300 hover:text-white transition-colors">Ashford</Link>
                      <Link href="/towns/canterbury" className="text-sm text-neutral-300 hover:text-white transition-colors">Canterbury</Link>
                      <Link href="/towns/folkestone" className="text-sm text-neutral-300 hover:text-white transition-colors">Folkestone</Link>
                      <Link href="/towns/hythe" className="text-sm text-neutral-300 hover:text-white transition-colors">Hythe</Link>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Central Kent</h3>
                      <Link href="/towns/maidstone" className="text-sm text-neutral-300 hover:text-white transition-colors">Maidstone</Link>
                      <Link href="/towns/medway" className="text-sm text-neutral-300 hover:text-white transition-colors">Medway</Link>
                      <Link href="/towns/sittingbourne" className="text-sm text-neutral-300 hover:text-white transition-colors">Sittingbourne</Link>
                      <Link href="/towns/faversham" className="text-sm text-neutral-300 hover:text-white transition-colors">Faversham</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Thanet & Coast</h3>
                      <Link href="/towns/margate" className="text-sm text-neutral-300 hover:text-white transition-colors">Margate</Link>
                      <Link href="/towns/ramsgate" className="text-sm text-neutral-300 hover:text-white transition-colors">Ramsgate</Link>
                      <Link href="/towns/broadstairs" className="text-sm text-neutral-300 hover:text-white transition-colors">Broadstairs</Link>
                      <Link href="/towns/deal" className="text-sm text-neutral-300 hover:text-white transition-colors">Deal</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Explore Locations</h3>
                      <Link href="/towns" className="text-sm text-brand-gold hover:text-white font-bold transition-colors inline-flex items-center group">
                        All Kent Locations <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[300px] shrink-0 border-l border-neutral-800/50 pl-8 pb-2">
                    <MegaMenuCTA onClick={() => setActiveMenu(null)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div 
              className="px-4 py-3 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('industries')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Industries
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'industries' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'industries' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[1000px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'industries' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 relative overflow-hidden flex gap-8 whitespace-normal text-left">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <div className="flex-1 grid grid-cols-4 gap-6">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Trades</h3>
                      <Link href="/industries/electricians" className="text-sm text-neutral-300 hover:text-white transition-colors">Electricians</Link>
                      <Link href="/industries/plumbers" className="text-sm text-neutral-300 hover:text-white transition-colors">Plumbers</Link>
                      <Link href="/industries/roofers" className="text-sm text-neutral-300 hover:text-white transition-colors">Roofers</Link>
                      <Link href="/industries/builders" className="text-sm text-neutral-300 hover:text-white transition-colors">Builders</Link>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Local Services</h3>
                      <Link href="/industries/cleaning-companies" className="text-sm text-neutral-300 hover:text-white transition-colors">Cleaning Companies</Link>
                      <Link href="/industries/landscapers" className="text-sm text-neutral-300 hover:text-white transition-colors">Landscapers</Link>
                      <Link href="/industries/removal-companies" className="text-sm text-neutral-300 hover:text-white transition-colors">Removal Companies</Link>
                      <Link href="/industries/property-services" className="text-sm text-neutral-300 hover:text-white transition-colors">Property Services</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Professional Services</h3>
                      <Link href="/industries/consultants" className="text-sm text-neutral-300 hover:text-white transition-colors">Consultants</Link>
                      <Link href="/industries/accountants" className="text-sm text-neutral-300 hover:text-white transition-colors">Accountants</Link>
                      <Link href="/industries/estate-agents" className="text-sm text-neutral-300 hover:text-white transition-colors">Estate Agents</Link>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Explore Industries</h3>
                      <Link href="/industries" className="text-sm text-brand-gold hover:text-white font-bold transition-colors inline-flex items-center group">
                        All Industries <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[300px] shrink-0 border-l border-neutral-800/50 pl-8 pb-2">
                    <MegaMenuCTA onClick={() => setActiveMenu(null)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Guides Dropdown */}
            <div 
              className="px-4 py-3 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('guides')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Guides
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'guides' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'guides' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[800px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'guides' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 relative overflow-hidden flex gap-8 whitespace-normal text-left">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <div className="flex-1 grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Featured Guides</h3>
                      <Link href="/guides" className="text-sm text-neutral-300 hover:text-white transition-colors">How To Rank On Google</Link>
                      <Link href="/guides" className="text-sm text-neutral-300 hover:text-white transition-colors">Website Speed Guide</Link>
                      <Link href="/guides" className="text-sm text-neutral-300 hover:text-white transition-colors">Local SEO Guide</Link>
                      <Link href="/guides" className="text-sm text-neutral-300 hover:text-white transition-colors">How To Get More Enquiries</Link>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Explore</h3>
                      <Link href="/guides" className="text-sm text-brand-gold hover:text-white font-bold transition-colors inline-flex items-center group">
                        View All Guides <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="w-[300px] shrink-0 border-l border-neutral-800/50 pl-8 pb-2">
                    <MegaMenuCTA onClick={() => setActiveMenu(null)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Case Studies Dropdown - Keeping standard case studies from previous menu since it wasn't mentioned but needs porting back */}
            <div 
              className="px-4 py-3 cursor-pointer megamenu-container"
              onMouseEnter={() => setActiveMenu('case-studies')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 text-neutral-300 font-medium transition-colors hover:text-white group relative pb-1">
                Case Studies
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${activeMenu === 'case-studies' ? '-rotate-180 text-brand-gold' : 'group-hover:text-brand-gold group-hover:-rotate-180'}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-brand-gold origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)] transition-transform duration-300 ${activeMenu === 'case-studies' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </div>

              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 w-full max-w-[650px] pt-4 transition-all duration-300 ease-out ${activeMenu === 'case-studies' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
                onClick={() => setActiveMenu(null)}
              >
                <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 relative overflow-hidden whitespace-normal text-left">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                  
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Featured Results</h3>

                  <div className="flex flex-col gap-4">
                    <Link href="/case-studies/safelee-inspection-consultancy" className="flex items-start gap-5 p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors group/cs">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/cs:border-brand-gold/50 group-hover/cs:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                        <TrendingUp className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover/cs:text-brand-gold transition-colors">SafeLee Inspection & Consultancy</h4>
                        <p className="text-sm text-neutral-400 mb-2">Health & Safety | Manchester</p>
                        <p className="text-xs font-semibold text-brand-gold bg-brand-gold/10 inline-block px-2.5 py-1 rounded-md">Page 1 rankings from zero visibility</p>
                      </div>
                    </Link>

                    <Link href="/case-studies/therapy-hair-body-nails" className="flex items-start gap-5 p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors group/cs">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/cs:border-brand-gold/50 group-hover/cs:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                        <Briefcase className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover/cs:text-brand-gold transition-colors">Therapy Hair Body & Nails</h4>
                        <p className="text-sm text-neutral-400 mb-2">Hair & Beauty | Kent</p>
                        <p className="text-xs font-semibold text-brand-gold bg-brand-gold/10 inline-block px-2.5 py-1 rounded-md">Transformed online booking pipeline</p>
                      </div>
                    </Link>

                    <Link href="/case-studies/how-to-automate-my-business" className="flex items-start gap-5 p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors group/cs">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover/cs:border-brand-gold/50 group-hover/cs:shadow-[0_0_15px_rgba(214,173,103,0.15)] transition-all">
                        <TrendingUp className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover/cs:text-brand-gold transition-colors">How To Automate My Business</h4>
                        <p className="text-sm text-neutral-400 mb-2">AI & Automation | Kent</p>
                        <p className="text-xs font-semibold text-brand-gold bg-brand-gold/10 inline-block px-2.5 py-1 rounded-md">Authority platform from launch</p>
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

            <Link href="/about" className="px-4 py-3 relative group flex items-center">
              <span className="text-neutral-300 font-medium transition-colors hover:text-white group-hover:text-white pb-1">About</span>
              <span className="absolute bottom-2 left-4 right-4 h-[2px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-[0_0_10px_rgba(214,173,103,0.5)]" />
            </Link>

          </div>

          {/* Right Side: Primary CTA & Mobile Toggle */}
          <div className="flex shrink-0 items-center justify-end gap-4 min-w-[60px] md:min-w-[160px] xl:min-w-[220px]">
            <a
              href="tel:07522388055"
              className="hidden xl:flex items-center gap-2 text-neutral-300 hover:text-brand-gold font-bold transition-colors group whitespace-nowrap"
            >
              <svg className="w-4 h-4 text-brand-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              07522 388055
            </a>
            
            <Link
              href="/contact"
              className="hidden md:inline-flex group relative items-center justify-center bg-brand-gold text-black font-extrabold px-6 lg:px-7 py-2.5 h-12 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(214,173,103,0.3)] hover:shadow-[0_0_40px_rgba(214,173,103,0.5)] hover:bg-white active:scale-95 overflow-hidden whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get A Free Quote
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>

            <button 
              className="md:hidden p-2 text-white hover:text-brand-gold transition-colors z-50 flex items-center justify-center min-h-[48px] min-w-[48px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

        </div>
      </div>
    </nav>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 bg-black z-40 transform transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 pb-6 overflow-y-auto ${
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
              <Link href="/services" className="text-lg font-medium text-brand-gold hover:text-white py-2.5 min-h-[48px] flex items-center">All Services Overview</Link>
              <Link href="/web-design" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Website Design</Link>
              <Link href="/seo" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">SEO & Rankings</Link>
              <Link href="/lead-capture" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Lead Capture</Link>
              <Link href="/business-automation" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Business Automation</Link>
            </div>
          </div>

          <div className="border-b border-neutral-800/60">
            <button 
              onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
              className="w-full text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center justify-between transition-colors"
            >
              Locations
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileLocationsOpen ? '-rotate-180 text-brand-gold' : 'text-neutral-500'}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${mobileLocationsOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
              <Link href="/towns" className="text-lg font-medium text-brand-gold hover:text-white py-2.5 min-h-[48px] flex items-center">All Kent Locations</Link>
              <Link href="/towns/ashford" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Ashford</Link>
              <Link href="/towns/canterbury" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Canterbury</Link>
              <Link href="/towns/maidstone" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Maidstone</Link>
              <Link href="/towns/margate" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Margate</Link>
            </div>
          </div>

          <div className="border-b border-neutral-800/60">
            <button 
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              className="w-full text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center justify-between transition-colors"
            >
              Industries
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileIndustriesOpen ? '-rotate-180 text-brand-gold' : 'text-neutral-500'}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${mobileIndustriesOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
              <Link href="/industries" className="text-lg font-medium text-brand-gold hover:text-white py-2.5 min-h-[48px] flex items-center">All Industries</Link>
              <Link href="/industries/builders" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Builders</Link>
              <Link href="/industries/electricians" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Electricians</Link>
              <Link href="/industries/plumbers" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Plumbers</Link>
              <Link href="/industries/accountants" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Accountants</Link>
            </div>
          </div>

          <div className="border-b border-neutral-800/60">
            <button 
              onClick={() => setMobileGuidesOpen(!mobileGuidesOpen)}
              className="w-full text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center justify-between transition-colors"
            >
              Guides
              <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileGuidesOpen ? '-rotate-180 text-brand-gold' : 'text-neutral-500'}`} />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${mobileGuidesOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
              <Link href="/guides" className="text-lg font-medium text-brand-gold hover:text-white py-2.5 min-h-[48px] flex items-center">View All Guides</Link>
              <Link href="/guides" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">How To Rank On Google</Link>
              <Link href="/guides" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Website Speed Guide</Link>
              <Link href="/guides" className="text-lg font-medium text-neutral-300 hover:text-brand-gold py-2.5 min-h-[48px] flex items-center">Local SEO Guide</Link>
            </div>
          </div>

          <Link href="/about" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            About
          </Link>
          <Link href="/contact" className="text-2xl font-medium text-white hover:text-brand-gold py-3 min-h-[48px] flex items-center border-b border-neutral-800/60">
            Contact
          </Link>
          
          <div className="mt-8">
            <MegaMenuCTA onClick={() => setIsMobileMenuOpen(false)} />
          </div>

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
    </>
  );
}
