import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to send email via Resend
const sendEmail = async (to: string, subject: string, html: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Emails will not be sent.');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Business Sorted Kent <hello@businesssortedkent.co.uk>',
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      console.error('Failed to send email with Resend:', await res.text());
    }
  } catch (err) {
    console.error('Resend error:', err);
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, date, time, notes } = body;

    // 1. Insert into Supabase (Bookings & Unified Leads)
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert([{ booking_date: date, booking_time: time + ':00', name, email, notes }])
      .select()
      .single();

    if (insertError) {
      console.error('Booking Error:', insertError);
      return NextResponse.json({ error: 'This slot might be already booked or an error occurred. Please try again or select another time.' }, { status: 400 });
    }

    await supabase.from('unified_leads').insert({
      name,
      email,
      phone: null,
      website_url: null,
      message: `Booking on ${date} at ${time}. Notes: ${notes}`,
      page_context: 'Booking Calendar',
      submission_type: 'Booking Calendar'
    });

    // 2. Send emails
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    // To Admin
    const adminEmailHTML = `
      <h2>New Consultation Booking</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Notes:</strong> ${notes || 'None'}</p>
    `;
    await sendEmail('hello@businesssortedkent.co.uk', `New Booking: ${name} at ${time} on ${formattedDate}`, adminEmailHTML);

    // To Client
    const clientEmailHTML = `
      <h2>Your consultation with Business Sorted Kent is confirmed!</h2>
      <p>Hi ${name},</p>
      <p>Your 30-minute consultation has been scheduled for:</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>We'll meet via a Google Meet link which will be sent to you shortly before the call.</p>
      <p>Looking forward to speaking with you!</p>
      <p>Best regards,<br>Business Sorted Kent Team</p>
    `;
    await sendEmail(email, `Booking Confirmed: Consultation with Business Sorted Kent`, clientEmailHTML);

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Error handling booking:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
