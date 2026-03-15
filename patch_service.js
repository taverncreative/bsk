const fs = require('fs');

let file = 'components/templates/ServicePage.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('KentCoverage')) {
  content = content.replace("import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';", "import LocalAuthorityMap from '@/components/sections/LocalAuthorityMap';\nimport KentCoverage from '@/components/sections/KentCoverage';")
  
  content = content.replace(/<GrowthSystem currentService=\{serviceSlug\} \/>/g, '<KentCoverage pageType={serviceSlug} />\n        <GrowthSystem currentService={serviceSlug} />');
  fs.writeFileSync(file, content);
  console.log("Updated ServicePage.tsx");
}
