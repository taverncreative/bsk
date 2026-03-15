import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ summary: "No conversation history available.", businessType: "Unknown" });
    }

    const systemPrompt = `You are a helpful assistant that summarizes conversations for a CRM system. 
Please write a short summary of the conversation history. 
Include:
- Business type (if mentioned)
- Website provided (if any)
- Questions asked
- Issues detected during website scan (if any)

Write it concisely in 3-4 short sentences or bullet points.

At the very end of your response, on a new line, write exactly:
BUSINESS TYPE: [insert detected business type/industry here, or 'Unknown' if none]`;

    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: messages.map((m: any) => `${m.role}: ${m.content}`).join('\n')
    });

    const lines = text.split('\n');
    let summary = text;
    let businessType = 'Unknown';

    if (lines.length > 0) {
      const lastLineIndex = lines.findIndex(line => line.includes('BUSINESS TYPE:'));
      if (lastLineIndex !== -1) {
        businessType = lines[lastLineIndex].replace('BUSINESS TYPE:', '').trim();
        summary = lines.slice(0, lastLineIndex).join('\n').trim();
      }
    }

    return NextResponse.json({ summary, businessType });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
