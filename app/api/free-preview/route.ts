import { NextResponse } from 'next/server';
import { sendEmail, sendErrorAlert } from '@/lib/email';

interface FreePreviewPayload {
  businessName?: string;
  whatYouDo?: string;
  currentUrl?: string;
  email?: string;
  specifics?: string;
  hp_website?: string;
}

export async function POST(request: Request) {
  let payload: FreePreviewPayload = {};
  try {
    payload = (await request.json()) as FreePreviewPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const businessName = (payload.businessName || '').trim();
  const whatYouDo = (payload.whatYouDo || '').trim();
  const email = (payload.email || '').trim();
  const currentUrl = (payload.currentUrl || '').trim();
  const specifics = (payload.specifics || '').trim();
  const hpWebsite = (payload.hp_website || '').trim();

  // Honeypot: real users never fill the hidden hp_website field. Silently accept and drop.
  if (hpWebsite.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!businessName || !whatYouDo || !email) {
    return NextResponse.json(
      { error: 'Business name, what you do and email are required.' },
      { status: 400 }
    );
  }

  try {
    await sendEmail(
      `New Free Preview Request from ${businessName}`,
      `New Free Preview Request\n\nBusiness: ${businessName}\nEmail: ${email}\nBusiness does: ${whatYouDo}\nCurrent site: ${currentUrl || 'N/A'}\nSpecifics: ${specifics || 'N/A'}`
    );
  } catch (error: any) {
    sendErrorAlert(
      'Free Preview',
      'Free Preview Form',
      email,
      payload,
      error?.message || 'Server Exception in /api/free-preview'
    ).catch(console.error);
    return NextResponse.json({ error: 'Failed to record submission. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
