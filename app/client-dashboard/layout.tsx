'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Home, BarChart2, MessageSquare, FileText, Receipt, User, Menu, X, LogOut, Eye } from 'lucide-react';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabaseClient';

const navigation = [
  { name: 'Overview', href: '/client-dashboard', icon: Home },
  { name: 'Performance', href: '/client-dashboard/performance', icon: BarChart2 },
  { name: 'Requests', href: '/client-dashboard/requests', icon: MessageSquare },
  { name: 'Monthly Reports', href: '/client-dashboard/reports', icon: FileText },
  { name: 'Invoices', href: '/client-dashboard/invoices', icon: Receipt },
  { name: 'Account', href: '/client-dashboard/account', icon: User },
];

function ClientDashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    
    router.push('/');
    router.refresh(); // Important for middleware evaluation
  };

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      {isPreview && (
        <div className="bg-brand-gold text-black text-sm font-bold py-2 px-4 flex items-center justify-center gap-2 z-[60] w-full shrink-0">
          <Eye className="w-4 h-4" />
          Previewing as Client
          <Link href="/admin-dashboard" className="ml-4 underline hover:text-white transition-colors">
            Return to Admin
          </Link>
        </div>
      )}
      <div className="flex flex-1 overflow-hidden relative">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-64 flex-col bg-zinc-950 border-r border-zinc-800 p-6">
            <button className="absolute top-4 right-4 text-zinc-400" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
            <div className="text-xl font-bold tracking-tight text-white mb-8">
              Business<span className="text-brand-gold">Sorted</span>
            </div>
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive ? 'bg-brand-gold/10 text-brand-gold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-brand-gold' : 'text-zinc-500 group-hover:text-white'}`} aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col border-r border-zinc-800 bg-zinc-950">
        <div className="flex flex-col flex-grow pt-6 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="text-xl font-bold tracking-tight text-white">
              Business<span className="text-brand-gold">Sorted</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full">Client</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive ? 'bg-brand-gold/10 text-brand-gold' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-brand-gold' : 'text-zinc-500 group-hover:text-white'}`} aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-zinc-800">
              <button onClick={handleSignOut} className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
                <LogOut className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-white transition-colors" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-zinc-950 border-b border-zinc-800 md:hidden">
          <button
            type="button"
            className="px-4 border-r border-zinc-800 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-gold md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="text-lg font-bold text-white">Business<span className="text-brand-gold">Sorted</span></div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-black">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-black" />}>
      <ClientDashboardLayoutContent>{children}</ClientDashboardLayoutContent>
    </Suspense>
  )
}
