-- ============================================================
-- update-hosting-price-18.sql
-- Updates the one production local_content row that mentions
-- the monthly hosting price, raising it from £15 to £18.
--
-- Already executed against production 2026-05-21 via service-role
-- REST PATCH. File exists for version control + parity with the
-- code changes (which update 4 files referencing the same price).
--
-- Safe to re-run: REPLACE is idempotent after the first run.
-- ============================================================

UPDATE public.local_content
SET intro_paragraph = REPLACE(intro_paragraph, '£15 a month', '£18 a month')
WHERE service_slug = 'web-design'
  AND town_slug    = 'gravesend'
  AND intro_paragraph LIKE '%£15 a month%';
