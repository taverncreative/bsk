import { NextResponse } from 'next/server';
import { sendEmail, sendErrorAlert, renderLeadEmail } from '@/lib/email';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, website, service_required, preferred_day, preferred_time, message, hp_website } = body;

    // Honeypot: real users never fill the hidden hp_website field. Silently accept and drop.
    if (typeof hp_website === 'string' && hp_website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const { subject, text, html } = renderLeadEmail({
      name,
      email,
      website,
      service_required,
      preferred_day,
      preferred_time,
      message,
    });
    await sendEmail(subject, text, html);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling enquiry:', error);
    sendErrorAlert(
      'General Enquiry',
      'Primary Enquiry Form',
      bodyContext?.email || 'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/enquiry'
    ).catch(console.error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
