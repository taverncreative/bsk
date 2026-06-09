-- ============================================================
-- fix-sittingbourne-eurolink-headings.sql
-- Fix two solution-card headings that named the Eurolink industrial
-- estate as if it were the town ("for Eurolink businesses"), which
-- parsed as though Eurolink were the locality (parallel to the page's
-- "Websites for Sittingbourne, properly done." heading).
--
-- Eurolink is a real Sittingbourne/Swale industrial estate and is good
-- local-SEO signal, so it is kept and paired with the town, matching the
-- pattern the other (correct) Eurolink titles already use, for example
-- "for Eurolink and Sittingbourne industrial businesses".
--
-- Only the two bare "for Eurolink businesses" card titles were affected.
-- All other Eurolink references (body copy, pain points, FAQs, and the
-- six already-qualified solution titles) are correct and untouched.
--
-- Already executed against production via service-role REST PATCH on
-- 2026-06-03. This file is the version-controlled record and the Vercel
-- rebuild trigger so the SSG service x town pages re-render.
--
-- Safe to re-run: jsonb_set on a fixed array index is idempotent.
-- ============================================================

-- web-design x sittingbourne, solutions[2].title
UPDATE public.local_content
SET solutions = jsonb_set(
  solutions,
  '{2,title}',
  '"Trade and industrial web presence for Eurolink and Sittingbourne businesses"'
)
WHERE service_slug = 'web-design' AND town_slug = 'sittingbourne';

-- ai-automation x sittingbourne, solutions[1].title
UPDATE public.local_content
SET solutions = jsonb_set(
  solutions,
  '{1,title}',
  '"AI-powered operational workflows for Eurolink and Sittingbourne businesses"'
)
WHERE service_slug = 'ai-automation' AND town_slug = 'sittingbourne';
