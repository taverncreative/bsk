/**
 * Google Indexing API - Bulk URL Submission Script
 *
 * Fetches your sitemap and submits every URL to Google for indexing.
 *
 * SETUP:
 * 1. Go to https://console.cloud.google.com
 * 2. Create a project (or use existing)
 * 3. Enable "Web Search Indexing API"
 * 4. Go to IAM & Admin → Service Accounts → Create Service Account
 * 5. Download the JSON key file
 * 6. Save it as: scripts/google-service-account.json
 * 7. Copy the service account email (looks like: name@project.iam.gserviceaccount.com)
 * 8. In Google Search Console → Settings → Users and permissions → Add user
 *    → paste the service account email → set as Owner
 *
 * USAGE:
 *   npx tsx scripts/submitToGoogle.ts
 *
 * OPTIONS:
 *   --dry-run    List URLs without submitting
 *   --limit=N    Only submit first N URLs
 *   --delay=N    Delay between requests in ms (default: 100)
 */

import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const SITEMAP_URL = 'https://businesssortedkent.co.uk/sitemap.xml';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'google-service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// Parse CLI args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : 0;
const delayArg = args.find(a => a.startsWith('--delay='));
const delay = delayArg ? parseInt(delayArg.split('=')[1]) : 100;

// ─── JWT Token Generation ───────────────────────────────

function base64url(str: string): string {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJWT(serviceAccount: any): string {
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: SCOPES.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const signInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;

  const crypto = require('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = sign.sign(serviceAccount.private_key, 'base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return `${signInput}.${signature}`;
}

async function getAccessToken(serviceAccount: any): Promise<string> {
  const jwt = createJWT(serviceAccount);

  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error(`Token error: ${data}`));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// ─── Sitemap Fetcher ────────────────────────────────────

async function fetchSitemap(url: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Parse XML to extract <loc> URLs
        const urls: string[] = [];
        const locRegex = /<loc>(.*?)<\/loc>/g;
        let match;
        while ((match = locRegex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', reject);
  });
}

// ─── URL Submission ─────────────────────────────────────

async function submitUrl(url: string, accessToken: string): Promise<{ url: string; status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    });

    const urlObj = new URL(API_ENDPOINT);
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode || 0, body: data });
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Main ───────────────────────────────────────────────

async function main() {
  console.log('🔍 Google Indexing API - Bulk URL Submission');
  console.log('─'.repeat(50));

  // 1. Fetch sitemap
  console.log(`\n📡 Fetching sitemap: ${SITEMAP_URL}`);
  let urls = await fetchSitemap(SITEMAP_URL);
  console.log(`   Found ${urls.length} URLs`);

  if (limit > 0) {
    urls = urls.slice(0, limit);
    console.log(`   Limited to first ${limit} URLs`);
  }

  // 2. Dry run mode
  if (dryRun) {
    console.log('\n📋 DRY RUN - URLs that would be submitted:\n');
    urls.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));
    console.log(`\n   Total: ${urls.length} URLs`);
    return;
  }

  // 3. Load service account
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`\n❌ Service account key not found at:\n   ${SERVICE_ACCOUNT_PATH}`);
    console.error('\n   Follow the setup instructions at the top of this file.');
    console.error('   Download your service account JSON and save it as:');
    console.error('   scripts/google-service-account.json\n');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8'));
  console.log(`\n🔑 Service account: ${serviceAccount.client_email}`);

  // 4. Get access token
  console.log('🔐 Getting access token...');
  const accessToken = await getAccessToken(serviceAccount);
  console.log('   Token acquired');

  // 5. Submit URLs
  console.log(`\n🚀 Submitting ${urls.length} URLs (${delay}ms delay between requests)\n`);

  let success = 0;
  let failed = 0;
  const errors: { url: string; status: number; body: string }[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const result = await submitUrl(url, accessToken);
      if (result.status === 200) {
        success++;
        process.stdout.write(`   ✅ [${i + 1}/${urls.length}] ${url}\n`);
      } else if (result.status === 429) {
        // Rate limited - wait and retry
        console.log(`   ⏳ [${i + 1}/${urls.length}] Rate limited, waiting 60s...`);
        await sleep(60000);
        const retry = await submitUrl(url, accessToken);
        if (retry.status === 200) {
          success++;
          process.stdout.write(`   ✅ [${i + 1}/${urls.length}] ${url} (retry)\n`);
        } else {
          failed++;
          errors.push(retry);
          process.stdout.write(`   ❌ [${i + 1}/${urls.length}] ${url} (${retry.status})\n`);
        }
      } else {
        failed++;
        errors.push(result);
        process.stdout.write(`   ❌ [${i + 1}/${urls.length}] ${url} (${result.status})\n`);
      }
    } catch (err: any) {
      failed++;
      process.stdout.write(`   ❌ [${i + 1}/${urls.length}] ${url} (${err.message})\n`);
    }

    if (i < urls.length - 1) await sleep(delay);
  }

  // 6. Summary
  console.log('\n' + '─'.repeat(50));
  console.log('📊 Submission Summary');
  console.log(`   ✅ Success: ${success}`);
  console.log(`   ❌ Failed:  ${failed}`);
  console.log(`   📄 Total:   ${urls.length}`);

  if (errors.length > 0) {
    console.log('\n⚠️  Failed URLs:');
    errors.forEach(e => {
      console.log(`   ${e.url} → ${e.status}: ${e.body.slice(0, 100)}`);
    });
  }

  console.log('\n✨ Done! Google will typically crawl submitted URLs within hours.\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
