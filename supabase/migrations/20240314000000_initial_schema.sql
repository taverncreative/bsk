-- Enable the pgcrypto extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- 1. Core Dimension Tables
-- ==========================================

-- Towns Table
CREATE TABLE IF NOT EXISTS public.towns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    county TEXT DEFAULT 'Kent',
    population TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    intro TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Industries Table
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    pain_point TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);


-- ==========================================
-- 2. Contextual & Content Tables
-- ==========================================

-- Local Intros (The Anti-Spam Guardrail joining Towns & Services)
CREATE TABLE IF NOT EXISTS public.local_intros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
    town_id UUID NOT NULL REFERENCES public.towns(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(service_id, town_id) -- Ensure only one intro per ServicexTown combo
);

-- Case Studies (Social Proof & Proof of Local Work)
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    industry_id UUID REFERENCES public.industries(id) ON DELETE SET NULL,
    town_id UUID REFERENCES public.towns(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    summary TEXT NOT NULL,
    results TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'draft' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Educational Guides (Top of Funnel Link Magnets)
CREATE TABLE IF NOT EXISTS public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'draft' NOT NULL,
    published_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- FAQs (Schema JSON-LD Feeders)
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    town_id UUID REFERENCES public.towns(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES public.industries(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Local Reviews (Social Proof & Schema Feeders)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    town_id UUID REFERENCES public.towns(id) ON DELETE SET NULL,
    source TEXT DEFAULT 'Google',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);


-- ==========================================
-- 3. High-Performance Indexing
-- ==========================================

-- Lookup by Slugs (Critical for Next.js App Router dynamic routes)
CREATE INDEX IF NOT EXISTS idx_towns_slug ON public.towns(slug);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON public.industries(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_guides_slug ON public.guides(slug);

-- Lookup by Foreign Keys (Critical for fast Page Generation aggregations)
CREATE INDEX IF NOT EXISTS idx_local_intros_service_town ON public.local_intros(service_id, town_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_town ON public.case_studies(town_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_service ON public.case_studies(service_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_industry ON public.case_studies(industry_id);
CREATE INDEX IF NOT EXISTS idx_faqs_service ON public.faqs(service_id);
CREATE INDEX IF NOT EXISTS idx_faqs_town ON public.faqs(town_id);
CREATE INDEX IF NOT EXISTS idx_reviews_town ON public.reviews(town_id);
