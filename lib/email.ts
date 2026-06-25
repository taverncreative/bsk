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

// ── Brand tokens (kept in sync with app/globals.css :root) ───────────────────
// Email clients can't read CSS variables, so the exact hexes are inlined here.
const BRAND = {
  gold: '#b8893d',      // --brand-gold
  ink: '#0d1b2a',       // --ink
  inkMuted: '#4a5868',  // --ink-muted
  inkFaint: '#7b8593',  // --ink-faint
  paper: '#f1f0ec',     // --paper (page background)
  card: '#ffffff',
  border: '#e2dfd6',    // ≈ --paper-border (10% ink on paper), solid hex for client support
} as const;

// Web-safe stack — the site's display font isn't available in mail clients, so
// fall back to a system sans everywhere (consistent in Gmail/Outlook/Apple Mail).
const FONT = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

/**
 * Send a notification email to the admin inbox via Resend.
 *
 * Pass `html` to send a multipart message (text/html + text/plain). Including
 * both parts means the message degrades gracefully and is less likely to trip
 * spam filters than HTML-only. Text-only callers (error alerts, other forms)
 * simply omit `html` and are unaffected.
 *
 * No-ops with a warning if RESEND_API_KEY is not configured, so form
 * submissions never hard-fail on a missing key.
 */
export async function sendEmail(subject: string, text: string, html?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[RESEND] RESEND_API_KEY is not set. Email not sent.');
    console.log(`[EMAIL FALLBACK] Subject: ${subject}\n${text}`);
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
        text,
        ...(html ? { html } : {}),
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
 * previous Web3Forms helper so callers are unchanged. Plain text by design.
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

// ── Branded lead email ───────────────────────────────────────────────────────

export interface EnquiryFields {
  name?: string;
  email?: string;
  website?: string;
  service_required?: string;
  preferred_day?: string;
  preferred_time?: string;
  message?: string;
}

/** True when a field has no usable value (empty, whitespace, or a literal "N/A"). */
function isBlank(v?: string | null): boolean {
  if (v == null) return true;
  const t = String(v).trim();
  return t === '' || t.toLowerCase() === 'n/a';
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type FieldKind = 'text' | 'email' | 'multiline';
interface Row {
  label: string;
  value: string;
  kind: FieldKind;
}

/** A single label/value block. Blank values are dropped upstream, so no empty rows. */
function htmlRow(row: Row, isLast: boolean): string {
  const safe = escapeHtml(row.value);
  let valueHtml: string;
  if (row.kind === 'email') {
    valueHtml = `<a href="mailto:${encodeURI(row.value)}" style="color:${BRAND.gold};text-decoration:none;font-weight:bold;">${safe}</a>`;
  } else if (row.kind === 'multiline') {
    valueHtml = safe.replace(/\r?\n/g, '<br />');
  } else {
    valueHtml = safe;
  }

  const border = isLast ? '' : `border-bottom:1px solid ${BRAND.border};`;
  return `
              <tr>
                <td style="padding:14px 28px;${border}">
                  <p style="margin:0 0 4px;font-family:${FONT};font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.inkFaint};">${escapeHtml(row.label)}</p>
                  <p style="margin:0;font-family:${FONT};font-size:16px;line-height:1.5;color:${BRAND.ink};">${valueHtml}</p>
                </td>
              </tr>`;
}

/**
 * Build the branded lead-notification email (subject + plain-text + HTML) from
 * a contact-form submission. Blank fields are omitted entirely so the message
 * never shows broken empty rows; the Email field renders as a one-tap mailto.
 */
export function renderLeadEmail(fields: EnquiryFields): {
  subject: string;
  text: string;
  html: string;
} {
  const name = isBlank(fields.name) ? '' : String(fields.name).trim();
  const service = isBlank(fields.service_required) ? '' : String(fields.service_required).trim();

  // Subject: "New enquiry: [name] — [service]", gracefully dropping missing parts.
  //   both → "New enquiry: John Doe — SEO & Rankings"
  //   name → "New enquiry: John Doe"
  //   svc  → "New enquiry — SEO & Rankings"
  //   none → "New enquiry"
  let subject = 'New enquiry';
  if (name) subject += `: ${name}`;
  if (service) subject += ` — ${service}`;

  const candidates: Row[] = [
    { label: 'Name', value: fields.name ?? '', kind: 'text' },
    { label: 'Email', value: fields.email ?? '', kind: 'email' },
    { label: 'Website', value: fields.website ?? '', kind: 'text' },
    { label: 'Service Required', value: fields.service_required ?? '', kind: 'text' },
    { label: 'Preferred Day', value: fields.preferred_day ?? '', kind: 'text' },
    { label: 'Preferred Time', value: fields.preferred_time ?? '', kind: 'text' },
    { label: 'Message', value: fields.message ?? '', kind: 'multiline' },
  ];
  const rows = candidates
    .filter((r) => !isBlank(r.value))
    .map((r) => ({ ...r, value: String(r.value).trim() }));

  // ── Plain-text version (mirrors the rows, omits blanks) ──
  const textLines = ['New enquiry', '==========='];
  for (const r of rows) {
    if (r.kind === 'multiline') {
      textLines.push('', `${r.label}:`, r.value);
    } else {
      textLines.push(`${r.label}: ${r.value}`);
    }
  }
  textLines.push('', '—', 'Submitted via the contact form on businesssortedkent.co.uk');
  const text = textLines.join('\n');

  // ── HTML version ──
  const preheader = `New enquiry${name ? ` from ${name}` : ''}${service ? ` — ${service}` : ''}`;
  const rowsHtml = rows.map((r, i) => htmlRow(r, i === rows.length - 1)).join('');

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.paper};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${BRAND.paper};opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.paper};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${BRAND.card};border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
          <!-- Gold accent bar -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background-color:${BRAND.gold};">&nbsp;</td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding:28px 28px 20px 28px;border-bottom:1px solid ${BRAND.border};">
              <p style="margin:0 0 6px;font-family:${FONT};font-size:11px;line-height:1.4;letter-spacing:0.12em;text-transform:uppercase;color:${BRAND.gold};font-weight:bold;">New enquiry</p>
              <h1 style="margin:0;font-family:${FONT};font-size:22px;line-height:1.3;color:${BRAND.ink};font-weight:bold;">Business Sorted Kent</h1>
            </td>
          </tr>
          <!-- Field rows -->${rowsHtml}
          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px 24px 28px;border-top:1px solid ${BRAND.border};">
              <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.5;color:${BRAND.inkFaint};">Submitted via the contact form on <span style="color:${BRAND.inkMuted};">businesssortedkent.co.uk</span></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
