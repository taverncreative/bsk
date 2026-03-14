import { getAllCaseStudies } from '../lib/queries/caseStudies';
async function run() {
  const cs = await getAllCaseStudies();
  console.log(cs.map(c => c.slug));
}
run();
