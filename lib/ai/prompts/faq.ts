export function generateFAQPrompt(service: string, town: string): string {
  return `
You are an expert digital marketing consultant analyzing local services.
Your task is to generate 5 Frequently Asked Questions (FAQs) for a business offering ${service} in ${town}.

Instructions:
- Provide exactly 5 FAQs.
- Each FAQ must include a "question" and an "answer".
- At least one question should explicitly mention the service and the town, for example: "How much does ${service} cost in ${town}?"
- The answers should be 2 to 3 sentences long.
- Keep the language professional, informative, and relevant to the ${service} sector within the ${town} area.

Return ONLY the structured JSON array of FAQ objects. Do not include markdown formatting like \`\`\`json or any other text outside the JSON array.

Example output structure:
[
  {
    "question": "How much does ${service} cost in ${town}?",
    "answer": "The cost of ${service} in ${town} varies depending on your specific requirements and the scope of the project. We offer customized packages tailored to meet the needs of local businesses. Contact us for a personalized quote to get a more accurate estimate."
  }
]
  `.trim();
}
