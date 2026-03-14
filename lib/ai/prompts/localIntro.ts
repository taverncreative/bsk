export function generateLocalIntroPrompt(service: string, town: string, county: string): string {
  return `
You are an expert copywriter specializing in local SEO and B2B marketing.
Write a natural, professional, and informative introduction paragraph explaining why ${service} matters for businesses in ${town}, ${county}.

Instructions:
- The paragraph must be exactly 100–150 words.
- Explain the importance of ${service} for local business operations and growth in ${town}.
- Mention local business competition and how ${service} can provide a competitive edge.
- Ensure the tone is professional, authoritative, and informative.
- DO NOT use generic, repetitive sentence structures. Vary your phrasing so that if this prompt is run for multiple towns, the structure of the output always varies significantly.
- Focus specifically on the unique business landscape of ${town}, ${county} if possible, or refer to it naturally.

Return ONLY the introductory paragraph text, without any conversational filler or preambles.
  `.trim();
}
