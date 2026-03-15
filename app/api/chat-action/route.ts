import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);
async function generateAdminSummary(messages: any[]) {
  if (!messages || messages.length === 0) return 'No conversation history available.';

  const systemPrompt = `You are an internal assistant generating a structured CRM summary from a chat log between an AI and a visitor.
Only extract facts.

Output EXACTLY this format (leave fields as 'Unknown' if not mentioned):

Lead Intent
[What does the user want to achieve?]

Detected Issues
[What technical issues did the AI diagnostic scan find? (If website was provided)]

Business Type
[What industry or type of business is this?]

Website Analysed
[Extract from conversation if possible]

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
  try {
    const body = await req.json();
    const { type, name, email, preferredTime, message, pageUrl, timestamp, messages } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const aiSummary = await generateAdminSummary(messages);

    const businessTypeMatch = aiSummary.match(/Business Type\s*\n(.*)/);
    const businessType = businessTypeMatch ? businessTypeMatch[1] : 'Unknown';

    const locationMatch = aiSummary.match(/Business Location\s*\n(.*)/);
    const location = locationMatch ? locationMatch[1] : 'Unknown';

    const { error: insertError } = await supabase.from('unified_leads').insert({
      name: name || (type === 'call' ? 'Call Booking' : 'Message Request'),
      email: email,
      phone: null,
      website_url: aiSummary.match(/Website Analysed\s*\n(.*)/)?.[1] || null,
      page_context: pageUrl || 'Unknown',
      submission_type: type === 'call' ? 'Elle Call Booking' : 'Elle Chat Message',
      message: `Preferred Time: ${preferredTime || 'N/A'}\nMessage: ${message || 'N/A'}\n\nAI Summary:\n${aiSummary}`,
    });
    
    if (insertError) {
      console.error("Error inserting lead to Supabase:", insertError);
    }

    // Also log Elle interaction
    await supabase.from('elle_logs').insert({
      intent: type === 'call' ? 'Book Call' : 'Send Message',
      issues_detected: aiSummary.match(/Detected Issues\s*\n(.*)/)?.[1] || null,
      lead_converted: true,
      transcript: JSON.stringify(messages)
    });

    // Send Admin Email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const adminEmailHTML = `
        <h2>New Chatbot Lead (${type.toUpperCase()})</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <hr />
        <h3>Lead Details:</h3>
        <p><strong>Preferred Time:</strong> ${preferredTime || 'N/A'}</p>
        <p><strong>Message Context:</strong> ${message || 'N/A'}</p>
        <hr />
        <h3>AI Extraction Summary:</h3>
        <pre style="white-space: pre-wrap;">${aiSummary}</pre>
        <hr />
        <p><a href="https://businesssortedkent.co.uk/admin-dashboard/lead-inbox">View in Admin Dashboard</a></p>
      `;
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: 'Business Sorted Kent <hello@businesssortedkent.co.uk>',
          to: 'hello@businesssortedkent.co.uk',
          subject: `Elle Chat Lead: ${name} (${type})`,
          html: adminEmailHTML
        })
      });
    }

    if (type === 'call') {
      console.log(`[CRM PIPELINE INGESTION] NEW CALL BOOKING REQUEST:
Name: ${name}
Email: ${email}
Preferred Time: ${preferredTime || 'Not provided'}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);
    } else if (type === 'message') {
      console.log(`[CRM PIPELINE INGESTION] NEW MESSAGE RECEIVED:
Name: ${name}
Email: ${email}
Message: ${message || 'Not provided'}
Page Source: ${pageUrl || 'Unknown'}
Timestamp: ${timestamp || new Date().toISOString()}

--- AI SUMMARY ---
${aiSummary}
------------------`);
    }

    return NextResponse.json({ success: true, message: 'Action processed successfully.' });
  } catch (error) {
    console.error('Error processing chat action request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
