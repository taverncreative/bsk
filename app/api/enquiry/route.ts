import { NextResponse } from 'next/server';
import { sendEmail, sendErrorAlert } from '@/lib/email';

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

    await sendEmail(
      `New Enquiry from ${name}`,
      `New Enquiry / Message\n\nName: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nWebsite: ${website || 'N/A'}\nService Required: ${service_required || 'N/A'}\nPreferred Day: ${preferred_day || 'N/A'}\nPreferred Time: ${preferred_time || 'N/A'}\n\nMessage:\n${message || 'N/A'}`
    );

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
