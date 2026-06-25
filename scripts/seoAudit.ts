/**
 * Local & Production SEO Audit Script
 * Crawls sitemap.xml and validates core structural elements against raw HTML strings.
 */

const SITEMAP_URL = process.env.SITEMAP_URL || 'http://localhost:3000/sitemap.xml';
// Allow overriding localhost vs production via ENV without modifying the code lock
const BASE_URL_REPLACE = process.env.BASE_URL_REPLACE || 'http://localhost:3000';

async function runAudit() {
  console.log(`\n🔍 Initiating SEO Audit against: ${SITEMAP_URL}`);
  
  try {
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) {
      console.error(`\n❌ Failed to fetch sitemap. Status: ${sitemapRes.status}`);
      console.log(`Make sure your development server is actively running (npm run dev) if auditing locally.`);
      process.exit(1);
    }
    
    const xml = await sitemapRes.text();
    
    // Extract all <loc> nodes dynamically from XML
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    
    console.log(`📄 Found ${urls.length} URLs in sitemap to audit.\n`);
    
    if (urls.length === 0) {
      console.log('No URLs found to audit. Exiting.');
      return;
    }
    
    let issuesFound = 0;
    
    for (const originalUrl of urls) {
      // Instantly rewrite domains so we can audit the production map against our local compiler array
      let targetUrl = originalUrl;
      if (BASE_URL_REPLACE && targetUrl.includes('https://businesssortedkent.co.uk')) {
         targetUrl = targetUrl.replace('https://businesssortedkent.co.uk', BASE_URL_REPLACE);
      }
      
      try {
        const pageRes = await fetch(targetUrl);
        const html = await pageRes.text();
        
        const missing: string[] = [];
        
        // 1. Missing Title (checks for open tags, valid contents, and close tags)
        if (!/<title[^>]*>[\s\S]+?<\/title>/i.test(html)) {
          missing.push('Title');
        }
        
        // 2. Missing Description 
        // Checks that both name="description" and content="value" exist globally near each other
        const hasDescriptionMeta = /<meta[^>]+name=["']description["'][^>]*>/i.test(html) || 
                                   /<meta[^>]+content=["'][^"']*["'][^>]+name=["']description["'][^>]*>/i.test(html);
        if (!hasDescriptionMeta) {
          missing.push('Description');
        } else {
            // Also ensure it is not empty
            if (!/content=["'][^"']+["']/i.test(html.match(/<meta[^>]+description[^>]+>/i)?.[0] || '')) {
                missing.push('Description (Empty)');
            }
        }
        
        // 3. Missing H1
        if (!/<h1[^>]*>[\s\S]+?<\/h1>/i.test(html)) {
          missing.push('H1');
        }
        
        // 4. Missing Canonical
        const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);
        if (!hasCanonical) {
          missing.push('Canonical');
        }
        
        // Provide clear string feedback array
        if (missing.length > 0) {
          console.warn(`❌ [FAIL] ${originalUrl} -> Missing: ${missing.join(', ')}`);
          issuesFound++;
        } else {
          console.log(`✅ [PASS] ${originalUrl}`);
        }
        
      } catch (err: any) {
        console.error(`⚠️ [ERROR] Failed to fetch layout data for ${targetUrl}: ${err.message}`);
        issuesFound++;
      }
    }
    
    console.log('\n=============================================');
    if (issuesFound > 0) {
      console.log(`⚠️ Audit Complete: Found critical SEO issues on ${issuesFound} out of ${urls.length} tracked endpoints.`);
    } else {
      console.log(`🎉 Audit Complete: All ${urls.length} pages passed structural SEO validation perfectly!`);
    }
    console.log('=============================================\n');

  } catch (globalErr: any) {
    console.error(`Critical script failure:`, globalErr.message);
  }
}

runAudit();
