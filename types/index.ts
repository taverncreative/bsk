export interface Town {
  id: string;
  name: string;
  slug: string;
  county: string;
  population: string | null;
  latitude: number | null;
  longitude: number | null;
  intro: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  pain_point: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocalIntro {
  id: string;
  service_id: string;
  town_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  industry_id: string | null;
  town_id: string | null;
  service_id: string | null;
  summary: string;
  results: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  tags: string[] | null;
  status: string;
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  service_id: string | null;
  town_id: string | null;
  industry_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  review_text: string;
  town_id: string | null;
  source: string;
  created_at: string;
}

export interface IndustryPainPoint {
  id: string;
  service_id: string;
  industry_id: string;
  pain_point: string;
  created_at: string;
}
