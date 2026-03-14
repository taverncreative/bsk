import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { generateContent } from './generateContent';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedContent() {
  console.log("Fetching services, towns, and industries from Supabase...");

  const { data: services, error: servicesErr } = await supabase.from('services').select('*');
  const { data: towns, error: townsErr } = await supabase.from('towns').select('*');
  const { data: industries, error: indErr } = await supabase.from('industries').select('*');

  if (servicesErr || townsErr || indErr) {
    console.error("Error fetching data.", { servicesErr, townsErr, indErr });
    return;
  }

  console.log(`Found ${services?.length} services, ${towns?.length} towns, ${industries?.length} industries.`);

  if (!services || !towns || !industries) return;

  for (const service of services) {
    for (const town of towns) {
      for (const industry of industries) {
        console.log(`\nGenerating content for combination: ${service.name} - ${town.name} - ${industry.name}`);

        const content = generateContent({
          service: service.name,
          town: town.name,
          industry: industry.name,
        });

        // 1. Insert Local Intro (deduplicate on service_id + town_id as per schema constraints)
        const { data: existingIntro } = await supabase
          .from('local_intros')
          .select('id')
          .eq('service_id', service.id)
          .eq('town_id', town.id)
          .maybeSingle();

        if (!existingIntro) {
          const { error: introError } = await supabase
            .from('local_intros')
            .insert({
              service_id: service.id,
              town_id: town.id,
              content: content.localIntro
            });
          
          if (introError) {
             console.error(`Failed to insert localIntro for ${service.name}-${town.name}:`, introError.message);
          } else {
             console.log(`Inserted local intro for ${service.name} in ${town.name}`);
          }
        } else {
          console.log(`Local intro already exists for ${service.name} in ${town.name}, skipping.`);
        }

        // 2. Insert FAQs
        for (const f of content.faq) {
          const { data: existingFaq } = await supabase
            .from('faqs')
            .select('id')
            .eq('service_id', service.id)
            .eq('town_id', town.id)
            .eq('industry_id', industry.id)
            .eq('question', f.question)
            .maybeSingle();

          if (!existingFaq) {
            const { error: faqError } = await supabase
              .from('faqs')
              .insert({
                service_id: service.id,
                town_id: town.id,
                industry_id: industry.id,
                question: f.question,
                answer: f.answer
              });
            if (faqError) {
              console.error(`Failed to insert FAQ "${f.question}":`, faqError.message);
            } else {
              console.log(`Inserted FAQ: "${f.question}"`);
            }
          } else {
            console.log(`FAQ "${f.question}" already exists, skipping.`);
          }
        }

        // 3. Insert Industry Pain Points
        for (const pp of content.painPoints) {
           const { data: existingPp } = await supabase
             .from('industry_pain_points')
             .select('id')
             .eq('service_id', service.id)
             .eq('industry_id', industry.id)
             .eq('pain_point', pp)
             .maybeSingle();

           if (!existingPp) {
              const { error: ppError } = await supabase
                .from('industry_pain_points')
                .insert({
                  service_id: service.id,
                  industry_id: industry.id,
                  pain_point: pp
                });
              if (ppError) {
                console.error(`Failed to insert pain point "${pp}":`, ppError.message);
              } else {
                console.log(`Inserted Pain Point: "${pp}"`);
              }
           } else {
              console.log(`Pain point "${pp}" already exists, skipping.`);
           }
        }
      }
    }
  }

  console.log("\nSeeding complete!");
}

seedContent().catch(console.error);
