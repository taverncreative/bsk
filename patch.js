const fs = require('fs');
const filepath = '/Users/taverncreative030322/Library/Mobile Documents/com~apple~CloudDocs/TavernCreative iCloud/Clients/Business Customers/Business Sorted Kent/BSK/business-sorted-kent/components/templates/ServiceTownPage.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const constantsReplacement = `
  // Core Services Constants (Rotated Programmatically)
  const seed = town.name.length;

  const intros = [
    \`Businesses in \${town.name} rely heavily on their online presence to attract new customers. A professionally designed website helps local businesses present their services clearly and generate enquiries.\`,
    \`When customers search for services in \${town.name}, the businesses that appear first often receive the most enquiries. A well structured online presence helps ensure your business is visible when it matters most.\`,
    \`As businesses in \${town.name} grow, having the right online systems becomes increasingly important. A strong website, clear messaging and efficient enquiry systems help businesses manage growth effectively.\`,
    \`Many businesses in \${town.name} compete for the same customers online. Businesses with stronger websites and better online visibility often stand out and attract more enquiries.\`,
    \`Most customers now research businesses online before making contact. A well structured online presence helps businesses in \${town.name} build trust and encourage enquiries.\`
  ];
  const selectedIntro = intros[seed % intros.length];

  const locationContexts = [
    \`Businesses in \${town.name} operate in a competitive local market where visibility and strong presentation can make a significant difference.\`,
    \`Many businesses in \${town.name} rely on local customers finding them online when searching for services.\`,
    \`As \${town.name} continues to grow, businesses increasingly rely on professional online systems to attract new customers.\`
  ];
  const selectedLocationContext = locationContexts[(seed * 2) % locationContexts.length];
  const combinedIntro = \`\${selectedIntro} \${selectedLocationContext}\`;

  const ctas = ["Get a Free Quote", "Book a Consultation", "Request a Website Review", "Speak With Our Team"];
  const selectedCTA = ctas[(seed * 3) % ctas.length];

  const webDesignTerms = ["business website", "mobile friendly website", "professional website design", "service business website", "modern website design"];
  const seoTerms = ["local search results", "Google Business profile", "search rankings", "website visibility", "local search optimisation"];
  const leadCaptureTerms = ["website enquiries", "conversion optimisation", "quote request forms", "contact forms", "customer enquiries"];
  const automationTerms = ["workflow automation", "automated follow ups", "CRM systems", "customer management", "process automation"];

  // Web Design Data
  const isWebDesign = service.slug === 'web-design';
  const webDesignPainPointsBank = [
    { title: "Outdated websites", pain_point: \`Businesses may still rely on old websites that no longer reflect their services.\` },
    { title: "Poor mobile experience", pain_point: \`Websites that are difficult to use on phones can drive visitors away in \${town.name}.\` },
    { title: "Confusing navigation", pain_point: \`Visitors struggle to find important information.\` },
    { title: "Slow loading pages", pain_point: \`Performance issues reduce engagement.\` },
    { title: "Weak enquiry pathways", pain_point: \`Visitors cannot easily contact the business.\` }
  ];
  const rotatedWebDesignPainPoints = [webDesignPainPointsBank[seed % 5], webDesignPainPointsBank[(seed + 1) % 5]];
  const webDesignFaqsBank = [
    { question: \`How long does it take to build a website?\`, answer: \`A typical website takes between 4 to 8 weeks depending on the complexity of the project.\` },
    { question: \`Can you improve my existing website?\`, answer: \`Yes, we often redesign outdated sites to improve their performance and ability to generate local enquiries.\` },
    { question: \`Do you work with businesses in \${town.name}?\`, answer: \`Absolutely. We provide dedicated web design services for businesses throughout \${town.name} and the surrounding areas.\` },
    { question: \`Can I update my website myself?\`, answer: \`Yes, we build our sites on user-friendly platforms so you can easily update content.\` }
  ];
  const webDesignFaqs = [webDesignFaqsBank[seed % 4], webDesignFaqsBank[(seed + 1) % 4], webDesignFaqsBank[(seed + 2) % 4]];
  const usedWebDesignTerms = [webDesignTerms[seed % 5], webDesignTerms[(seed + 1) % 5], webDesignTerms[(seed + 2) % 5]];

  // SEO Data
  const seoPainPointsBank = [
    { title: "Low search visibility", pain_point: \`Businesses fail to appear for relevant searches in \${town.name}.\` },
    { title: "Competitor dominance", pain_point: \`Other companies occupy the top search results.\` },
    { title: "Weak website optimisation", pain_point: \`Sites lack the structure needed for search engines.\` },
    { title: "Limited local optimisation", pain_point: \`Google Business profiles and location signals are missing.\` },
    { title: "Poor content coverage", pain_point: \`Important services or locations are not represented by pages.\` }
  ];
  const rotatedSeoPainPoints = [seoPainPointsBank[seed % 5], seoPainPointsBank[(seed + 1) % 5]];
  const seoFaqsBank = [
    { question: \`How long does SEO take to work?\`, answer: \`SEO is a long-term strategy. Typically, noticeable improvements in map rankings occur within 90 days.\` },
    { question: \`How do you choose keywords?\`, answer: \`We perform deep search engine opportunity analysis to target the exact transactional terms your local customers use.\` },
    { question: \`Do I need SEO for a small business?\`, answer: \`Yes. Local SEO specifically helps small businesses compete against larger companies by dominating the map results.\` },
    { question: \`Can you help my Google Business profile?\`, answer: \`Yes, we fully optimise your Google Business profile to capture local 'near me' search traffic.\` }
  ];
  const seoFaqs = [seoFaqsBank[seed % 4], seoFaqsBank[(seed + 1) % 4], seoFaqsBank[(seed + 2) % 4]];
  const usedSeoTerms = [seoTerms[seed % 5], seoTerms[(seed + 1) % 5], seoTerms[(seed + 2) % 5]];

  // Lead Capture Data
  const isLeadCapture = service.slug === 'lead-capture';
  const leadCapturePainPointsBank = [
    { title: "Unclear calls to action", pain_point: \`Visitors are unsure what to do next when arriving on your site.\` },
    { title: "Complicated enquiry forms", pain_point: \`Visitors abandon forms before submitting them.\` },
    { title: "Visitors leave without contacting", pain_point: \`Pages do not guide visitors toward enquiry.\` },
    { title: "Important information buried", pain_point: \`Customers in \${town.name} cannot quickly understand services.\` },
    { title: "Lack of contact pathways", pain_point: \`Phone, form and messaging options are unclear.\` }
  ];
  const rotatedLeadCapturePainPoints = [leadCapturePainPointsBank[seed % 5], leadCapturePainPointsBank[(seed + 1) % 5]];
  const leadCaptureFaqsBank = [
    { question: \`How can I get more enquiries from my website?\`, answer: \`By improving site structure, adding clear calls to action, and streamlining contact forms.\` },
    { question: \`Do I need a new website for lead capture?\`, answer: \`Not necessarily. We can often optimise existing pages to improve the user journey and conversion rates.\` },
    { question: \`Can you improve my contact forms?\`, answer: \`Yes, we redesign forms so they are simple, clear, and easy to complete on any device.\` },
    { question: \`What makes a website convert visitors?\`, answer: \`Clear messaging, strong calls to action, fast loading speeds, and frictionless contact pathways.\` }
  ];
  const leadCaptureFaqs = [leadCaptureFaqsBank[seed % 4], leadCaptureFaqsBank[(seed + 1) % 4], leadCaptureFaqsBank[(seed + 2) % 4]];
  const usedLeadCaptureTerms = [leadCaptureTerms[seed % 5], leadCaptureTerms[(seed + 1) % 5], leadCaptureTerms[(seed + 2) % 5]];

  // Automation Data
  const isBusinessAutomation = service.slug === 'business-automation';
  const businessAutomationPainPointsBank = [
    { title: "Missed enquiries", pain_point: \`Manual processes delay responses in \${town.name}.\` },
    { title: "Manual follow ups", pain_point: \`Business owners forget to follow up leads.\` },
    { title: "Customer data scattered", pain_point: \`Information stored in different systems.\` },
    { title: "Admin workload", pain_point: \`Businesses spend hours on repetitive tasks.\` },
    { title: "Scaling challenges", pain_point: \`Growth becomes harder without systems.\` }
  ];
  const rotatedBusinessAutomationPainPoints = [businessAutomationPainPointsBank[seed % 5], businessAutomationPainPointsBank[(seed + 1) % 5]];
  const businessAutomationFaqsBank = [
    { question: \`What business tasks can be automated?\`, answer: \`We automate enquiry routing, follow-up emails, CRM data logging, and review requests.\` },
    { question: \`Do I need special software for automation?\`, answer: \`We specialise in integrations, connecting the tools you already use like your email, website, and basic CRM.\` },
    { question: \`Can automation work with my current systems?\`, answer: \`Yes, we build secure bridges between your website forms and existing operational software.\` },
    { question: \`Is automation suitable for small businesses?\`, answer: \`Absolutely. It acts as a virtual administrator, handling background work so you can focus on your service.\` }
  ];
  const businessAutomationFaqs = [businessAutomationFaqsBank[seed % 4], businessAutomationFaqsBank[(seed + 1) % 4], businessAutomationFaqsBank[(seed + 2) % 4]];
  const usedAutomationTerms = [automationTerms[seed % 5], automationTerms[(seed + 1) % 5], automationTerms[(seed + 2) % 5]];

  // Branding Data
  const isBranding = service.slug === 'branding' || service.slug === 'logo-branding';
  const brandingPainPointsBank = [
    { title: "Inconsistent branding", pain_point: \`Different colours, fonts and styles appear across your website, vehicles and social media in \${town.name}.\` },
    { title: "Outdated logos", pain_point: \`An old or poorly designed logo can make your business appear less professional.\` },
    { title: "Generic brand identities", pain_point: \`Without clear branding it becomes harder for customers to remember you compared to other local providers.\` },
    { title: "Poor visual recognition", pain_point: \`Flyers, workwear and signage do not match, causing a fragmented customer experience.\` }
  ];
  const rotatedBrandingPainPoints = [brandingPainPointsBank[seed % 4], brandingPainPointsBank[(seed + 1) % 4], brandingPainPointsBank[(seed + 2) % 4], brandingPainPointsBank[(seed + 3) % 4]];
  const brandingFaqs = [
    { question: \`How long does logo design take for businesses safely located in \${town.name}?\`, answer: \`A typical logo design process takes 2 to 4 weeks depending on how quickly we establish the correct direction through the concept phases.\` },
    { question: \`Will I receive all logo file formats?\`, answer: \`Yes. We provide full brand kits including vector files for large print work, transparent PNGs, and all variations required for digital and physical use.\` },
    { question: \`Do you provide brand guidelines?\`, answer: \`Absolutely. Every branding package includes a guidelines PDF outlining exactly how to use your colors, typography, and logo variations safely.\` },
    { question: \`Can you apply branding to workwear and vehicles?\`, answer: \`Yes. Our design systems are explicitly engineered to ensure your logo reproduces perfectly on physical printed merchandise, signage and van livery.\` }
  ];

  // Social Media Data
  const isSocialMedia = service.slug === 'social-media-setup' || service.slug === 'digital-marketing';
  const socialMediaPainPointsBank = [
    { title: "Incomplete profiles", pain_point: \`Important business information for your \${town.name} location is missing or completely outdated.\` },
    { title: "Inconsistent branding", pain_point: \`Colours, logos, and descriptions vary across platforms, confusing local customers.\` },
    { title: "Poor first impressions", pain_point: \`Your profiles may appear unprofessional or inactive when someone in \${town.name} searches for you.\` },
    { title: "Disconnected online presence", pain_point: \`Your social media profiles exist in a vacuum and do not align with or link back to your main business website.\` }
  ];
  const rotatedSocialMediaPainPoints = [socialMediaPainPointsBank[seed % 4], socialMediaPainPointsBank[(seed + 1) % 4], socialMediaPainPointsBank[(seed + 2) % 4], socialMediaPainPointsBank[(seed + 3) % 4]];
  const socialMediaFaqs = [
    { question: \`Which social platforms should my business in \${town.name} use?\`, answer: \`It depends entirely on your industry and audience. We generally recommend Google Business and Facebook for local trades, while B2B services benefit heavily from polished LinkedIn company pages.\` },
    { question: \`Can you improve my existing social media profiles?\`, answer: \`Yes. We specialise in profile rehabilitation—taking existing outdated accounts and structurally updating their imagery, messaging, and integrations to align with your current business standards.\` },
    { question: \`Do you manage the daily posting on these accounts?\`, answer: \`Our core service focuses on the professional *setup and structural alignment* of these profiles. We handle the heavy lifting of branding, integration, and architecture to ensure you have a high-end foundation to work from.\` }
  ];

  // Workwear Data
  const isWorkwearPrint = service.slug === 'workwear-print';
  const workwearPainPointsBank = [
    { title: "Unbranded workwear", pain_point: \`When working in \${town.name}, staff may appear less professional or untrustworthy to local residents if they arrive without branded uniforms.\` },
    { title: "Inconsistent printed materials", pain_point: \`Flyers and signage used locally around \${town.name} often don't match the modern digital brand identity.\` },
    { title: "Missed visibility opportunities", pain_point: \`Unbranded vehicles travelling between jobs in \${town.name} are wasting free daily local advertising.\` },
    { title: "Low brand recognition", pain_point: \`Without consistent physical visuals, customers in the \${town.name} area struggle to remember your business for future work.\` }
  ];
  const rotatedWorkwearPainPoints = [workwearPainPointsBank[seed % 4], workwearPainPointsBank[(seed + 1) % 4], workwearPainPointsBank[(seed + 2) % 4], workwearPainPointsBank[(seed + 3) % 4]];
  const workwearFaqs = [
    { question: \`What types of workwear can you brand for my team in \${town.name}?\`, answer: \`We supply and brand a full range of high-quality workwear, including hoodies, polo shirts, t-shirts, jackets, and high-visibility clothing. Everything is structurally designed to withstand tough working environments.\` },
    { question: \`Can you print business cards and flyers?\`, answer: \`Yes. We design and produce premium business cards, leaflets, brochures, and promotional materials that perfectly match your online identity and help you leave a lasting impression at local \${town.name} events.\` },
    { question: \`Do you supply clothing or just the branding?\`, answer: \`We supply the entire package end-to-end. We source high-quality garments from trusted UK suppliers and then manage the professional embroidery or printing process, delivering the finished product directly to you in \${town.name}.\` },
    { question: \`Can you match materials to my existing logo?\`, answer: \`Absolutely. Our design team ensures complete consistency, carefully matching your specific brand colours (Pantone/CMYK) and logo architecture so every physical item flawlessly represents your business identity.\` }
  ];
`;

const lines = content.split('\n');

// Find the start and end of the block to replace
const startIndex = lines.findIndex(l => l.includes('// Seeded deterministic pain points based on town name length for SEO'));
const endIndex = lines.findIndex(l => l.includes('if (isSEO) {'));

content = lines.slice(0, startIndex).join('\n') + '\n' + constantsReplacement + '\n' + lines.slice(endIndex).join('\n');

fs.writeFileSync(filepath, content, 'utf8');
