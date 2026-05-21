import { ReactNode } from 'react';
import Link from 'next/link';
import ServiceHero from '@/components/sections/ServiceHero';
import Services from '@/components/sections/Services';
import CaseStudySection from '@/components/sections/CaseStudySection';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import { getServiceFAQs } from '@/components/content/ServiceFAQs';
import { getAllCaseStudies } from '@/lib/queries/caseStudies';

interface TownRef {
  name: string;
  slug: string;
}

interface CaseStudyRef {
  title: string;
  slug: string;
  industry: string;
  town: string;
}

interface ServicePageProps {
  serviceName: string;
  serviceSlug: string;
  description: string;
  towns: TownRef[];
  caseStudies?: CaseStudyRef[];
  guides?: any[];
}

interface ContentItem {
  title: string;
  body: string;
}

interface ProcessStep {
  num: string;
  title: string;
  body: string;
}

interface ServiceContent {
  hero: {
    title: ReactNode;
    subtitle: string;
    primaryCTA?: { text: string; href: string };
    secondaryCTA?: { text: string; href: string };
  };
  included: {
    eyebrow: string;
    headline: string;
    intro?: string;
    items: ContentItem[];
  };
  process?: {
    eyebrow: string;
    headline: string;
    intro?: string;
    steps: ProcessStep[];
  };
  examples?: {
    eyebrow: string;
    headline: string;
    intro?: string;
    items: ContentItem[];
  };
  cta: {
    title: string;
    paragraph: string;
    button?: string;
  };
}

