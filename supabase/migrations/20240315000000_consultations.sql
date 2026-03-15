-- Consultation System Schema

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(booking_date, booking_time) -- Prevent double booking
);

-- Slot overrides for Admin (manage availability dynamically)
CREATE TABLE IF NOT EXISTS public.slot_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    override_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT true, -- true = extra slots, false = blocked slots
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enquiries table (for fallback form and secondary contact options)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service_required TEXT,
    preferred_day TEXT,
    preferred_time TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS Policies
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slot_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts to bookings and enquiries
CREATE POLICY "Allow anonymous inserts to bookings" ON public.bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts to enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Allow anonymous reads for availability computation
CREATE POLICY "Allow anonymous read bookings" ON public.bookings
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read overrides" ON public.slot_overrides
    FOR SELECT USING (true);
