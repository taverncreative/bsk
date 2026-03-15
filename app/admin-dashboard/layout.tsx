'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, UserPlus, KanbanSquare, PieChart, Bot, Receipt, FileText, Layers, Menu, X, LogOut, Eye, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

const navigation = [
  { name: 'Overview', href: '/admin-dashboard', icon: LayoutDashboard },
  { name: 'Upcoming Calls', href: '/admin-dashboard/upcoming-calls', icon: FileText },
  { name: 'Lead Inbox', href: '/admin-dashboard/lead-inbox', icon: Mail },
  { name: 'Leads', href: '/admin-dashboard/leads', icon: UserPlus },
  { name: 'CRM Pipeline', href: '/admin-dashboard/pipeline', icon: KanbanSquare },
  { name: 'Clients', href: '/admin-dashboard/clients', icon: Users },
  { name: 'Analytics', href: '/admin-dashboard/analytics', icon: PieChart },
  { name: 'Elle', href: '/admin-dashboard/elle', icon: Bot },
  { name: 'Invoices', href: '/admin-dashboard/invoices', icon: Receipt },
  { name: 'Reports', href: '/admin-dashboard/reports', icon: FileText },
  { name: 'Templates', href: '/admin-dashboard/templates', icon: Layers },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    
    router.push('/');
    router.refresh(); // Important for middleware evaluation
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans pt-[73px]">
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
            <nav className="flex-1 space-y-1 overflow-y-auto">
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
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-900/40 text-red-400 rounded-full">Admin</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin-dashboard');
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
              <Link href="/client-dashboard?preview=true" className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-zinc-900 hover:text-brand-gold transition-colors mb-2">
                <Eye className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-brand-gold transition-colors" />
                View As Client
              </Link>
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
  );
}
