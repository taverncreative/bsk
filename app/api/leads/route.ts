import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to send email via Resend
const sendEmail = async (to: string, subject: string, html: string) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Using fallback console.log.');
    console.log(`[EMAIL DISPATCH: ${to}]\nSubject: ${subject}\nBody: ${html}`);
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
    const { name, email, phone, website_url, message, page_context, submission_type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // 1. Insert into unified_leads Supabase Table
    const { data: lead, error: insertError } = await supabase
      .from('unified_leads')
      .insert([{
         name, 
         email, 
         phone: phone || null, 
         website_url: website_url || null, 
         message: message || null, 
         page_context: page_context || 'Unknown', 
         submission_type: submission_type || 'General Enquiry' 
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Unified Lead Insert Error:', insertError);
      return NextResponse.json({ error: 'Failed to capture lead. Please try again or call us.' }, { status: 500 });
    }

    // 2. Send Email Notification to Admin
    const adminEmailHTML = `
      <h2>New Lead Submission (${submission_type || 'General Enquiry'})</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Website:</strong> ${website_url || 'N/A'}</p>
      <p><strong>Source/Context:</strong> ${page_context || 'N/A'}</p>
      <p><strong>Message/Notes:</strong></p>
      <blockquote><p>${(message || '').replace(/\n/g, '<br>')}</p></blockquote>
      <hr />
      <p><a href="https://businesssortedkent.co.uk/admin-dashboard/lead-inbox">View in Admin Dashboard</a></p>
    `;

    await sendEmail('hello@businesssortedkent.co.uk', `New Lead: ${name} (${submission_type})`, adminEmailHTML);

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
