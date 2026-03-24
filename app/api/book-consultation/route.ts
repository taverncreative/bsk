import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail, sendErrorAlert } from '@/lib/web3forms';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, phone, website, date, time, notes, pageUrl } = body;

    // 1. Insert into Supabase (Bookings & Unified Leads)
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert([{
        booking_date: date,
        booking_time: time + ':00',
        name,
        email,
        phone: phone || null,
        website_url: website || null,
        notes
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Booking Error:', insertError);

      sendErrorAlert(
        'Booking Calendar',
        pageUrl || 'Unknown',
        email || 'Unknown',
        body,
        `Booking insert failed: ${insertError.message}`
      ).catch(console.error);

      return NextResponse.json({ error: 'This slot might be already booked, or we encountered a database issue. Our team has been notified.' }, { status: 400 });
    }

    await supabase.from('unified_leads').insert({
      name,
      email,
      phone: null,
      website_url: website || null,
      message: `Booking on ${date} at ${time}. Notes: ${notes || 'None'}`,
      page_context: 'Booking Calendar',
      submission_type: 'Booking Calendar'
    });

    // 2. Send admin notification
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    await sendEmail(
      `New Booking: ${name} at ${time} on ${formattedDate}`,
      `New Consultation Booking\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nDate: ${formattedDate}\nTime: ${time}\nNotes: ${notes || 'None'}\n\nView in Dashboard: https://businesssortedkent.co.uk/admin-dashboard`
    );

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    console.error('Error handling booking:', error);
    sendErrorAlert(
      'Booking Calendar',
      bodyContext?.pageUrl || 'Unknown',
      bodyContext?.email || 'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/book-consultation'
    ).catch(console.error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
