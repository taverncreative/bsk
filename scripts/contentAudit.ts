import * as cheerio from 'cheerio';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

interface ContentIssue {
  type: string;
  url: string;
  message: string;
}

async function runContentAudit() {
  console.log(`\n🚀 Starting Content & Internal Link Audit on ${BASE_URL}...\n`);

  const sitemapUrls = new Set<string>();
  try {
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) throw new Error('Sitemap fetch failed');
    const xml = await sitemapRes.text();
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    urls.forEach(u => {
      let localPath = u.replace(`https://businesssortedkent.co.uk`, '');
      if (localPath.startsWith('http')) {
         const urlObj = new URL(localPath);
         localPath = urlObj.pathname;
      }
      if (!localPath.startsWith('/')) localPath = '/' + localPath;
      sitemapUrls.add(localPath);
    });
  } catch (err: any) {
    console.error(`❌ Could not load sitemap: ${err.message}`);
    const process = await import('process');
    process.exit(1);
  }

  const issues: ContentIssue[] = [];
  
  for (const path of sitemapUrls) {
    try {
      const res = await fetch(`${BASE_URL}${path}`);
      if (!res.ok) continue;

      const html = await res.text();
      const $ = cheerio.load(html);

      // 1. Thin Content Check
      // We'll strip scripts, styles, metadata to get pure visible text
      $('script, style, noscript, nav, footer, header').remove();
      const rawText = $('body').text();
      const words = rawText.split(/\s+/).filter(w => w.length > 0);
      const wordCount = words.length;

      // Some hubs inherently have less text (contact, etc.), but we'll flag any page under 600
      if (wordCount < 600) {
        issues.push({ 
          type: 'Thin Content', 
          url: path, 
          message: `Page only contains ~${wordCount} words (Target: 600+)` 
        });
      }

      // 2. Headings
      const h1s = $('h1');
      if (h1s.length === 0) issues.push({ type: 'Structure', url: path, message: 'Missing H1' });
      else if (h1s.length > 1) issues.push({ type: 'Structure', url: path, message: 'Multiple H1s' });

      // 3. Internal Linking Rules
      let serviceLinks = 0;
      let guideLinks = 0;
      let townLinks = 0;
      let caseStudyLinks = 0;
      
      const outgoingLinks = new Set<string>();

      // Reload document to include header/footer links for the link check
      const $full = cheerio.load(html);
      
      $full('a').each((_, el) => {
        const href = $full(el).attr('href');
        if (!href) return;
        
        let linkPath = href;
        if (linkPath.startsWith('http://localhost:3000')) linkPath = linkPath.replace('http://localhost:3000', '');
        if (linkPath.startsWith('https://businesssortedkent.co.uk')) linkPath = linkPath.replace('https://businesssortedkent.co.uk', '');
        
        outgoingLinks.add(linkPath);

        // Very basic heuristic for link categorisation
        if (linkPath === '/web-design' || linkPath === '/seo' || linkPath === '/lead-capture' || linkPath === '/business-automation' || linkPath.match(/^\/(web-design|seo|business-automation|digital-marketing)-/)) {
            // Count root services or service-towns
            // Exclude self-links or anchors
            if (!linkPath.includes('#') && linkPath !== path) serviceLinks++;
        }
        
        if (linkPath.startsWith('/guides')) guideLinks++;
        if (linkPath.startsWith('/towns')) townLinks++;
        if (linkPath.startsWith('/case-studies')) caseStudyLinks++;
      });

      // Verification logic based on rules
      if (serviceLinks < 2) issues.push({ type: 'Internal Linking', url: path, message: `Only links to ${serviceLinks} related service pages (Requirement: 2+)` });
      if (guideLinks < 1) issues.push({ type: 'Internal Linking', url: path, message: `Does not link to any guides` });
      // Town and Case Studies are marked "where relevant/appropriate", but we'll trigger notices for critical pages
      if (path.startsWith('/services') || path.match(/^\/(web-design|seo|business-automation|digital-marketing)$/)) {
         if (townLinks === 0) issues.push({ type: 'Internal Linking', url: path, message: `Service hub does not link to any local town pages` });
         if (caseStudyLinks === 0) issues.push({ type: 'Internal Linking', url: path, message: `Service hub does not link to any case studies` });
         
         // Service Completeness Check (Overview, How it works, CTA, FAQ, Process, etc.)
         const fullText = $full('body').text().toLowerCase();
         if (!fullText.includes('how') && !fullText.includes('process') && !fullText.includes('works')) {
            issues.push({ type: 'Completeness', url: path, message: `Missing "How it works/Process" section` });
         }
         if (!fullText.includes('faq') && !fullText.includes('frequently asked')) {
            issues.push({ type: 'Completeness', url: path, message: `Missing FAQ section` });
         }
      }
      
      if (path.startsWith('/towns/')) {
         const fullText = $full('body').text().toLowerCase();
         if (!fullText.includes('industr')) {
            issues.push({ type: 'Completeness', url: path, message: `Missing local "Industries" section` });
         }
         if (townLinks < 2) {
             issues.push({ type: 'Internal Linking', url: path, message: `Only links to ${townLinks} nearby towns` });
         }
      }

    } catch (e: any) {
      console.error(`Error processing ${path}: ${e.message}`);
    }
  }

  // Formatting Output
  console.log(`\n=============================================`);
  console.log(`📊 CONTENT & LINKING AUDIT SUMMARY`);
  console.log(`=============================================`);
  console.log(`Pages Audited: ${sitemapUrls.size}`);
  console.log(`\n---------------------------------------------`);
  
  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, ContentIssue[]>);

  for (const [type, typeIssues] of Object.entries(groupedIssues)) {
    console.log(`\n🚨 ${type} (${typeIssues.length} issues)`);
    typeIssues.forEach(i => {
      console.log(`  - [${i.url}] ${i.message}`);
    });
  }

  console.log(`\n=============================================\n`);
}

runContentAudit();
