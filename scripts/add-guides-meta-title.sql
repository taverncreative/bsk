-- ============================================================
-- add-guides-meta-title.sql
-- Adds a nullable meta_title column to public.guides for decoupled
-- SEO titles. Editorial title (guides.title) stays as-is; meta_title
-- (when set) overrides the <title> tag only.
--
-- Run once via Supabase Studio SQL editor.
-- PostgREST doesn't expose DDL, so this can't be executed via REST.
--
-- After running, the column is immediately available to the
-- application via lib/queries/guides.ts (which uses select('*')).
-- The Guide TypeScript interface and generateMetadata fallback
-- logic ship in the same commit as this file.
--
-- Safe to re-run: ADD COLUMN IF NOT EXISTS makes this idempotent.
--
-- This SQL was executed against production on 2026-05-20.
-- ============================================================

ALTER TABLE public.guides
ADD COLUMN IF NOT EXISTS meta_title text;

COMMENT ON COLUMN public.guides.meta_title IS
  'SEO meta title override for the <title> tag and SERP display. If set, replaces the editorial title in the <title> tag. Falls back to guides.title when null. Recommended max 60 chars to fit Google SERP truncation; not enforced in DB. Editorial title (guides.title) continues to be used for H1, og:title, twitter:title, Article.headline, breadcrumbs, cards, and body copy.';
