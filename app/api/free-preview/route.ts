import { NextResponse } from 'next/server';

interface FreePreviewPayload {
  businessName?: string;
  whatYouDo?: string;
  currentUrl?: string;
  email?: string;
  specifics?: string;
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

  if (!businessName || !whatYouDo || !email) {
    return NextResponse.json(
      { error: 'Business name, what you do and email are required.' },
      { status: 400 }
    );
  }

  // TODO: wire to Supabase (free_preview_submissions table) and/or Resend email to hello@.
  // For now: log so the user can see incoming submissions during dev/staging.
  console.log('[free-preview]', {
    receivedAt: new Date().toISOString(),
    businessName,
    whatYouDo,
    currentUrl,
    email,
    specifics,
  });

  return NextResponse.json({ ok: true });
}
