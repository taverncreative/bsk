import Link from 'next/link';

export default function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black p-4 border-t border-slate-900 shadow-2xl pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
      <div className="flex gap-4">
        <a 
          href="tel:+440000000000" 
          className="flex-1 flex items-center justify-center py-3.5 px-4 font-bold text-black bg-brand rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us
        </a>
        <Link 
          href="/contact#quote" 
          className="flex-1 flex items-center justify-center py-3.5 px-4 font-bold text-black bg-brand rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Get Quote
        </Link>
      </div>
    </div>
  );
}
