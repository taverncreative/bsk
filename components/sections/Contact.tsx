import QuoteForm from '@/components/forms/QuoteForm';

export default function Contact() {
  return (
    <section id="quote" className="py-28 bg-black border-t border-neutral-900 relative">
      <div className="container mx-auto px-4 max-w-[1300px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Text Payload */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 mt-4">
              Get A Free Quote
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-10 max-w-lg">
              Tell us about your project and we will get back to you with a custom strategy.
            </p>
            
            {/* Contact Info Widget */}
            <div className="hidden lg:flex flex-col gap-5 mt-12 bg-white p-7 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] max-w-md">
              <a href="mailto:hello@businesssortedkent.co.uk" className="flex items-center gap-5 text-neutral-800 font-semibold hover:text-brand-gold transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/10 transition-colors">
                  <svg className="w-5 h-5 text-neutral-600 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                hello@businesssortedkent.co.uk
              </a>
              <a href="tel:07700900000" className="flex items-center gap-5 text-neutral-800 font-semibold hover:text-brand-gold transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/10 transition-colors">
                  <svg className="w-5 h-5 text-neutral-600 group-hover:text-brand-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                07700 900000
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Form Layout */}
          <div className="w-full">
            <QuoteForm />
          </div>

        </div>
      </div>
    </section>
  );
}
