import { config } from 'dotenv';
config({ path: '.env.local' });
import { getCaseStudyBySlug } from './lib/queries/caseStudies';

async function main() {
  const result = await getCaseStudyBySlug('local-service-seo-improvement');
  console.log(result ? "FOUND IN DB" : "NOT FOUND IN DB");
}
main();
