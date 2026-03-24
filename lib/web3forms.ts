const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ADMIN_EMAIL = 'hello@businesssortedkent.co.uk';

/**
 * Send an email notification via Web3Forms API.
 * Requires WEB3FORMS_ACCESS_KEY in environment variables.
 * Get your free access key at https://web3forms.com
 */
export async function sendEmail(subject: string, html: string) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn('[WEB3FORMS] WEB3FORMS_ACCESS_KEY is not set. Email not sent.');
    console.log(`[EMAIL FALLBACK] Subject: ${subject}`);
    return;
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: 'Business Sorted Kent',
        to: ADMIN_EMAIL,
        message: html,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      console.error('[WEB3FORMS] Failed to send email:', data.message);
    }
  } catch (err) {
    console.error('[WEB3FORMS] Network error:', err);
  }
}

/**
 * Send an error alert email via Web3Forms
 */
export async function sendErrorAlert(
  formType: string,
  pageUrl: string,
  userEmail: string,
  submissionData: any,
  errorMessage: string
) {
  const message = `
FORM ERROR ALERT

Form Type: ${formType}
Page URL: ${pageUrl || 'N/A'}
User Email: ${userEmail || 'N/A'}
Error: ${errorMessage}

Submission Data:
${JSON.stringify(submissionData, null, 2)}
  `.trim();

  await sendEmail(`BSK Form Error: ${formType}`, message);
}
