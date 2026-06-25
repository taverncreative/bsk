import type { LocalIntro } from '@/types';
import localIntrosData from '@/lib/data/local_intros.json';

const localIntros = localIntrosData as unknown as LocalIntro[];

export async function getLocalIntro(serviceId: string, townId: string): Promise<LocalIntro | null> {
  return (
    localIntros.find(
      (li) => (li as any).service_id === serviceId && (li as any).town_id === townId
    ) ?? null
  );
}
