export function generateCaseStudyPrompt(
  industry: string,
  service: string,
  town: string,
  resultMetrics: string
): string {
  return `
You are an expert B2B marketing copywriter specializing in data-driven case studies.
Your task is to write a concise, factual case study summary based on the provided parameters.

Inputs:
- Industry: ${industry}
- Service provided: ${service}
- Location: ${town}
- Result Metrics: ${resultMetrics}

Instructions:
- Write exactly three sections: "challenge", "solution", and "resultsSummary".
- "challenge": Explain the specific problem the ${industry} business in ${town} was facing before acquiring the ${service}. Keep it realistic and under 3 sentences.
- "solution": Describe how the ${service} was implemented to address the challenge. Focus on action and strategy. Keep it under 3 sentences.
- "resultsSummary": Summarize the outcome incorporating the provided result metrics (${resultMetrics}). Keep it under 2 sentences.
- The tone MUST be highly concise, professional, and entirely factual without marketing fluff or exaggerations.

Return ONLY the structured JSON object. Do not include markdown formatting like \`\`\`json or any other text outside the JSON object.

Example output structure:
{
  "challenge": "A local plumbing company in Ashford struggled with low visibility on Google Maps, resulting in minimal emergency callouts and heavy reliance on unpredictable word-of-mouth referrals.",
  "solution": "We implemented a comprehensive local SEO strategy, optimizing their Google Business Profile, building localized citations, and restructuring their website architecture for mobile performance.",
  "resultsSummary": "Within 3 months, the client saw a 140% increase in local search visibility and a 35% reduction in cost-per-lead."
}
  `.trim();
}
