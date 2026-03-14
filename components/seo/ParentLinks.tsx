import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';

interface ParentLinksProps {
  service: { name: string; slug: string };
  town: { name: string; slug: string };
}

export default function ParentLinks({ service, town }: ParentLinksProps) {
  return (
    <div className="bg-neutral-900 border-b border-neutral-800 py-3 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2 text-neutral-400 font-medium justify-center md:justify-start">
          <Link 
            href={`/${service.slug}`} 
            className="flex items-center gap-2 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {service.name} Services
          </Link>
          
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-neutral-700" />
          
          <Link 
            href={`/towns/${town.slug}`} 
            className="flex items-center gap-2 hover:text-brand-gold transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Business in {town.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
