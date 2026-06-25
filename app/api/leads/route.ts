import { NextResponse } from 'next/server';
import { sendEmail, sendErrorAlert } from '@/lib/email';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, phone, website_url, message, page_context, submission_type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    await sendEmail(
      `New Lead: ${name} (${submission_type || 'General Enquiry'})`,
      `New Lead Submission (${submission_type || 'General Enquiry'})\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nWebsite: ${website_url || 'N/A'}\nSource: ${page_context || 'N/A'}\n\nMessage:\n${message || 'N/A'}`
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error handling lead submission:', error);
    sendErrorAlert(
      bodyContext?.submission_type || 'Unknown Form Submission',
      bodyContext?.page_context || 'Unknown',
      bodyContext?.email || 'Unknown',
      bodyContext || {},
      error?.message || 'Server Exception in /api/leads'
    ).catch(console.error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
