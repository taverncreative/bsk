import { supabase } from '@/lib/supabase';

export interface LocalContent {
  id: string;
  service_slug: string;
  town_slug: string;
  intro_paragraph: string;
  local_context: string;
  competition_landscape: string | null;
  success_approach: string | null;
  local_stats: Record<string, any>;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  layout_variant: string;
}

export interface IndustryContent {
  id: string;
  industry_slug: string;
  service_slug: string;
  intro_paragraph: string;
  why_needed: string;
  approach_difference: string | null;
  pain_points: Array<{ title: string; description: string }>;
  solutions: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export async function getLocalContent(serviceSlug: string, townSlug: string): Promise<LocalContent | null> {
  const { data, error } = await supabase
    .from('local_content')
    .select('*')
    .eq('service_slug', serviceSlug)
    .eq('town_slug', townSlug)
    .single();

  if (error || !data) return null;
  return data as LocalContent;
}

export async function getIndustryContent(industrySlug: string, serviceSlug: string): Promise<IndustryContent | null> {
  const { data, error } = await supabase
    .from('industry_content')
    .select('*')
    .eq('industry_slug', industrySlug)
    .eq('service_slug', serviceSlug)
    .single();

  if (error || !data) return null;
  return data as IndustryContent;
}
