import { NextResponse } from 'next/server';
import { sendEmail, sendErrorAlert } from '@/lib/email';

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, email, phone, website, date, time, notes } = body;

    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : 'N/A';

    await sendEmail(
      `New Consultation Request: ${name} at ${time} on ${formattedDate}`,
      `New Consultation Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nWebsite: ${website || 'N/A'}\nRequested Date: ${formattedDate}\nRequested Time: ${time || 'N/A'}\nNotes: ${notes || 'None'}`
    );

    return NextResponse.json({ success: true });
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
