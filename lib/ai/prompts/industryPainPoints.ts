export function generateIndustryPainPointsPrompt(industry: string, service: string): string {
  return `
You are an expert digital marketing consultant analyzing the ${industry} industry.
Your task is to identify 3 distinct, specific pain points that ${industry} businesses face regarding their digital marketing and ${service}.

Instructions:
- Provide exactly 3 concise pain points.
- Each pain point should describe a real challenge or frustration that a business in the ${industry} industry might experience when lacking effective ${service}.
- Keep the language professional and directly relevant to the ${industry} sector.

Example (for industry: plumbers, service: seo):
{
  "painPoints": [
    "Lack of visibility on Google Maps for local emergency callouts.",
    "Competitors consistently ranking above them for high-value services.",
    "Over-reliance on unpredictable word-of-mouth referrals instead of consistent lead generation."
  ]
}

Return ONLY the structured JSON object containing exactly 3 pain points. Do not include markdown formatting like \`\`\`json or any other text outside the JSON object.
  `.trim();
}
