import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-24 bg-white text-center px-4">
      <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
        <svg className="w-10 h-10 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Page Not Found
      </h1>
      
      <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
        Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <Button href="/contact" className="text-lg px-8 py-3 shadow-md w-full sm:w-auto">
          Get a Free Quote
        </Button>
      </div>

      <div className="border-t border-slate-200 pt-12 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Helpful Links</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-brand font-medium transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/#services" 
            className="text-slate-600 hover:text-brand font-medium transition-colors"
          >
            Services
          </Link>
          <Link 
            href="/guides" 
            className="text-slate-600 hover:text-brand font-medium transition-colors"
          >
            Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
