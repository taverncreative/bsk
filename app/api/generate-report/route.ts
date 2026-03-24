import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const clientId = formData.get('clientId') as string;
    const month = formData.get('month') as string;
    const additionalNotes = formData.get('notes') as string;
    const screenshots = formData.getAll('screenshots') as File[];

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
    }

    // Get client info
    const { data: client } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    // Check for Anthropic API key
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 });
    }

    // Dynamically import Anthropic provider
    const { anthropic } = await import('@ai-sdk/anthropic');

    // Convert screenshots to base64 for vision
    const imageContents: any[] = [];
    for (const file of screenshots) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageContents.push({
        type: 'image' as const,
        image: base64,
        mimeType: file.type || 'image/png',
      });
    }

    const prompt = `You are a digital marketing analyst generating a professional monthly report for a client called "${client.company_name}".

${client.package_name ? `Their package: ${client.package_name}` : ''}
${client.website ? `Their website: ${client.website}` : ''}
${additionalNotes ? `Additional context from the account manager: ${additionalNotes}` : ''}

Analyze the provided screenshots of their SEO/analytics data and generate a structured report.

Return your response as valid JSON with this exact structure:
{
  "summary": "A 2-3 sentence executive summary of this month's performance",
  "whatWorked": ["Point 1", "Point 2", "Point 3"],
  "currentPosition": ["Where they rank for key terms", "Traffic trends", "Key metrics"],
  "nextMonthPlan": ["Action 1", "Action 2", "Action 3"],
  "suggestions": ["Upsell or improvement suggestion 1", "Suggestion 2"],
  "keyMetrics": [
    {"label": "Metric Name", "value": "Value", "change": "+X%"},
    {"label": "Another Metric", "value": "Value", "change": "-X%"}
  ]
}

Be specific and data-driven based on what you can see in the screenshots. If you cannot read specific numbers, make reasonable observations about trends and patterns. Keep language professional but accessible.`;

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-20250514') as any,
      messages: [{
        role: 'user',
        content: [
          ...imageContents,
          { type: 'text', text: prompt },
        ],
      }],
    });

    // Parse the JSON response
    let reportData;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      reportData = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      reportData = {
        summary: text,
        whatWorked: [],
        currentPosition: [],
        nextMonthPlan: [],
        suggestions: [],
        keyMetrics: [],
      };
    }

    // Save to database
    const { data: report, error: saveError } = await supabase
      .from('generated_reports')
      .insert([{
        client_id: clientId,
        report_month: month || new Date().toISOString().slice(0, 10),
        content: reportData,
      }])
      .select()
      .single();

    if (saveError) {
      console.error('Failed to save report:', saveError);
    }

    return NextResponse.json({
      success: true,
      report: reportData,
      reportId: report?.id,
      clientName: client.company_name,
    });
  } catch (error: any) {
    console.error('Report generation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate report' }, { status: 500 });
  }
}
