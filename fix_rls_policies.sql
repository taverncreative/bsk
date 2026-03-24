-- ============================================================
-- FIX: RLS Policies for Admin Dashboard
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================================

-- 1. Fix is_admin() to check JWT app_metadata instead of profiles table
-- This aligns with how middleware.ts checks admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 2. Add package_name column to clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS package_name TEXT;

-- ============================================================
-- 3. Fix leads table policies
-- ============================================================
DROP POLICY IF EXISTS "Admins manage leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated full access on leads" ON leads;

CREATE POLICY "Admins manage leads" ON leads
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 4. Fix clients table policies
-- ============================================================
DROP POLICY IF EXISTS "Clients view own record" ON clients;
DROP POLICY IF EXISTS "Clients update own record" ON clients;
DROP POLICY IF EXISTS "Allow authenticated full access on clients" ON clients;

-- Admin full access
CREATE POLICY "Admins manage clients" ON clients
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 5. Fix invoices table policies
-- ============================================================
DROP POLICY IF EXISTS "Clients view own invoices" ON invoices;
DROP POLICY IF EXISTS "Allow authenticated full access on invoices" ON invoices;

CREATE POLICY "Admins manage invoices" ON invoices
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 6. Fix activity_log table policies
-- ============================================================
DROP POLICY IF EXISTS "Allow authenticated full access on activity_log" ON activity_log;

CREATE POLICY "Admins manage activity_log" ON activity_log
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 7. Fix templates table policies
-- ============================================================
DROP POLICY IF EXISTS "Allow authenticated full access on templates" ON templates;

CREATE POLICY "Admins manage templates" ON templates
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 8. Fix unified_leads table (used by lead inbox & form submissions)
-- ============================================================
ALTER TABLE IF EXISTS unified_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts on unified_leads" ON unified_leads;
DROP POLICY IF EXISTS "Allow authenticated reads on unified_leads" ON unified_leads;
DROP POLICY IF EXISTS "Admins manage unified_leads" ON unified_leads;
DROP POLICY IF EXISTS "Anyone can insert unified_leads" ON unified_leads;

-- Anyone can submit a lead (public forms)
CREATE POLICY "Anyone can insert unified_leads" ON unified_leads
  FOR INSERT WITH CHECK (true);

-- Admin can do everything
CREATE POLICY "Admins manage unified_leads" ON unified_leads
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 9. Fix discovery_submissions table
-- ============================================================
DROP POLICY IF EXISTS "Allow anonymous inserts" ON discovery_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON discovery_submissions;
DROP POLICY IF EXISTS "Admins manage discovery_submissions" ON discovery_submissions;
DROP POLICY IF EXISTS "Anyone can insert discovery submissions" ON discovery_submissions;

-- Anyone can submit (public discovery forms)
CREATE POLICY "Anyone can insert discovery submissions" ON discovery_submissions
  FOR INSERT WITH CHECK (true);

-- Admin full access
CREATE POLICY "Admins manage discovery_submissions" ON discovery_submissions
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 10. Fix bookings table
-- ============================================================
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public') THEN
    ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins manage bookings" ON bookings;
    DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
    CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
    CREATE POLICY "Admins manage bookings" ON bookings FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

-- ============================================================
-- 11. Fix elle_chat_logs table
-- ============================================================
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'elle_chat_logs' AND table_schema = 'public') THEN
    ALTER TABLE elle_chat_logs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Admins view elle chat logs" ON elle_chat_logs;
    DROP POLICY IF EXISTS "Service role inserts elle chat logs" ON elle_chat_logs;
    DROP POLICY IF EXISTS "Admins manage elle_chat_logs" ON elle_chat_logs;
    DROP POLICY IF EXISTS "Anyone can insert elle_chat_logs" ON elle_chat_logs;
    CREATE POLICY "Anyone can insert elle_chat_logs" ON elle_chat_logs FOR INSERT WITH CHECK (true);
    CREATE POLICY "Admins manage elle_chat_logs" ON elle_chat_logs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
  END IF;
END $$;

-- ============================================================
-- 12. Fix reports table
-- ============================================================
DROP POLICY IF EXISTS "Clients view own reports" ON reports;
DROP POLICY IF EXISTS "Admins manage reports" ON reports;

CREATE POLICY "Admins manage reports" ON reports
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 13. Fix profiles table
-- ============================================================
DROP POLICY IF EXISTS "Users view own profile" ON profiles;
DROP POLICY IF EXISTS "Users update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins manage profiles" ON profiles;

CREATE POLICY "Admins manage profiles" ON profiles
  FOR ALL USING (public.is_admin() OR id = auth.uid())
  WITH CHECK (public.is_admin() OR id = auth.uid());

-- ============================================================
-- 14. Fix tickets table
-- ============================================================
DROP POLICY IF EXISTS "Clients view own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients insert own tickets" ON tickets;
DROP POLICY IF EXISTS "Admins manage tickets" ON tickets;

CREATE POLICY "Admins manage tickets" ON tickets
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- 15. Fix elle_logs table
-- ============================================================
DROP POLICY IF EXISTS "Admins view elle logs" ON elle_logs;
DROP POLICY IF EXISTS "Admins manage elle_logs" ON elle_logs;

CREATE POLICY "Admins manage elle_logs" ON elle_logs
  FOR ALL USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================
-- DONE! All tables now use the fixed is_admin() function
-- which checks JWT app_metadata.role = 'admin'
-- ============================================================
