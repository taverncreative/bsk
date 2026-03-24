/**
 * Client-side Web3Forms notification.
 * Call this from browser after a successful form submission to email the admin.
 */
const WEB3FORMS_KEY = '31fb5677-3e73-4a83-abc3-4c668ba876df';

export async function notifyAdmin(subject: string, fields: Record<string, string>) {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: 'Business Sorted Kent',
        ...fields,
      }),
    });

    const data = await res.json();
    if (!data.success) {
      console.error('[Web3Forms] Failed:', data.message);
    }
  } catch (err) {
    console.error('[Web3Forms] Error:', err);
  }
}