const serviceContent: Record<string, ServiceContent> = {
  'web-design': {
    hero: {
      title: 'Websites built faster. Priced honestly.',
      subtitle:
        '£280 for a classic small business website. E-commerce and anything custom priced on application. Built properly, indexed cleanly, yours in 1 to 2 weeks.',
      primaryCTA: { text: 'See what yours could look like', href: '/free-preview' },
      secondaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What £280 covers',
      headline: 'A working small business website, built properly.',
      intro:
        'Homepage, services, about, contact, plus a couple of supporting pages. Designed, built, launched, and indexed by Google. Hand-checked Next.js code under the hood, not template assembly.',
      items: [
        {
          title: '01 · Discovery',
          body: 'We find out what you do, who you serve, what makes you different from the four other firms doing similar work down the road. The site is built on real understanding, not assumptions.',
        },
        {
          title: '02 · Mobile-first design',
          body: 'Designed for phones first. Most of your visitors arrive on a 5-inch screen, and most agency sites are still designed desktop-first then squashed. We do it the other way around.',
        },
        {
          title: '03 · Real design decisions',
          body: 'Type, hierarchy, spacing, colour, image treatment. The kind of choices that come from years of graphic design background, not AI defaults. Your site looks like your business, not a template.',
        },
        {
          title: '04 · Performance',
          body: 'Sub-2-second loads. Lighthouse 95+ for performance, accessibility, best practices and SEO. Images compressed and lazy-loaded. Fonts loaded properly. The little things that decide whether Google ranks you.',
        },
        {
          title: '05 · SEO foundations',
          body: 'Sitemap submitted, structured data set up, robots.txt configured, meta tags written, headings structured. Local SEO basics baked in so Google can find every page from day one.',
        },
        {
          title: '06 · Google Business profile',
          body: 'Set up or refreshed alongside the launch. Photos, hours, services, categories and address all configured properly. The map pack is where a lot of local searches actually land.',
        },
        {
          title: '07 · Forms that work',
          body: 'Contact and quote forms that send to you, send a confirmation to the customer, and don’t silently fail. Spam protected without forcing customers through a 20-second CAPTCHA.',
        },
        {
          title: '08 · Hosting (optional)',
          body: '£18 a month covers fast UK hosting, SSL, weekly backups, security patches, uptime monitoring. Or bring your own — we’ll deploy to whatever you’re using.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      headline: 'Four steps from first chat to live site.',
      steps: [
        {
          num: '01',
          title: 'A proper chat',
          body:
            'We find out what you do, who your customers are, and what is driving you mad about your current site. About 30 minutes by phone or in person.',
        },
        {
          num: '02',
          title: 'A free preview',
          body:
            'A working version at a temporary URL within 2 to 3 working days. Real content, real design, real working forms. You look at it on your phone and your laptop.',
        },
        {
          num: '03',
          title: 'You decide',
          body:
            'Like it? £280 to finish and launch. Want changes? We do them. Not for you? No charge. No card details taken upfront, no awkward follow-up.',
        },
        {
          num: '04',
          title: 'Live on your domain',
          body:
            'We connect your domain, switch on hosting and analytics, submit your sitemap to Google, and hand over login details so you can edit content yourself if you want.',
        },
      ],
    },
    examples: {
      eyebrow: 'Worth saying out loud',
      headline: 'What we won’t do.',
      items: [
        {
          title: 'We won’t lock you into a contract',
          body: 'You own the site, the code, the domain, the content. Walk away whenever you want. We’d rather earn the next month than tie you in.',
        },
        {
          title: 'We won’t use templates and call it bespoke',
          body: 'Every site is built from the ground up in Next.js. No drag-and-drop builders pretending to be agency work. You get real code that loads fast and ranks well.',
        },
        {
          title: 'We won’t pretend AI didn’t change this',
          body: 'AI tooling is how the work got faster, and that’s why £280 is realistic. The design decisions, editing and final checks are still done by people. We don’t hide it.',
        },
      ],
    },
    cta: {
      title: 'Want to see what yours could look like?',
      paragraph:
        'Send a quick brief and we will build a preview within 2 to 3 working days. No card details, no follow-up if you pass.',
      button: 'Get a free preview',
    },
  },

  seo: {
    hero: {
      title: 'SEO that gets your business found.',
      subtitle:
        '£45 an hour. From one hour a month. No retainer, no rolling contract. You see exactly what got done and what moved. SEO for everyday businesses who would rather pay someone to do it than learn it themselves.',
      primaryCTA: { text: 'Get a free SEO audit', href: '/contact' },
      secondaryCTA: { text: 'See pricing', href: '#services' },
    },
    included: {
      eyebrow: 'How SEO actually works',
      headline: 'No secrets. Just work that needs doing.',
      intro:
        'SEO isn’t a black art, especially now. With AI tools, the methodology is more public than ever. We’re not here to gatekeep how it works. We’re here to do it because you would rather be running your business. Here’s the work, in plain language.',
      items: [
        {
          title: '01 · Keyword research',
          body: 'We find the actual phrases your customers type. Not what someone in marketing thinks they should type. Tools like Google Keyword Planner, Ahrefs and SEMrush give us volume and intent data. We then test it against real local search patterns and your existing analytics.',
        },
        {
          title: '02 · Competitor analysis',
          body: 'We look at who currently ranks for those phrases in your area. What pages they’ve built. What backlinks they’ve earned. Where they’re weak. The aim is to find the gaps you can realistically win — not to copy.',
        },
        {
          title: '03 · Technical SEO',
          body: 'The boring foundations Google quietly punishes when broken. Site speed, mobile rendering, structured data, internal linking, sitemaps, robots.txt, canonical tags, broken links, duplicate content. Most local sites have a dozen issues here that are quick wins.',
        },
        {
          title: '04 · On-page SEO',
          body: 'Page titles, meta descriptions, heading structure, image alt text, schema markup, internal anchors. Each page tuned to one main search intent and the phrases that match it.',
        },
        {
          title: '05 · Local SEO',
          body: 'Google Business Profile set up properly, categorised correctly, photos uploaded, posts scheduled, reviews requested and replied to. NAP consistency (name, address, phone) across local citations. The map pack is its own game.',
        },
        {
          title: '06 · Content',
          body: 'Service pages, location pages, FAQs, guides. Written to answer the question someone actually typed. Not stuffed with keywords. We use AI to draft and edit by hand to keep it sounding like a person.',
        },
        {
          title: '07 · GEO and AI search',
          body: 'Generative Engine Optimisation. As more people search via ChatGPT, Perplexity, Google AI Overviews and Bing Chat, the rules are shifting. Structured data, clear answers and authority signals matter even more. We build for both classical Google and the LLM-based search engines that are coming up fast.',
        },
        {
          title: '08 · Backlinks and citations',
          body: 'Mentions on local directories, partner sites, supplier sites, industry directories. Quality over quantity. We don’t buy links — that gets sites penalised — but we do find the legitimate places your business should be listed.',
        },
        {
          title: '09 · Reporting',
          body: 'A one-page summary every month. What we did, what ranked, what moved, what we suggest next. No 40-page PDFs full of charts you won’t read.',
        },
      ],
    },
    process: {
      eyebrow: 'How working together works',
      headline: 'Audit, plan, work, report. Repeat.',
      steps: [
        {
          num: '01',
          title: 'Free SEO audit',
          body:
            'You send us your site and the searches that matter to you. We run a proper audit covering technical, on-page, local, content and competitor angles. You get a plain summary of where you currently stand and what is realistic.',
        },
        {
          num: '02',
          title: 'A plain plan, costed in hours',
          body:
            'We pick the highest-impact wins first. Each item costed in hours. You decide what to do and in what order. No "package" you have to take whole.',
        },
        {
          num: '03',
          title: 'The work',
          body:
            'You pick how many hours a month — could be one, could be ten. We log every hour and tell you exactly what got done. Walk away whenever it stops being useful.',
        },
        {
          num: '04',
          title: 'Monthly report',
          body:
            'Every month: a one-pager covering what we worked on, what ranked, what moved up or down, what the data is telling us, what to do next.',
        },
      ],
    },
    examples: {
      eyebrow: 'Worth saying out loud',
      headline: 'What we won’t do.',
      intro: 'We are honest about a few things.',
      items: [
        {
          title: 'We won’t guarantee a #1 ranking',
          body: 'Anyone who does is either lying or planning to gamble with your site. Rankings depend on Google’s algorithm, your competition and the work that goes in. We can put you in a much better position than you are now, and we tell you what is realistic.',
        },
        {
          title: 'We won’t lock you into a contract',
          body: 'SEO is hourly. If you want to stop, stop. If you want to pause for a month, pause. The work compounds when it’s consistent but it isn’t held hostage to a 12-month commitment.',
        },
        {
          title: 'We won’t pretend AI doesn’t matter',
          body: 'AI has changed how we work and how search itself works. We use the tools, we keep up with how LLM-based search engines surface businesses, and we factor that into the plan. Anyone telling you nothing has changed is not paying attention.',
        },
        {
          title: 'We won’t bury you in jargon',
          body: 'You don’t need to know what TF-IDF or E-E-A-T mean. We use plain English in every report and every conversation. If you want the technical detail you can ask, but you should never have to.',
        },
      ],
    },
    cta: {
      title: 'Want to know where you currently rank?',
      paragraph:
        'Send your website and the searches that matter to you. We will come back with a plain audit, free of charge. If it makes sense to start, we will quote the hours. If it doesn’t, we will tell you.',
      button: 'Get a free SEO audit',
    },
  },

  'lead-capture': {
    hero: {
      title: 'Stop missing the enquiries you’d otherwise lose.',
      subtitle:
        'Forms, instant replies, missed-call recovery and follow-ups so a busy day on the job does not cost you the work. Priced on the brief once we know what you handle now.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What we build',
      headline: 'The bits between someone showing interest and you booking the job.',
      intro:
        'Most enquiries get lost in the gap between someone showing interest and you replying. Phones go to voicemail, forms go to a spam folder, emails sit unanswered for an afternoon. This is the system that fills that gap.',
      items: [
        {
          title: '01 · Contact forms that convert',
          body: 'Short, friendly, on the right page, asking the right questions. Not a 14-field interrogation that scares people off. We design forms around the minimum information needed to qualify the enquiry.',
        },
        {
          title: '02 · Instant autoresponders',
          body: 'The second someone submits a form they get a useful reply by email. Not "thank you for your enquiry" — something with what happens next, when to expect a call, a useful link, your hours. People stay warm when they feel heard.',
        },
        {
          title: '03 · Missed-call SMS recovery',
          body: 'Phone rings, you’re on a job, can’t pick up. An automatic text fires within seconds: "Sorry I missed your call, I’ll ring back later today. Or book a slot here." Customers who would have called the next firm in the list stay yours.',
        },
        {
          title: '04 · Lead routing',
          body: 'New enquiries land in the right inbox, with the right context. If you have a partner who handles the south coast and you handle Ashford, leads go to the right person automatically. CRM tagged, ready to action.',
        },
        {
          title: '05 · Follow-up sequences',
          body: 'A polite nudge two days after a quote, a check-in a week later, a final message after two weeks. All written in your voice. Most enquiries that go quiet need one of these to come back.',
        },
        {
          title: '06 · Live chat or AI chatbot',
          body: 'If you get the same five questions every day, a chatbot trained on your services handles them out of hours. Real questions still come straight to you, properly summarised.',
        },
        {
          title: '07 · Tracking and attribution',
          body: 'You see where leads actually come from. Google search, Facebook, that flyer, word of mouth, the Yellow Pages-style directory you tried last year. The data tells you where to spend more and where to stop.',
        },
        {
          title: '08 · Spam protection',
          body: 'Honeypots, rate limiting, server-side validation. We block the bots without forcing customers to solve nine puzzles to send you a quote request.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      headline: 'Audit, design, build, watch.',
      steps: [
        {
          num: '01',
          title: 'Audit what happens now',
          body:
            'We walk through every way someone currently tries to contact you. Phone, form, email, social DM, WhatsApp. We find the gaps where leads currently leak.',
        },
        {
          num: '02',
          title: 'Design the flow',
          body:
            'A plain document showing each step from first contact to booked job, end to end. You read it, you sign it off, then we build to it.',
        },
        {
          num: '03',
          title: 'Build it',
          body:
            'Forms, automations, integrations and notifications all set up. Connected to whatever email and CRM you already use. Tested end-to-end with real submissions before going live.',
        },
        {
          num: '04',
          title: 'Watch and refine',
          body:
            'After two weeks we look at real data. What got submitted, what got replied to, where customers dropped off. Anything not working gets fixed.',
        },
      ],
    },
    cta: {
      title: 'Tired of replying to enquiries at 9pm?',
      paragraph:
        'Send a quick note about how you currently handle leads and what is annoying about it. We will quote a fix.',
      button: 'Get in touch',
    },
  },

  'business-automation': {
    hero: {
      title: 'Automations, CRMs and the boring admin, handled.',
      subtitle:
        'CRM setup, job tracking, follow-ups, repeat invoicing, AI-assisted workflows. The repeat work that eats your Sundays, off your plate. Priced on the brief once we know what you actually run.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What gets handled',
      headline: 'The repeat work, automated. The exceptions, escalated.',
      intro:
        'Every business has a handful of small jobs that have to happen every day, every week or every month. Automation does them in the background. You only get involved when something needs a real decision.',
      items: [
        {
          title: '01 · CRM setup',
          body: 'One place for customers, jobs, quotes, invoices and history. No more spreadsheets, sticky notes, three notebooks and your wife’s phone. We pick the right CRM for your size — HubSpot, Pipedrive, Notion, Airtable, Servoro — and set it up properly.',
        },
        {
          title: '02 · Lead-to-customer flow',
          body: 'New enquiry → logged contact → qualified → quoted → won → onboarded. All tracked in one timeline. You see where every potential customer is and what needs doing next.',
        },
        {
          title: '03 · Follow-up sequences',
          body: 'Quotes that stayed quiet get a polite nudge after two days, a check-in after a week, a final message after two. Customers get a follow-up after the job, a request for repeat work, a seasonal reminder if it fits.',
        },
        {
          title: '04 · Invoicing and chasing',
          body: 'Invoices generated automatically when a job marks complete. Sent to the customer, reminders fire on the schedule you choose (gentle at first, firmer after 30 days). Payments reconcile back to the CRM.',
        },
        {
          title: '05 · Appointment reminders',
          body: 'Customers get a confirmation when booked, a reminder the day before, a "we’re on our way" message if you want. No-shows drop sharply when the customer has had three touches.',
        },
        {
          title: '06 · Review requests',
          body: 'After every job, a polite ask for a Google review fires automatically. Reviews drive both local SEO and customer confidence. Most businesses just forget to ask.',
        },
        {
          title: '07 · AI-assisted workflows',
          body: 'Drafting quotes from a customer brief, summarising long emails, sorting incoming enquiries by urgency, generating job descriptions for staff. AI as an assistant, not a replacement.',
        },
        {
          title: '08 · Data sync between your tools',
          body: 'Your booking system, accounting software, email marketing, CRM and website forms all talking to each other. No double-entry. No information stranded on one platform.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      headline: 'Map your business, build the system around it.',
      steps: [
        {
          num: '01',
          title: 'Audit what eats your time',
          body:
            'We sit down with you (and your team if you have one) and find out what actually repeats every week. Where the bottlenecks are. What you procrastinate on. What gets dropped.',
        },
        {
          num: '02',
          title: 'Design the workflows',
          body:
            'A plain document showing each automation: what triggers it, what it does, who gets notified, what the customer sees. You sign it off before we build anything.',
        },
        {
          num: '03',
          title: 'Build and connect',
          body:
            'We connect your existing tools — email, CRM, calendar, accounting, booking, website forms — and build the automations on top. Tested with real data before going live.',
        },
        {
          num: '04',
          title: 'Watch and refine',
          body:
            'After a month we review what is working, what could be better, what is being skipped. We tune the rules and add anything missing.',
        },
      ],
    },
    examples: {
      eyebrow: 'Real examples',
      headline: 'What this actually looks like for a small business.',
      items: [
        {
          title: 'For a service business',
          body: 'New website form submission → logged in CRM → instant autoresponder → SMS to you on your phone → quote drafted from template → follow-up sequence if quote sits unanswered → review request fires after job marked complete.',
        },
        {
          title: 'For a holiday let',
          body: 'New booking → confirmation email → welcome pack PDF sent → arrival instructions SMS the day before → check-out reminder → review request the morning after → marketing email three months later.',
        },
        {
          title: 'For a repeat-customer business',
          body: 'Service date logged → reminder email three months before next service due → booking link → automatic confirmation → calendar updated → invoice generated on completion.',
        },
        {
          title: 'For a B2B services firm',
          body: 'Enquiry form → company researched via AI → enriched contact in CRM → routed to the right partner → discovery call scheduled → proposal drafted from template → contract sent → onboarding sequence triggers.',
        },
      ],
    },
    cta: {
      title: 'What is eating your Sundays?',
      paragraph:
        'Tell us the bits of admin you wish you never had to do. We will tell you which ones can be automated and quote it properly.',
      button: 'Get in touch',
    },
  },

  branding: {
    hero: {
      title: 'A logo and brand identity that fits.',
      subtitle:
        'A proper mark, a usable colour palette, fonts that pair, and the bits you need to apply it. For Kent businesses who want something that looks designed, not generated. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What you get',
      headline: 'A brand kit you can actually use.',
      intro:
        'Branding without the 60-page guidelines document nobody opens. The essentials, sharp, in formats that work.',
      items: [
        { title: 'Logo', body: 'A primary mark plus the variants you need for square avatars, dark backgrounds, embroidery and print.' },
        { title: 'Colour palette', body: 'Five to seven colours with hex, RGB and CMYK values, and rules for when to use which.' },
        { title: 'Typography', body: 'A heading font and a body font that pair properly, with web and print licensing.' },
        { title: 'Application examples', body: 'Sample social posts, an invoice mockup, a business card, so you can see it in use.' },
        { title: 'File formats', body: 'SVG, PNG, PDF, JPG, AI source files. Everything anyone might ever ask for.' },
        { title: 'One-page guidelines', body: 'A short brand reference your printer, your sign-writer and your future hires will actually read.' },
      ],
    },
    process: {
      eyebrow: 'How it works',
      headline: 'Brief, drafts, refine, ship.',
      steps: [
        { num: '01', title: 'A proper brief', body: 'What you do, who you serve, where you want to land between professional and friendly, polished and honest.' },
        { num: '02', title: 'Three directions', body: 'Three distinct directions, not a single "is this it?". You react, we go from there.' },
        { num: '03', title: 'Refine', body: 'We refine the chosen direction in detail. Colours, type, layouts in real settings.' },
        { num: '04', title: 'Hand over', body: 'Full file pack and the one-page guidelines, delivered and ready to use.' },
      ],
    },
    cta: {
      title: 'Need a logo that does not look like everyone else’s?',
      paragraph: 'Send a couple of lines about what you do and what you want it to feel like. We will quote it properly.',
      button: 'Get in touch',
    },
  },

  'social-media-setup': {
    hero: {
      title: 'Social media set up properly.',
      subtitle:
        'Profiles set up the right way the first time, branded consistently, pointed at the work you want to win. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What we set up',
      headline: 'Profiles that look like they belong to one business.',
      intro:
        'Most social profiles look like they were set up by five different people on five different days. We sort that.',
      items: [
        { title: 'Facebook business page', body: 'Properly categorised, services listed, hours, location, call-to-action all set.' },
        { title: 'Instagram business profile', body: 'Bio, link, category, contact button, story highlights organised.' },
        { title: 'LinkedIn company page', body: 'If your work is B2B, properly set up with employees, services and call-to-actions.' },
        { title: 'Google Business profile', body: 'Maps listing, hours, photos, posts, attributes, reviews surfaced.' },
        { title: 'Branded graphics', body: 'Cover images, profile pictures, story highlight covers, all matching.' },
        { title: 'Cross-links', body: 'Every profile points at your website and at each other. Nothing orphaned.' },
      ],
    },
    cta: {
      title: 'Want it all looking like one business?',
      paragraph: 'Tell us which platforms matter and we will quote the set-up.',
      button: 'Get in touch',
    },
  },

  'digital-marketing': {
    hero: {
      title: 'Social media set up properly.',
      subtitle:
        'Profiles set up the right way the first time, branded consistently, pointed at the work you want to win. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What we set up',
      headline: 'Profiles that look like they belong to one business.',
      intro:
        'Most social profiles look like they were set up by five different people on five different days. We sort that.',
      items: [
        { title: 'Facebook business page', body: 'Properly categorised, services listed, hours, location, call-to-action all set.' },
        { title: 'Instagram business profile', body: 'Bio, link, category, contact button, story highlights organised.' },
        { title: 'LinkedIn company page', body: 'If your work is B2B, properly set up with employees, services and call-to-actions.' },
        { title: 'Google Business profile', body: 'Maps listing, hours, photos, posts, attributes, reviews surfaced.' },
        { title: 'Branded graphics', body: 'Cover images, profile pictures, story highlight covers, all matching.' },
        { title: 'Cross-links', body: 'Every profile points at your website and at each other. Nothing orphaned.' },
      ],
    },
    cta: {
      title: 'Want it all looking like one business?',
      paragraph: 'Tell us which platforms matter and we will quote the set-up.',
      button: 'Get in touch',
    },
  },

  'workwear-print': {
    hero: {
      title: 'Workwear and print, matched to your brand.',
      subtitle:
        'T-shirts, polos, hi-vis, business cards, signage. Sorted at the same time as your website so it all matches. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What we sort',
      headline: 'Everything your business looks like in the real world.',
      intro:
        'Branded properly, ordered alongside your website so your van, your shirt and your signs all match what is online.',
      items: [
        { title: 'Workwear', body: 'Polos, t-shirts, hoodies, hi-vis, embroidered or printed to last.' },
        { title: 'Business cards', body: 'Thick stock, finished properly, with QR codes if you want them.' },
        { title: 'Flyers & leaflets', body: 'Local distribution material that does not look like an estate agent leaflet.' },
        { title: 'Signage', body: 'Shop signs, A-boards, banners. Durable, on-brand, made for outdoor.' },
        { title: 'Vehicle graphics', body: 'Magnets, vinyl wraps or full liveries. Designed to read at speed.' },
        { title: 'One supplier', body: 'You ask us, we sort it. No chasing three different printers.' },
      ],
    },
    cta: {
      title: 'Need it all looking the same?',
      paragraph: 'Send a list of what you need and we will quote it as a package.',
      button: 'Get in touch',
    },
  },

  'ai-chatbots': {
    hero: {
      title: 'A chatbot that answers the same five questions on repeat.',
      subtitle:
        'A chatbot that handles the basic enquiries your website gets every day. Books appointments, answers FAQs, hands off to you when it matters. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What it does',
      headline: 'The repeat questions, handled.',
      intro:
        'Trained on what you actually offer, your pricing, your areas, your hours. Not a generic widget.',
      items: [
        { title: 'Answers FAQs', body: '"Do you cover Faversham?", "How much for a small kitchen?", "When can you come?" — answered instantly.' },
        { title: 'Captures leads', body: 'Name, email, phone, what they need — gathered in conversation, not on a form.' },
        { title: 'Books appointments', body: 'Connected to your calendar so visitors can book without waiting for a reply.' },
        { title: 'Hands off properly', body: 'When a real question comes up, it hands over to you with the conversation already summarised.' },
        { title: 'Trained on your business', body: 'Pricing, services, areas, hours, common scenarios. Not a generic FAQ widget.' },
        { title: 'Works out of hours', body: 'Answers visitors at 10pm or on a Sunday so a real lead is not lost overnight.' },
      ],
    },
    cta: {
      title: 'Want fewer "what do you charge?" emails?',
      paragraph: 'Tell us what your top five questions are and we will quote a chatbot that answers them.',
      button: 'Get in touch',
    },
  },

  'ai-content': {
    hero: {
      title: 'AI-assisted content that does not read like AI content.',
      subtitle:
        'Blog posts, service pages and landing copy written with AI and edited by people who know what good writing looks like. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What we write',
      headline: 'The content that helps you get found, without it reading like content.',
      intro:
        'AI handles the first draft, a person handles the final draft. Nothing publishes that we would not happily put our name to.',
      items: [
        { title: 'Blog articles', body: 'Long-form pieces targeting what your customers actually search.' },
        { title: 'Service pages', body: 'Pages that explain what you do, in your voice, for the customer in your area.' },
        { title: 'Landing copy', body: 'Conversion-focused pages for paid campaigns or specific offers.' },
        { title: 'Email content', body: 'Newsletters and follow-up sequences that sound like a human wrote them.' },
        { title: 'Voice training', body: 'We learn your tone, common phrases, and what to avoid. The AI matches.' },
        { title: 'Human edit', body: 'Every piece reviewed by hand before it goes anywhere near your site.' },
      ],
    },
    cta: {
      title: 'Need content but not the content treadmill?',
      paragraph: 'Tell us what topics matter and we will quote a content plan.',
      button: 'Get in touch',
    },
  },

  'ai-automation': {
    hero: {
      title: 'AI for the repeating bits of your business.',
      subtitle:
        'Email triage, follow-up sequences, document drafting, data sorting. Pick what eats your time and we will show you a way around it. Priced on the brief.',
      primaryCTA: { text: 'Get in touch', href: '/contact' },
    },
    included: {
      eyebrow: 'What gets handled',
      headline: 'The mundane work, done while you focus on real work.',
      intro:
        'AI is genuinely good at boring repeat tasks. We pick the right ones for your business and connect them up properly.',
      items: [
        { title: 'Email triage', body: 'Incoming emails categorised, summarised, and answered for the simple ones.' },
        { title: 'Lead scoring', body: 'New enquiries scored against your criteria so you know who to ring first.' },
        { title: 'Follow-up sequences', body: 'Reminders, nudges and check-ins drafted automatically, sent on schedule.' },
        { title: 'Document drafting', body: 'Quotes, scopes of work, proposals drafted from your inputs in minutes.' },
        { title: 'Data sync', body: 'Information flowing automatically between your tools, no manual copying.' },
        { title: 'Custom workflows', body: 'Anything repetitive in your business can probably be automated. Tell us what.' },
      ],
    },
    cta: {
      title: 'What repetitive thing do you do every week?',
      paragraph: 'Describe it in a sentence and we will tell you if it can be automated.',
      button: 'Get in touch',
    },
  },
};

function getServiceContent(slug: string, fallbackName: string): ServiceContent {
  return (
    serviceContent[slug] || {
      hero: {
        title: fallbackName,
        subtitle:
          'Web, SEO and automations for Kent businesses. £280 websites, £45/hour SEO, automations priced on the brief.',
        primaryCTA: { text: 'Get in touch', href: '/contact' },
      },
      included: {
        eyebrow: 'What you get',
        headline: 'Done properly.',
        items: [],
      },
      cta: {
        title: 'Want to talk about it?',
        paragraph: 'Send a quick note about what you need and we will reply with a plain answer.',
        button: 'Get in touch',
      },
    }
  );
}

export default async function ServicePage({
  serviceName,
  serviceSlug,
  caseStudies,
}: ServicePageProps) {
  const content = getServiceContent(serviceSlug, serviceName);
  const allCaseStudies = await getAllCaseStudies();
  const serviceCaseStudies = allCaseStudies.filter((c) =>
    c.services_used?.toLowerCase().includes(serviceName.toLowerCase())
  );
  const displayStudies = serviceCaseStudies.length > 0 ? serviceCaseStudies : allCaseStudies.slice(0, 3);

  return (
    <>
      <ServiceHero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primaryCTA={content.hero.primaryCTA || { text: 'Get in touch', href: '/contact' }}
        secondaryCTA={content.hero.secondaryCTA}
      />

      <section className="py-24 md:py-32 bg-paper border-t border-paper-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-16 md:mb-20 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
              {content.included.eyebrow}
            </p>
            <h2 className="font-display text-ink mb-4">{content.included.headline}</h2>
            {content.included.intro && (
              <p className="text-ink-muted leading-relaxed">{content.included.intro}</p>
            )}
          </div>

          {content.included.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
              {content.included.items.map((item) => (
                <div key={item.title} className="bg-paper p-8 md:p-10">
                  <h3 className="font-display text-xl md:text-2xl text-ink mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {content.process && (
        <section className="py-24 md:py-32 bg-paper-raised border-t border-paper-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-16 md:mb-20 max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-4">
                {content.process.eyebrow}
              </p>
              <h2 className="font-display text-ink mb-4">{content.process.headline}</h2>
              {content.process.intro && (
                <p className="text-ink-muted leading-relaxed">{content.process.intro}</p>
              )}
            </div>
            <ol className="divide-y divide-paper-border border-y border-paper-border">
              {content.process.steps.map((step) => (
                <li
                  key={step.num}
                  className="grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 md:py-10"
                >
                  <div className="font-display text-3xl md:text-5xl text-ink-faint leading-none">
                    {step.num}
                  </div>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {displayStudies && displayStudies.length > 0 && (
        <CaseStudySection serviceName={serviceName} caseStudies={displayStudies} />
      )}

      <Services
        headlineOverride="Other things we do"
        descriptionOverride="The rest of the toolkit, in case you need it."
      />

      <FAQ faqs={getServiceFAQs(serviceSlug)} title={`Questions about ${serviceName.toLowerCase()}`} />

      <CTA
        titleOverride={content.cta.title}
        paragraphOverride={content.cta.paragraph}
        buttonOverride={content.cta.button}
      />
    </>
  );
}
