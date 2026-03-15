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
    const { name, email, service_required, preferred_day, preferred_time, message } = body;

    // 1. Insert into Supabase
    const { data: enquiry, error: insertError } = await supabase
      .from('enquiries')
      .insert([{ name, email, service_required, preferred_day, preferred_time, message }])
      .select()
      .single();

    if (insertError) {
      console.error('Enquiry Error:', insertError);
      return NextResponse.json({ error: 'Failed to submit enquiry. Please try again.' }, { status: 400 });
    }

    // 2. Send email to Admin
    const adminEmailHTML = `
      <h2>New Enquiry / Message</h2>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Service Required:</strong> ${service_required || 'N/A'}</p>
      <p><strong>Preferred Day:</strong> ${preferred_day || 'N/A'}</p>
      <p><strong>Preferred Time:</strong> ${preferred_time || 'N/A'}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
    `;
    await sendEmail('hello@businesssortedkent.co.uk', `New Enquiry from ${name}`, adminEmailHTML);

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error('Error handling enquiry:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
