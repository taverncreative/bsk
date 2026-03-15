const fs = require('fs');
const path = require('path');

function walk(dir, call) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!full.includes('.next') && !full.includes('node_modules')) {
        walk(full, call);
      }
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      call(full);
    }
  }
}

let modified = 0;

walk('./app', processFile);
walk('./components', processFile);

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  const initial = content;

  content = content.replace(/Start A Project/gi, 'Get A Free Quote');
  content = content.replace(/Speak With Our Team/gi, 'Get A Free Quote');
  content = content.replace(/Request Information/gi, 'Get A Free Quote');
  content = content.replace(/Get A Quote/gi, 'Get A Free Quote');
  content = content.replace(/Book a Consultation/gi, 'Get A Free Quote');
  content = content.replace(/Book An Automation Consultation/gi, 'Get A Free Quote'); // Reset first to make applying logic simple
  content = content.replace(/Request a Website Review/gi, 'Get A Free Website Review');
  content = content.replace(/Get a Free Website Review/gi, 'Get A Free Website Review');
  content = content.replace(/>Contact Us</gi, '>Get A Free Quote<');
  content = content.replace(/text: 'Contact Us'/gi, "text: 'Get A Free Quote'");
  content = content.replace(/text: "Contact Us"/gi, 'text: "Get A Free Quote"');
  content = content.replace(/Get a Free SEO Review/gi, 'Get A Free Quote');
  content = content.replace(/Get A Website Quote/gi, 'Get A Free Website Review');
  content = content.replace(/Get a Free Website Quote/gi, 'Get A Free Website Review');
  content = content.replace(/Get a Branding Quote/gi, 'Get A Free Quote');
  content = content.replace(/Get A Website Review/gi, 'Get A Free Website Review');
  content = content.replace(/Get Social Media Setup/gi, 'Get A Free Quote');
  content = content.replace(/Get a Free Quote/g, 'Get A Free Quote');
  content = content.replace(/Get a free quote/g, 'Get A Free Quote');
  
  if (file.toLowerCase().includes('automation')) {
    content = content.replace(/Get A Free Quote/gi, 'Book An Automation Consultation');
  }

  if (content !== initial) {
    fs.writeFileSync(file, content);
    modified++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`${modified} files updated.`);
