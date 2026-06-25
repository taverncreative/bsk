export interface LeadMagnetData {
  title: string;
  description: string;
  download: string;
}

export const leadMagnets: LeadMagnetData[] = [
  {
    title: "Free Local SEO Checklist",
    description: "A step-by-step checklist showing how Kent businesses rank on Google.",
    download: "local-seo-checklist.pdf"
  },
  {
    title: "Website Cost Guide",
    description: "Learn how much a professional website should cost for a small business.",
    download: "website-cost-guide.pdf"
  },
  {
    title: "Lead Generation Blueprint",
    description: "The exact system we use to generate enquiries for local businesses.",
    download: "lead-generation-blueprint.pdf"
  }
];

/**
 * Utility to grab a random lead magnet for dynamic page injection
 */
export function getRandomLeadMagnet(): LeadMagnetData {
  const randomIndex = Math.floor(Math.random() * leadMagnets.length);
  return leadMagnets[randomIndex];
}
