import type { Metadata } from 'next'
import DiscoveryClient from './DiscoveryClient'

export const metadata: Metadata = {
  title: 'Discovery Form | Servoro',
  description: 'Client discovery form for Servoro website project',
  robots: { index: false, follow: false },
}

export default function DiscoveryPage() {
  return <DiscoveryClient />
}
