import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

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

  // Persist to unified_leads so this submission surfaces in the admin lead inbox
  // alongside contact-form and website-review submissions. Service-role client
  // bypasses RLS as established by the earlier /api/enquiry work.
  const messageBody = [
    `Business does: ${whatYouDo}`,
    `Current site: ${currentUrl || 'N/A'}`,
    `Specifics: ${specifics || 'N/A'}`,
  ].join('\n');

  const { error: insertError } = await supabaseServer
    .from('unified_leads')
    .insert([
      {
        name: businessName,
        email,
        phone: null,
        website_url: currentUrl || null,
        message: messageBody,
        page_context: 'Free Preview Form',
        submission_type: 'Free Preview',
      },
    ]);

  if (insertError) {
    console.error('[free-preview] unified_leads insert failed:', insertError);
    return NextResponse.json(
      { error: 'Failed to record submission. Please try again.' },
      { status: 500 }
    );
  }

  // Email delivery is handled by the parallel client-side Web3Forms call in
  // FreePreviewForm — same pattern as SecondaryContactForm and WebsiteReviewTool.
  // No server-side email call here: Vercel-IP outbound to api.web3forms.com
  // can hit Cloudflare bot-protection challenges.

  return NextResponse.json({ ok: true });
}
