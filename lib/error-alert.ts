export async function sendFormErrorAlert(
  formType: string,
  pageUrl: string,
  userEmail: string,
  submissionData: any,
  errorMessage: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set. Error alert not sent.');
    return;
  }

  const html = `
    <h2>Booking / Form System Error – Immediate Attention Required</h2>
    <p>A form submission failed silently and requires your attention.</p>
    <hr/>
    <p><strong>Form Type:</strong> ${formType}</p>
    <p><strong>Page URL:</strong> ${pageUrl || 'N/A'}</p>
    <p><strong>User Email:</strong> ${userEmail || 'N/A'}</p>
    <p><strong>Error Message:</strong> ${errorMessage}</p>
    <hr/>
    <h3>Submission Data:</h3>
    <pre style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify(submissionData, null, 2)}</pre>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Business Sorted Kent <hello@businesssortedkent.co.uk>',
        to: 'hello@businesssortedkent.co.uk',
        subject: 'BSK Form Submission Failed',
        html,
      }),
    });

    if (!res.ok) {
      console.error('Failed to send error alert with Resend:', await res.text());
    }
  } catch (err) {
    console.error('Failed to dispatch error alert:', err);
  }
}
