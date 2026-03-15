const fs = require('fs');

const importStatement = "import GoogleReviews from '@/components/sections/GoogleReviews';\n";

function addImport(content) {
  if (content.includes('GoogleReviews')) return content;
  // find first import
  const lastImportIndex = content.lastIndexOf('import ');
  const endOfLastImport = content.indexOf('\n', lastImportIndex) + 1;
  return content.slice(0, endOfLastImport) + importStatement + content.slice(endOfLastImport);
}

function processHomepage() {
  const path = 'app/page.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = addImport(content);
  // inject after <HomepageHero ... />
  const marker = "        }}\n      />";
  if (content.includes(marker)) {
    content = content.replace(marker, marker + "\n\n      <GoogleReviews />");
  }
  fs.writeFileSync(path, content);
}

function processServiceAndLocation(path, compact = true) {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  content = addImport(content);
  // Replace <CTA with <GoogleReviews compact={compact} />\n      <CTA
  const replacement = compact ? "<GoogleReviews compact={true} />\n      <CTA" : "<GoogleReviews />\n      <CTA";
  // We only want to replace the <CTA that is explicitly a component, e.g. `<CTA ` or `<CTA/>` or `<CTA>`
  content = content.replace(/(?:[ \t]*)<CTA/g, (match) => {
     // match contains the leading spaces
     const spaces = match.replace('<CTA', '');
     return spaces + (compact ? "<GoogleReviews compact={true} />\n" : "<GoogleReviews />\n") + match;
  });
  fs.writeFileSync(path, content);
}

processHomepage();

const targets = [
  { p: 'components/templates/ServicePage.tsx', c: true },
  { p: 'components/templates/ServiceTownPage.tsx', c: true },
  { p: 'components/templates/MicroLocationPage.tsx', c: true },
  { p: 'components/templates/TownPage.tsx', c: true },
  { p: 'components/templates/IndustryLocationPage.tsx', c: true },
  { p: 'app/case-studies/page.tsx', c: false },
  { p: 'app/case-studies/[slug]/page.tsx', c: false }
];

targets.forEach(t => {
  processServiceAndLocation(t.p, t.c);
});

console.log("Done");
