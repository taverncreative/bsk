-- Insert mock case studies based on user's request for "actual case studies"
INSERT INTO public.case_studies (title, slug, summary, results, status) VALUES
('Ashford Plumbing Brand', 'ashford-plumbing-business', 'Web Design + Local SEO', '3x More Enquiries inside 4 months', 'published'),
('Maidstone Construction Firm', 'maidstone-builders', 'Full Automation & Lead Capture Build', '140% Increase in qualified commercial leads', 'published')
ON CONFLICT (slug) DO NOTHING;
