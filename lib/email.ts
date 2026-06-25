// Email delivery via Resend (https://resend.com).
//
// Replaces the old Web3Forms + Supabase lead pipeline. Form submissions are
// now emailed straight to the inbox — there is no database.
//
// Requires:
//   RESEND_API_KEY  — from the Resend dashboard
//   RESEND_FROM     — sender, MUST be on a Resend-verified domain (taverncreative.com).
//                     Optional; defaults below.
//   LEADS_EMAIL     — where enquiries are delivered. Optional; defaults below.

const RESEND_URL = 'https://api.resend.com/emails';

// Where leads land. Can be any address (no domain verification needed for "to").
const ADMIN_EMAIL = process.env.LEADS_EMAIL || 'hello@businesssortedkent.co.uk';

// Sender. The DOMAIN must be verified in Resend — taverncreative.com is, so the
// from-address lives there even though the brand is Business Sorted Kent. The
// local part (bsk@) does not need to be a real mailbox to send.
const FROM = process.env.RESEND_FROM || 'Business Sorted Kent <bsk@taverncreative.com>';

/**
 * Send a plain-text notification email to the admin inbox via Resend.
 * No-ops with a warning if RESEND_API_KEY is not configured, so form
 * submissions never hard-fail on a missing key.
 */
export async function sendEmail(subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[RESEND] RESEND_API_KEY is not set. Email not sent.');
    console.log(`[EMAIL FALLBACK] Subject: ${subject}\n${body}`);
    return;
  }

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[RESEND] Failed to send email:', res.status, detail);
    }
  } catch (err) {
    console.error('[RESEND] Network error:', err);
  }
}

/**
 * Send a form-error alert email to the admin inbox. Same signature as the
 * previous Web3Forms helper so callers are unchanged.
 */
export async function sendErrorAlert(
  formType: string,
  pageUrl: string,
  userEmail: string,
  submissionData: any,
  errorMessage: string
) {
  const message = `FORM ERROR ALERT

Form Type: ${formType}
Page URL: ${pageUrl || 'N/A'}
User Email: ${userEmail || 'N/A'}
Error: ${errorMessage}

Submission:
${JSON.stringify(submissionData, null, 2)}`;

  await sendEmail(`BSK Form Error: ${formType}`, message);
}
