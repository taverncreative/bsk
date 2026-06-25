import React from 'react';
import { getAllTowns } from '@/lib/queries';
import LocalAuthorityMapClient from './LocalAuthorityMapClient';
import { Town } from '@/types';

interface LocalAuthorityMapProps {
  headlineOverride?: React.ReactNode;
  towns?: Town[];
}

export default async function LocalAuthorityMap({ headlineOverride, towns }: LocalAuthorityMapProps) {
  let primaryTowns = towns;
  
  if (!primaryTowns) {
    const allTowns = await getAllTowns();
    primaryTowns = allTowns.filter((t) => t.county !== 'Kent District');
  }

  return <LocalAuthorityMapClient headlineOverride={headlineOverride} towns={primaryTowns} />;
}
