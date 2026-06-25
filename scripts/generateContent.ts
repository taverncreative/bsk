interface ContentRequest {
  service: string;
  town: string;
  industry?: string;
}

interface GeneratedContent {
  service: string;
  town: string;
  localIntro: string;
  faq: { question: string; answer: string }[];
  painPoints: string[];
  ctaText: string;
}

function generateContent(request: ContentRequest): GeneratedContent {
  const { service, town, industry } = request;
  
  const industryText = industry ? ` within the ${industry} industry` : '';
  const localIntro = `Are you looking for expert ${service} services in ${town}? We understand the unique needs of businesses operating in ${town}${industryText}. Our team is dedicated to providing high-quality, tailored solutions to help your business thrive locally and beyond.`;
  
  const faq = [
    {
      question: `Why should I choose your ${service} services in ${town}?`,
      answer: `Our deep understanding of the ${town} business landscape${industry ? ` and the ${industry} sector` : ''} ensures that our ${service} solutions are immediately impactful and highly relevant to your needs.`
    },
    {
      question: `How quickly can we get started with a project in ${town}?`,
      answer: `We are ready to start immediately. Reach out today to discuss how we can deploy our top-tier ${service} right here in ${town}.`
    }
  ];
  
  const painPoints = [
    `Struggling to find reliable, local ${service} specialists in ${town}.`,
    `Outdated systems holding back your business growth.`,
    `Need a partner who understands the local ${town} market dynamics.`
  ];
  
  const ctaText = `Get a Free ${service} Consultation in ${town} Today`;

  return {
    service,
    town,
    localIntro,
    faq,
    painPoints,
    ctaText
  };
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const service = args[0];
  const town = args[1];
  const industry = args[2];

  if (!service || !town) {
    console.error("Usage: npx tsx scripts/generateContent.ts <service> <town> [industry]");
    process.exit(1);
  }

  const generatedOutput = generateContent({
    service,
    town,
    industry,
  });

  // Log output to console, structured as JSON
  console.log(JSON.stringify(generatedOutput, null, 2));
}

// Export for use in other files if needed
export { generateContent, type ContentRequest, type GeneratedContent };
