import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCaseStudyBySlug, getAllCaseStudies } from '@/lib/queries';
import CaseStudyPage from '@/components/templates/CaseStudyPage';

export const revalidate = 3600; // Invalidate every hour to catch new case studies

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. Generate Static Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Business Sorted Kent',
    };
  }

  // Capitalize properly if stored as lower-case
  const capitalize = (s?: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  return {
    title: `${caseStudy.title} | Case Study | Business Sorted Kent`,
    description: `See how we helped a ${caseStudy.industry || 'local'} business in ${capitalize(caseStudy.town || 'Kent')} grow using ${capitalize(caseStudy.services_used || 'our services')}.`,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/case-studies/${caseStudy.slug}`,
    },
  };
}

// 2. SSG: Build all known case studies at compile time
export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

// 3. Page Component Rendering
export default async function CaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // Format the raw strings from the database safely.
  // The 'results' column now contains the rich JSON payload of our actual case studies.
  let parsedPayload: any = {};
  try {
    if (typeof caseStudy.results === 'string') {
      parsedPayload = JSON.parse(caseStudy.results);
    } else if (caseStudy.results && typeof caseStudy.results === 'object') {
      parsedPayload = caseStudy.results;
    }
  } catch (e) {
    // fallback
  }

  const serviceName = parsedPayload.services_used || caseStudy.summary || 'Digital Services';
  const serviceSlug = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const townName = parsedPayload.town || 'Kent';
  const townSlug = townName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const industryName = parsedPayload.industry || 'Local Business';
  
  // Re-map the results to the array required by the Page template
  let parsedResults: string[] = [];
  if (Array.isArray(parsedPayload.metrics)) {
    parsedResults = parsedPayload.metrics;
  } else if (parsedPayload.resultsSummary) {
    parsedResults = [parsedPayload.resultsSummary];
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": `${caseStudy.title} - Case Study`,
              "headline": caseStudy.title,
              "about": {
                "@type": "Thing",
                "name": `${serviceName} for ${caseStudy.industry}`
              },
              "author": {
                "@type": "Organization",
                "name": "Business Sorted Kent"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Review",
              "itemReviewed": {
                "@type": "Organization",
                "name": "Business Sorted Kent"
              },
              "reviewBody": caseStudy.summary,
              "author": {
                "@type": "Organization",
                "name": `${caseStudy.industry} Business in ${townName}`
              }
            }
          ])
        }}
      />
      <CaseStudyPage
        title={caseStudy.title}
        industry={industryName}
        summary={parsedPayload.challenge || caseStudy.summary}
        solution={parsedPayload.solution}
        outcome={parsedPayload.resultsSummary}
        results={parsedResults}
        content={parsedPayload.content}
        businessName={parsedPayload.businessName}
        websiteUrl={parsedPayload.websiteUrl}
        service={{
          name: serviceName,
          slug: serviceSlug,
        }}
        town={{
          name: townName,
          slug: townSlug,
        }}
      />
    </>
  );
}
