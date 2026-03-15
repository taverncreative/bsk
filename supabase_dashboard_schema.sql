-- 1. Create Users Table (extends auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  role text DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  full_name text,
  email text,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- 2. Create Clients Table
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  website_url text,
  monthly_hours int DEFAULT 5,
  hourly_rate numeric DEFAULT 50.00,
  created_at timestamptz DEFAULT now()
);

-- 3. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name text,
  website_url text,
  industry text,
  location text,
  email text,
  source text,
  stage text DEFAULT 'New Lead',
  notes text,
  follow_up_date date,
  created_at timestamptz DEFAULT now()
);

-- 4. Create Tickets Table
CREATE TABLE IF NOT EXISTS public.tickets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  ticket_type text,
  priority text,
  status text DEFAULT 'Submitted',
  page_url text,
  created_at timestamptz DEFAULT now()
);

-- 5. Create Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  report_month date NOT NULL,
  organic_traffic int DEFAULT 0,
  leads_generated int DEFAULT 0,
  tasks_completed int DEFAULT 0,
  hours_spent numeric DEFAULT 0,
  profit numeric DEFAULT 0,
  seo_growth numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 6. Create Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number text,
  amount numeric NOT NULL,
  status text DEFAULT 'Unpaid',
  due_date date,
  file_url text,
  created_at timestamptz DEFAULT now()
);

-- 7. Create Client Improvements Table
CREATE TABLE IF NOT EXISTS public.client_improvements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  date_implemented date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- 8. Create Client Pricing History Table
CREATE TABLE IF NOT EXISTS public.client_pricing_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  previous_hours int,
  new_hours int,
  previous_rate numeric,
  new_rate numeric,
  effective_date date,
  created_at timestamptz DEFAULT now()
);

-- 9. Create Elle Logs Table
CREATE TABLE IF NOT EXISTS public.elle_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  intent text,
  issues_detected text,
  lead_converted boolean DEFAULT false,
  transcript text,
  created_at timestamptz DEFAULT now()
);

-- ENABLE RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_improvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_pricing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elle_logs ENABLE ROW LEVEL SECURITY;

-- ADMIN CHECK FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES

-- Profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (id = auth.uid() OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid() OR public.is_admin());

-- Clients
CREATE POLICY "Clients view own record" ON public.clients FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Clients update own record" ON public.clients FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());

-- Leads (Admin Only)
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL USING (public.is_admin());

-- Tickets
CREATE POLICY "Clients view own tickets" ON public.tickets FOR SELECT USING (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);
CREATE POLICY "Clients insert own tickets" ON public.tickets FOR INSERT WITH CHECK (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);

-- Reports
CREATE POLICY "Clients view own reports" ON public.reports FOR SELECT USING (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);

-- Invoices
CREATE POLICY "Clients view own invoices" ON public.invoices FOR SELECT USING (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);

-- Improvements
CREATE POLICY "Clients view own improvements" ON public.client_improvements FOR SELECT USING (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);

-- Pricing History
CREATE POLICY "Clients view own pricing history" ON public.client_pricing_history FOR SELECT USING (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);
CREATE POLICY "Clients insert own pricing history" ON public.client_pricing_history FOR INSERT WITH CHECK (
  client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid()) OR public.is_admin()
);

-- Elle Logs (Admin only, mostly inserted by Service Role)
CREATE POLICY "Admins view elle logs" ON public.elle_logs FOR SELECT USING (public.is_admin());
