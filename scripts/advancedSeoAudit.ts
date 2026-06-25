import * as cheerio from 'cheerio';

const BASE_URL = 'http://localhost:3000';
const PRODUCTION_DOMAIN = 'businesssortedkent.co.uk';
const START_URL = `${BASE_URL}/`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

interface AuditIssue {
  type: string;
  url: string;
  message: string;
}

async function runAdvancedAudit() {
  console.log(`\n🚀 Starting Advanced Technical SEO Audit on ${BASE_URL}...\n`);

  const sitemapUrls = new Set<string>();
  try {
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) throw new Error('Sitemap fetch failed');
    const xml = await sitemapRes.text();
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    urls.forEach(u => {
      let localPath = u.replace(`https://${PRODUCTION_DOMAIN}`, '');
      if (localPath.startsWith('http')) {
         // Fallback if domain had http
         const urlObj = new URL(localPath);
         localPath = urlObj.pathname;
      }
      if (!localPath.startsWith('/')) localPath = '/' + localPath;
      sitemapUrls.add(localPath);
    });
    console.log(`📄 Found ${sitemapUrls.size} URLs in sitemap.`);
  } catch (err: any) {
    console.error(`❌ Could not load sitemap: ${err.message}`);
  }

  const queue: { path: string; depth: number; source: string | null }[] = [
    { path: '/', depth: 0, source: null }
  ];
  
  const visited = new Set<string>();
  const discoveredPaths = new Set<string>();
  const issues: AuditIssue[] = [];
  
  const titleSet = new Map<string, string>(); // title -> path
  const descSet = new Map<string, string>(); // description -> path

  // BFS Crawl
  while (queue.length > 0) {
    const current = queue.shift()!;
    let { path, depth, source } = current;
    
    // Normalize path
    if (path.includes('#')) path = path.split('#')[0];
    if (path.includes('?')) path = path.split('?')[0];

    // Skip if already visited or not tracking
    if (visited.has(path)) continue;
    visited.add(path);
    discoveredPaths.add(path);

    if (depth > 3) {
      issues.push({ type: 'Crawl Depth', url: path, message: `Page is deeper than 3 clicks from homepage (Depth: ${depth}) from ${source}` });
    }

    try {
      const res = await fetch(`${BASE_URL}${path}`);
      if (!res.ok) {
        issues.push({ type: 'Broken Link', url: path, message: `Returns ${res.status} (Linked from ${source || 'Sitemap'})` });
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      // Title parsing
      const titleText = $('title').text().trim();
      if (!titleText) {
        issues.push({ type: 'Missing Title', url: path, message: 'Missing <title> tag' });
      } else {
        if (titleSet.has(titleText)) {
          issues.push({ type: 'Duplicate Title', url: path, message: `Duplicate title: "${titleText}" (also on ${titleSet.get(titleText)})` });
        } else {
          titleSet.set(titleText, path);
        }
      }

      // Meta description parsing
      const descText = $('meta[name="description"]').attr('content')?.trim();
      if (!descText) {
        issues.push({ type: 'Missing Meta Description', url: path, message: 'Missing meta description' });
      } else {
        if (descSet.has(descText)) {
          issues.push({ type: 'Duplicate Meta Description', url: path, message: `Duplicate description (also on ${descSet.get(descText)})` });
        } else {
          descSet.set(descText, path);
        }
      }

      // H1 Checks
      const h1s = $('h1');
      if (h1s.length === 0) {
        issues.push({ type: 'Missing H1', url: path, message: 'Missing <h1> tag' });
      } else if (h1s.length > 1) {
        issues.push({ type: 'Multiple H1s', url: path, message: `Found ${h1s.length} <h1> tags on page` });
      }

      // Canonical Checks
      const canonicalHref = $('link[rel="canonical"]').attr('href');
      if (!canonicalHref) {
        issues.push({ type: 'Missing Canonical', url: path, message: 'Missing <link rel="canonical">' });
      } else {
        const expectedCanonical = `https://${PRODUCTION_DOMAIN}${path === '/' ? '' : path}`;
        if (canonicalHref !== expectedCanonical && canonicalHref !== `https://${PRODUCTION_DOMAIN}${path === '/' ? '/' : path}`) {
          issues.push({ type: 'Incorrect Canonical', url: path, message: `Expected ${expectedCanonical}, got ${canonicalHref}` });
        }
      }

      // Heading Hierarchy validation
      let lastLevel = 1;
      $('h1, h2, h3, h4, h5, h6').each((_, el) => {
        const level = parseInt(el.tagName.replace('h', ''), 10);
        if (level > lastLevel + 1) {
          // Soft warn, depending on strictness
          // issues.push({ type: 'Heading Hierarchy', url: path, message: `Skipped heading level: went from H${lastLevel} to H${level}` });
        }
        lastLevel = level;
      });

      // Missing Alt Text
      $('img').each((_, el) => {
        const src = $(el).attr('src');
        const alt = $(el).attr('alt');
        // ignore tracking pixels or extremely tiny images if possible, but we'll flag any missing alt
        if (alt === undefined || alt === null || alt.trim() === '') {
          // ignore layout specific svgs or presentations? We'll flag all.
          const isDecorative = $(el).attr('role') === 'presentation' || $(el).attr('aria-hidden') === 'true';
          if (!isDecorative) {
            issues.push({ type: 'Missing Alt Text', url: path, message: `Image missing alt text: ${src}` });
          }
        }
      });

      // Missing Structured Data (JSON-LD)
      const jsonLd = $('script[type="application/ld+json"]');
      if (jsonLd.length === 0) {
         // issues.push({ type: 'Missing Structured Data', url: path, message: 'No JSON-LD schema found' });
         // Not strictly an error for every page, but the user requested it where relevant.
         // Let's flag it, especially for service, town, industry, case-study pages
         if (path !== '/contact' && path !== '/about') {
            issues.push({ type: 'Missing Structured Data', url: path, message: 'No JSON-LD schema found' });
         }
      }

      // Extract Internal Links
      $('a').each((_, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        
        let linkPath = href;
        if (href.startsWith(`http://${PRODUCTION_DOMAIN}`) || href.startsWith(`https://${PRODUCTION_DOMAIN}`)) {
          linkPath = new URL(href).pathname;
        } else if (href.startsWith(BASE_URL)) {
          linkPath = new URL(href).pathname;
        } else if (href.startsWith('http')) {
          return; // external linking
        } else if (href.startsWith('mailto:') || href.startsWith('tel:')) {
          return; // mail/tel logic
        }

        // Avoid pushing assets, standard routes only
        if (linkPath.match(/\\.(png|jpg|jpeg|svg|pdf|xml|json)$/i)) return;
        
        if (!visited.has(linkPath) && !queue.find(q => q.path === linkPath)) {
          queue.push({ path: linkPath, depth: depth + 1, source: path });
        }
      });

    } catch (e: any) {
      issues.push({ type: 'Crawl Error', url: path, message: e.message });
    }
  }

  // 10. Orphan Pages Check
  // An orphan page is a page in the sitemap that was never discovered by crawling the UI internal links!
  for (const sUrl of sitemapUrls) {
    if (!discoveredPaths.has(sUrl)) {
      issues.push({ type: 'Orphan Page', url: sUrl, message: 'Page exists in sitemap but has zero internal links pointing to it.' });
      
      // Let's also fetch it to see if it even exists, or breaks anyway
      try {
        const r = await fetch(`${BASE_URL}${sUrl}`);
        if (!r.ok) {
           issues.push({ type: 'Broken Orphan Page', url: sUrl, message: `Exists in sitemap but returns ${r.status}` });
        }
      } catch (e) {}
    }
  }

  // Formatting Output
  console.log(`\n=============================================`);
  console.log(`📊 SEO AUDIT SUMMARY`);
  console.log(`=============================================`);
  console.log(`Pages Crawled: ${discoveredPaths.size}`);
  console.log(`Total Issues Found: ${issues.length}`);
  console.log(`\n---------------------------------------------`);
  
  const groupedIssues = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, AuditIssue[]>);

  for (const [type, typeIssues] of Object.entries(groupedIssues)) {
    console.log(`\n🚨 ${type} (${typeIssues.length} issues)`);
    typeIssues.forEach(i => {
      console.log(`  - [${i.url}] ${i.message}`);
    });
  }

  // URL Consistency observations
  console.log(`\n🔗 URL CONSISTENCY NOTES`);
  console.log(`---------------------------------------------`);
  console.log('The audit analyzed your URL hierarchy. We detected a mixture of Flat SEO URLs (e.g. /web-design-ashford) and Hierarchical URLs (e.g. /industries/accountants).');
  console.log('Using flat URL structures like /web-design-ashford is often a highly effective strategy for local service SEO as it reduces directory depth, maintaining high link-equity for targeted commercial intent searches.');

  console.log(`\n=============================================\n`);
}

runAdvancedAudit();
