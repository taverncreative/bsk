-- ==========================================
-- 1. Insert Services
-- ==========================================
INSERT INTO public.services (id, name, slug, description) VALUES
('b1a0e8d0-9a2c-4f1b-8e2a-1c3b5d7e9f1a', 'Web Design', 'web-design', 'Bespoke, high-speed websites tailored for SMEs.'),
('c2b1f9e1-0b3d-5a2c-9f3b-2d4c6e8f0a2b', 'SEO', 'seo', 'Dominate local Google rankings and capture high-intent searches.'),
('d3c2a0f2-1c4e-4a3d-0b4c-3e5d7f9a1b3c', 'Business Automation', 'business-automation', 'Streamline your enquiries with automated invoicing and CRM links.'),
('e4d3b1a3-2d5f-4f4e-1a5d-4f6e8a0b2c4d', 'Branding', 'branding', 'Look the part. Complete brand revamps including logo and print design.'),
('f5e4c2a4-3e6a-4f5f-2c6e-5a7f9b1c3d5e', 'Digital Marketing', 'digital-marketing', 'Comprehensive social media and ongoing growth strategies.')
ON CONFLICT (slug) DO NOTHING;


-- ==========================================
-- 2. Insert Towns
-- ==========================================
INSERT INTO public.towns (id, name, slug, county, population, latitude, longitude, intro) VALUES
('aa111111-1111-1111-1111-111111111111', 'Ashford', 'ashford', 'Kent', '74,204', 51.1449, 0.8753, 'As one of Kent''s fastest-growing business hubs with the expanding Designer Outlet and excellent transport links, Ashford is home to a thriving SME community. We help local trades and professionals stand out in this competitive market.'),
('bb222222-2222-2222-2222-222222222222', 'Canterbury', 'canterbury', 'Kent', '55,240', 51.2802, 1.0789, 'A historic city with a massive student and tourist economy, Canterbury demands online visibility. We partner with local hospitality, retail, and service businesses to capture high commercial intent from both locals and visitors.'),
('cc333333-3333-3333-3333-333333333333', 'Maidstone', 'maidstone', 'Kent', '113,137', 51.2721, 0.5294, 'As the county town of Kent, Maidstone represents a critical battleground for local business. With a dense population of professional services, securing top Google rankings here is essential for long-term growth.'),
('dd444444-4444-4444-4444-444444444444', 'Folkestone', 'folkestone', 'Kent', '51,337', 51.0805, 1.1663, 'Folkestone''s revitalization and bustling Creative Quarter make it an exciting place to do business. We help local companies match this physical energy with a powerful, modern online presence that drives enquiries.'),
('ee555555-5555-5555-5555-555555555555', 'Tunbridge Wells', 'tunbridge-wells', 'Kent', '59,947', 51.1324, 0.2637, 'Serving an affluent local demographic, trades and services in Tunbridge Wells require premium branding and highly targeted local SEO to reassure high-end clientele.')
ON CONFLICT (slug) DO NOTHING;


-- ==========================================
-- 3. Insert Industries
-- ==========================================
INSERT INTO public.industries (id, name, slug, pain_point, description) VALUES
('11aaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Plumbers', 'plumbers', 'Losing emergency callouts to competitors on Google Maps.', 'Reliable plumbing services operating across Kent.'),
('22bbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Electricians', 'electricians', 'Relying too heavily on word-of-mouth rather than consistent online leads.', 'Professional electrical contractors and sparkies.'),
('33cccccc-cccc-cccc-cccc-cccccccccccc', 'Builders', 'builders', 'Tired of quoting for low-budget jobs; need to attract high-value extensions.', 'Construction companies, extensions, and renovations.'),
('44dddddd-dddd-dddd-dddd-dddddddddddd', 'Accountants', 'accountants', 'Struggling to stand out among dozens of local financial firms.', 'Tax experts, bookkeeping, and SME financial services.'),
('55eeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Solicitors', 'solicitors', 'Need to establish immense trust instantly online.', 'Legal professionals, family law, and conveyancing services.')
ON CONFLICT (slug) DO NOTHING;


-- ==========================================
-- 4. Insert Local Intros (The Programmatic Glue)
-- ==========================================
-- Note: Uses the exact UUIDs generated above to establish the foreign key relationships.

INSERT INTO public.local_intros (service_id, town_id, content) VALUES
-- Web Design + Ashford
('b1a0e8d0-9a2c-4f1b-8e2a-1c3b5d7e9f1a', 'aa111111-1111-1111-1111-111111111111', 'Ashford is expanding rapidly, with major commercial developments and housing projects drawing more attention to the town than ever before. For local SMEs, relying solely on foot traffic or word-of-mouth is no longer enough. At Business Sorted Kent, our headquarters are right here in town. We design bespoke, high-performance websites specifically engineered to help Ashford trades, retailers, and professional services stand out from the competition, load instantly on mobile devices, and convert casual local browsers into paying customers.'),

-- SEO + Ashford
('c2b1f9e1-0b3d-5a2c-9f3b-2d4c6e8f0a2b', 'aa111111-1111-1111-1111-111111111111', 'When someone in Ashford needs a local service, they immediately reach for their phone to search Google. If your business isn''t appearing in the top three map results or on page one, those valuable enquiries are going straight to your competitors. As a locally-based agency, Business Sorted Kent provides aggressive, targeted SEO campaigns designed specifically for the Ashford market. We fix technical errors, optimise your Google Business Profile, and build the local authority required to make the phone ring consistently.'),

-- Web Design + Canterbury
('b1a0e8d0-9a2c-4f1b-8e2a-1c3b5d7e9f1a', 'bb222222-2222-2222-2222-222222222222', 'Canterbury presents a unique challenge for local businesses: balancing the massive student population, a booming tourist economy, and the needs of established local residents. Your digital storefront must cater to all three. Business Sorted Kent builds fast, responsive websites tailored to Canterbury businesses. Whether you run a popular café near the Cathedral or a reliable plumbing service covering the surrounding villages, our designs are focused entirely on user experience and driving highly-qualified local leads through your door.'),

-- SEO + Canterbury
('c2b1f9e1-0b3d-5a2c-9f3b-2d4c6e8f0a2b', 'bb222222-2222-2222-2222-222222222222', 'The competition for search visibility in Canterbury is notoriously tough, especially given the dense concentration of businesses operating within the city walls. Relying on an outdated website or an unmanaged Google profile guarantees you will remain invisible to high-intent searchers. Our specialized Canterbury SEO strategies are built to cut through the noise. We implement advanced on-page optimisation, build dominant local citations, and create compelling content that forces Google to recognize your business as the premier authority in your sector.')
ON CONFLICT (service_id, town_id) DO NOTHING;
