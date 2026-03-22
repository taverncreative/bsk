import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    if (!notes || notes.trim().length < 20) {
      return NextResponse.json({ error: 'Please provide more detail in your meeting notes.' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: `You are a discovery form generator for a web design and digital marketing agency called Business Sorted Kent.

Given meeting notes or information about a client, generate a structured discovery form with relevant sections and fields.

Return ONLY valid JSON in this exact format:
{
  "clientName": "Company Name Ltd",
  "clientSlug": "company-name",
  "sections": [
    {
      "id": "section-id",
      "title": "Section Title",
      "subtitle": "Brief description of this section",
      "fields": [
        {
          "id": "fieldId",
          "label": "Field Label",
          "type": "text|textarea|select|radio",
          "prefilled": "Pre-filled value if known from the notes, or empty string",
          "placeholder": "Helpful placeholder text",
          "helpText": "Optional explanation of why this field matters",
          "options": ["Option 1", "Option 2"]
        }
      ]
    }
  ]
}

Rules:
- Always include these core sections: Business Overview, Branding & Identity, Products & Services, Target Customers, Website Requirements, Content & Marketing, Timeline & Budget
- Pre-fill any fields where information is available from the meeting notes
- Use "textarea" for open-ended questions, "text" for short answers, "select" for dropdowns, "radio" for yes/no questions
- Add "options" array only for select and radio field types
- Use camelCase for field IDs
- Generate 4-8 fields per section
- Make fields specific and relevant to the client's industry
- Include helpful placeholders that guide the client on what to write
- The clientSlug should be lowercase, hyphenated, no special characters`
        },
        {
          role: 'user',
          content: `Generate a discovery form based on these meeting notes:\n\n${notes}`
        }
      ],
    });

    const content = completion.choices[0]?.message?.content || '';

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const formData = JSON.parse(jsonStr);

    return NextResponse.json(formData);
  } catch (error: any) {
    console.error('Discovery form generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate form' },
      { status: 500 }
    );
  }
}
