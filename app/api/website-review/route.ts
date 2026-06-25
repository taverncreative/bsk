import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { sendEmail, sendErrorAlert } from '@/lib/email';

async function generateAdminSummary(messages: any[], providedUrl: string) {
  if (!messages || messages.length === 0) return 'No conversation history available.';

  const systemPrompt = `You are an internal assistant generating a structured CRM summary from a chat log between an AI and a visitor.
Only extract facts.

Output EXACTLY this format (leave fields as 'Unknown' if not mentioned):

Lead Intent
[What does the user want to achieve?]

Detected Issues
[What technical issues did the AI diagnostic scan find?]

Business Type
[What industry or type of business is this?]

Website Analysed
${providedUrl || '[Extract from conversation if possible]'}

Business Location
[Extract any town, city, or county mentioned, e.g., Ashford, Kent. If none, say Unknown]
`;

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    prompt: messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')
  });

  return text.trim();
}

export async function POST(req: Request) {
  let bodyContext: any = {};
  try {
    const body = await req.json();
    bodyContext = body;
    const { name, url, email, pageUrl, timestamp, messages, hp_website } = body;

    // Honeypot: real users never fill the hidden hp_website field. Silently accept and drop.
    if (typeof hp_website === 'string' && hp_website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!url || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiSummary = await generateAdminSummary(messages, url);

    // Send Admin Email via Resend
    await sendEmail(
      `New Website Review Request from ${email}`,
      `New Website Review Request\n\nName: ${name || 'Not provided'}\nEmail: ${email}\nWebsite: ${url}\nSource: ${pageUrl || 'Unknown'}\n\nAI Diagnostic:\n${aiSummary}`
    );

    console.log(`[CRM PIPELINE INGESTION] NEW WEBSITE REVIEW REQUEST:
Name: ${name || 'Not provided'}
Contact Email: ${email}
Target URL: ${url}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);

    return NextResponse.json({ success: true, message: 'Review requested successfully.' });
  } catch (error: any) {
    console.error('Error processing website review request:', error);
    sendErrorAlert(
        'Website Review',
        bodyContext?.pageUrl || 'Unknown',
        bodyContext?.email || 'Unknown',
        bodyContext || {},
        error?.message || 'Server Exception in /api/website-review'
    ).catch(console.error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
