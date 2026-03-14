import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTownBySlug, getAllTowns, getAllServices, getNearbyTowns } from '@/lib/queries';
import type { Town } from '@/types';
import TownPage from '@/components/templates/TownPage';

type Props = {
  params: Promise<{
    townSlug: string;
  }>;
};

export async function generateStaticParams() {
  const towns = await getAllTowns();
  return towns.map((t) => ({ townSlug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { townSlug } = await params;
  const town = await getTownBySlug(townSlug);

  if (!town) {
    return { title: 'Not Found | Business Sorted Kent' };
  }

  return {
    title: `Digital Agency in ${town.name} | Business Sorted Kent`,
    description: `Web design, SEO and automation services for businesses in ${town.name}, Kent.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/towns/${town.slug}`
    }
  };
}

export default async function TownHubPage({ params }: Props) {
  const { townSlug } = await params;
  
  // Parallel fetch for speed
  const [town, allServices] = await Promise.all([
    getTownBySlug(townSlug),
    getAllServices(),
  ]);

  if (!town) {
    notFound();
  }

  let nearbyTowns: Town[] = [];
  if (town.latitude !== null && town.longitude !== null) {
    nearbyTowns = await getNearbyTowns(town.latitude, town.longitude, 5);
  }

  return (
    <TownPage 
      town={{ name: town.name, slug: town.slug }} 
      services={allServices.map(s => ({ name: s.name, slug: s.slug }))} 
    />
  );
}
