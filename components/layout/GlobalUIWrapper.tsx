'use client';

import { usePathname } from 'next/navigation';

export default function GlobalUIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/admin-dashboard') || pathname?.startsWith('/client-dashboard') || pathname?.startsWith('/login');

  if (isDashboard) return null;

  return <>{children}</>;
}
