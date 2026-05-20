-- ============================================================
-- update-guide-excerpts.sql
-- Trim two over-length guide excerpts to under 160 chars.
-- SE Ranking audit flagged both meta descriptions as over-length.
--
-- Already executed against production via service-role REST PATCH;
-- this file exists for version control + to trigger a Vercel rebuild
-- so the new excerpts surface in the SSG-rendered <meta name="description">.
-- Same pattern as scripts/seed-local-content-gravesend-ai.sql.
--
-- Safe to re-run: UPDATE is idempotent.
-- ============================================================

-- 1. good-small-business-website
-- Was 160c. Drops "and techniques" → 145c.
-- ============================================================
UPDATE public.guides
SET excerpt = 'Learn how to build an effective small business website that boosts your brand''s presence and drives conversions. Discover tips to succeed online.'
WHERE slug = 'good-small-business-website';

-- 2. local-seo-kent-guide
-- Was 161c. Replaces last comma + "and beyond" with "and" → 152c.
-- ============================================================
UPDATE public.guides
SET excerpt = 'Boost your local business presence in Kent with this detailed Local SEO guide. Learn tactics to enhance visibility in Ashford, Maidstone and Canterbury.'
WHERE slug = 'local-seo-kent-guide';
