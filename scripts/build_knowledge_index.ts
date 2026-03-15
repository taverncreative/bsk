import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CORE_URLS = [
  { url: 'https://businesssortedkent.co.uk/', category: 'homepage' },
  { url: 'https://businesssortedkent.co.uk/about', category: 'about' },
  { url: 'https://businesssortedkent.co.uk/services', category: 'services' },
  { url: 'https://businesssortedkent.co.uk/web-design', category: 'core_service' },
  { url: 'https://businesssortedkent.co.uk/seo', category: 'core_service' },
  { url: 'https://businesssortedkent.co.uk/lead-capture', category: 'core_service' },
  { url: 'https://businesssortedkent.co.uk/business-automation', category: 'core_service' },
  { url: 'https://businesssortedkent.co.uk/branding', category: 'core_service' },
  { url: 'https://businesssortedkent.co.uk/towns', category: 'location' },
  { url: 'https://businesssortedkent.co.uk/industries', category: 'industry' },
];

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' '),
  });
  return response.data[0].embedding;
}

function chunkText(text: string, maxWords: number = 300): string[] {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = [];

  for (const word of words) {
    currentChunk.push(word);
    if (currentChunk.length >= maxWords) {
      chunks.push(currentChunk.join(' '));
      currentChunk = [];
    }
  }
  
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }
  return chunks;
}

async function fetchAndProcessPage(urlObj: { url: string, category: string }) {
  console.log(`Processing: ${urlObj.url}`);
  try {
    // Fetch local equivalent for speed and reliability, assuming dev server is running on 3000
    const localUrl = urlObj.url.replace('https://businesssortedkent.co.uk', 'http://localhost:3000');
    
    const response = await fetch(localUrl);
    if (!response.ok) {
       console.log(`Skipping ${localUrl} (Not found)`);
       return;
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove nav, footer, scripts, styles
    $('nav, footer, script, style, noscript, svg, header').remove();
    
    const title = $('title').text() || urlObj.url;
    let mainContent = $('main').text();
    if (!mainContent) mainContent = $('body').text();
    
    // Clean up text
    const cleanText = mainContent.replace(/\s+/g, ' ').trim();
    if (!cleanText || cleanText.length < 50) return;

    const chunks = chunkText(cleanText, 300);

    for (let i = 0; i < chunks.length; i++) {
        const text = chunks[i];
        if (text.length < 50) continue; // Skip tiny chunks

        const embedding = await generateEmbedding(text);
        
        await supabase.from('knowledge_index').insert({
            page_title: title,
            url: urlObj.url,
            content_category: urlObj.category,
            keywords: '',
            content: text,
            embedding
        });
        
        console.log(`- Inserted chunk ${i+1}/${chunks.length} for ${title}`);
    }

  } catch (error) {
    console.error(`Error processing ${urlObj.url}:`, error);
  }
}

async function processGuides() {
    console.log("Processing Guides from Database...");
    const { data: guides } = await supabase.from('guides').select('id, title, slug, content');
    
    if (guides) {
        for (const guide of guides) {
            const cleanText = guide.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const chunks = chunkText(cleanText, 300);
            
            for (let i = 0; i < chunks.length; i++) {
                const text = chunks[i];
                if (text.length < 50) continue;

                const embedding = await generateEmbedding(text);
                
                await supabase.from('knowledge_index').insert({
                    page_title: guide.title,
                    url: `/guides/${guide.slug}`,
                    content_category: 'guides',
                    keywords: '',
                    content: text,
                    embedding
                });
                console.log(`- Inserted guide chunk ${i+1}/${chunks.length} for ${guide.title}`);
            }
        }
    }
}

async function processCaseStudies() {
    console.log("Processing Case Studies from Database...");
    const { data: cases } = await supabase.from('case_studies').select('id, title, slug, content, expected_results');
    
    if (cases) {
        for (const cs of cases) {
            const cleanText = `${cs.content} ${cs.expected_results}`.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const chunks = chunkText(cleanText, 300);
            
            for (let i = 0; i < chunks.length; i++) {
                const text = chunks[i];
                if (text.length < 50) continue;

                const embedding = await generateEmbedding(text);
                
                await supabase.from('knowledge_index').insert({
                    page_title: cs.title,
                    url: `/case-studies/${cs.slug}`,
                    content_category: 'case_studies',
                    keywords: '',
                    content: text,
                    embedding
                });
                console.log(`- Inserted case study chunk ${i+1}/${chunks.length} for ${cs.title}`);
            }
        }
    }
}

async function main() {
  console.log("Starting Knowledge Index Build...");
  
  // Clear existing index to prevent massive duplication on rebuild
  const { error } = await supabase.from('knowledge_index').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
      console.log("Could not clear existing knowledge_index. Ensure table exists.", error);
  }

  // 1. Core pages
  for (const page of CORE_URLS) {
    await fetchAndProcessPage(page);
  }
  
  // 2. Guides
  await processGuides();
  
  // 3. Case Studies
  await processCaseStudies();
  
  console.log("Knowledge index fully rebuilt!");
}

main().catch(console.error);
