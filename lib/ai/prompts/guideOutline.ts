export function generateGuideOutlinePrompt(topic: string): string {
  return `
You are an expert digital marketing content strategist and copywriter.
Your task is to generate a comprehensive guide outline for the topic: "${topic}".

Instructions:
- The outline must be structured as a JSON object.
- It must include a compelling "title" for the guide.
- It must include a brief "intro" summary (1-2 sentences) explaining what the guide covers.
- It must include exactly 5 "sections" headings that logically break down the topic.
- It must include a brief "conclusion" summary (1-2 sentences) wrapping up the guide.

Return ONLY the structured JSON object. Do not include markdown formatting like \`\`\`json or any other text outside the JSON object.

Example output structure (for the topic "Local SEO for Small Businesses"):
{
  "title": "The Ultimate 2024 Guide to Local SEO for Small Businesses",
  "intro": "Discover the essential strategies to dominate local search results and drive more foot traffic to your small business. This guide covers everything from Google Business Profiles to localized content.",
  "sections": [
    "Understanding the Local Search Landscape",
    "Optimizing Your Google Business Profile",
    "Building Local Citations and NAP Consistency",
    "On-Page SEO Tactics for Local Businesses",
    "Acquiring and Managing Customer Reviews"
  ],
  "conclusion": "By implementing these local SEO strategies, you can establish a strong baseline of local visibility that translates to sustainable revenue growth. Consistency and attention to detail are your best advantages."
}
  `.trim();
}
