import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { business_name, contact_name, email, phone, website_url, value, location, industry, notes } = body;

    if (!business_name?.trim()) {
      return NextResponse.json({ error: 'Business name is required.' }, { status: 400 });
    }

    const parsedValue = value ? parseFloat(value) : null;

    const { error: insertError } = await supabase
      .from('leads')
      .insert([{
        business_name: business_name.trim(),
        contact_name: contact_name || null,
        email: email || null,
        phone: phone || null,
        website_url: website_url || null,
        value: isNaN(parsedValue as number) ? null : parsedValue,
        location: location || null,
        industry: industry || null,
        notes: notes || null,
        stage: 'New Lead',
        source: 'Shared Link',
      }]);

    if (insertError) {
      console.error('Add Lead Insert Error:', insertError);
      return NextResponse.json({ error: 'Failed to add lead. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/add-lead:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
