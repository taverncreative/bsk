import type { Metadata } from 'next'
import DiscoveryClient from './DiscoveryClient'

export const metadata: Metadata = {
  title: 'Discovery Form | Scalderhurst Ltd',
  description: 'Client discovery form for Scalderhurst Ltd website project',
  robots: { index: false, follow: false },
}

export default function DiscoveryPage() {
  return <DiscoveryClient />
}
