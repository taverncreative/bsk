-- Drop table if exists to recreate the expanded schema
DROP TABLE IF EXISTS public.elle_chat_logs CASCADE;

CREATE TABLE public.elle_chat_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  page_context text,
  detected_url text,
  visitor_message text,
  elle_response text,
  action_triggered text,
  problem_detected text DEFAULT 'unknown',
  lead_intent_score text DEFAULT 'cold',
  visitor_ip text,
  created_at timestamptz DEFAULT now()
);

-- Add indexes for fast querying on the admin dashboard
CREATE INDEX idx_elle_logs_session_id ON public.elle_chat_logs(session_id);
CREATE INDEX idx_elle_logs_page_context ON public.elle_chat_logs(page_context);
CREATE INDEX idx_elle_logs_created_at ON public.elle_chat_logs(created_at DESC);
CREATE INDEX idx_elle_logs_action ON public.elle_chat_logs(action_triggered);

ALTER TABLE public.elle_chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view elle chat logs" ON public.elle_chat_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Anon insert elle chat logs" ON public.elle_chat_logs FOR INSERT WITH CHECK (true);
