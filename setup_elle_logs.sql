CREATE TABLE IF NOT EXISTS public.elle_chat_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id text,
  page_context text,
  visitor_message text,
  elle_response text,
  action_triggered text,
  visitor_ip text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.elle_chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view elle chat logs" ON public.elle_chat_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

CREATE POLICY "Anon insert elle chat logs" ON public.elle_chat_logs FOR INSERT WITH CHECK (true);
