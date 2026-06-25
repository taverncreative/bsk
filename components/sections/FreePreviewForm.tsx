'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function FreePreviewForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      businessName: String(formData.get('businessName') || '').trim(),
      whatYouDo: String(formData.get('whatYouDo') || '').trim(),
      currentUrl: String(formData.get('currentUrl') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      specifics: String(formData.get('specifics') || '').trim(),
    };

    if (!payload.businessName || !payload.whatYouDo || !payload.email) {
      setError('Business name, what you do and email are required.');
      setSubmitting(false);
      return;
    }

    // Honeypot tripped — pretend success, drop submission.
    if (honeypot) {
      router.push('/free-preview/thanks');
      return;
    }

    try {
      // Submit to our API, which emails the request via Resend.
      const res = await fetch('/api/free-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, hp_website: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong sending that. Try again?');
      }

      router.push('/free-preview/thanks');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Try again?');
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-paper border border-paper-border rounded-md p-6 md:p-8"
      noValidate
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint mb-6">
        Tell us about your business
      </p>

      {/* Honeypot: hidden from humans, bots tend to fill every input. */}
      <input
        type="text"
        name="hp_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
      />

      <div className="space-y-5">
        <div>
          <label htmlFor="businessName" className="text-sm text-ink-muted mb-1.5">
            Business name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            className="w-full bg-paper border border-paper-border rounded-md px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink"
            placeholder="e.g. Ashford Pest Control"
          />
        </div>

        <div>
          <label htmlFor="whatYouDo" className="text-sm text-ink-muted mb-1.5">
            What you do
          </label>
          <input
            id="whatYouDo"
            name="whatYouDo"
            type="text"
            required
            className="w-full bg-paper border border-paper-border rounded-md px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink"
            placeholder="One line is plenty"
          />
        </div>

        <div>
          <label htmlFor="currentUrl" className="text-sm text-ink-muted mb-1.5">
            Current site URL <span className="text-ink-faint">(optional)</span>
          </label>
          <input
            id="currentUrl"
            name="currentUrl"
            type="url"
            inputMode="url"
            className="w-full bg-paper border border-paper-border rounded-md px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink"
            placeholder="https://"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-ink-muted mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-paper border border-paper-border rounded-md px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink"
            placeholder="you@yourbusiness.co.uk"
          />
        </div>

        <div>
          <label htmlFor="specifics" className="text-sm text-ink-muted mb-1.5">
            Anything specific you’d like to see <span className="text-ink-faint">(optional)</span>
          </label>
          <textarea
            id="specifics"
            name="specifics"
            rows={3}
            className="w-full bg-paper border border-paper-border rounded-md px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink"
            placeholder="A specific style, a service you want featured, anything else useful."
          />
        </div>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-brand-gold hover:text-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {submitting ? 'Sending…' : 'Build my preview'}
          {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
        </button>

        <p className="text-xs text-ink-faint">
          We use what you send to build your preview and nothing else. No mailing list. No card
          details. No follow-up if you pass.
        </p>
      </div>
    </form>
  );
}
