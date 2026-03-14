export const getServiceFAQs = (serviceSlug: string) => {
  switch (serviceSlug) {
    case 'web-design':
      return [
        {
          question: "How long does it take to build a high-performance website?",
          answer: "Typically, a custom web design project takes between 4 to 8 weeks, depending on the complexity of the architecture and integrations required. We focus on speed and structure, ensuring the final build acts as a lead generation asset."
        },
        {
          question: "Will my website look good on mobile devices?",
          answer: "Absolutely. Over 60% of local service search volume happens on mobile devices. Every site we build uses mobile-first methodologies, ensuring flawless performance across smartphones and tablets."
        },
        {
          question: "Do you provide hosting and maintenance?",
          answer: "Yes, we deploy all systems on enterprise-grade edge infrastructure for maximum speed and security. We manage the technical backend so you can focus entirely on running your operations."
        },
        {
          question: "Can I update the content myself?",
          answer: "Yes, we integrate a headless Content Management System (CMS) tailored to your team, allowing you to update case studies, guides, and text without touching a single line of code."
        }
      ];
    case 'seo':
      return [
        {
          question: "How long until I see results from Local SEO?",
          answer: "Local SEO is a structural long-term investment. Most clients begin seeing a noticeable uplift in Map Pack visibility and organic traffic within 3 to 6 months. By month 12, the compound growth firmly establishes your local dominance."
        },
        {
          question: "What exactly do you do for Local SEO?",
          answer: "We focus on three core pillars: fixing technical website architecture (speed, schema, indexing), building geographic relevance through local content and hubs, and acquiring high-authority citations pointing back to your business profile."
        },
        {
          question: "Do you guarantee number 1 rankings?",
          answer: "No reputable agency can guarantee a #1 position due to Google's dynamic algorithm. However, we have a proven track record of securing top 3 Local Pack placements for highly competitive commercial keywords across Kent."
        }
      ];
    case 'lead-capture':
      return [
        {
          question: "How do I get more enquiries from my website?",
          answer: "Improving your website structure, adding clear calls to action, and streamlining your contact forms are some of the most effective ways to convert the traffic you already have into direct enquiries."
        },
        {
          question: "Do I need a new website to improve lead capture?",
          answer: "Not necessarily. If your current website is built well structurally, we can often optimise the existing pages, improve the user journey, and add strategic conversion elements to increase the number of enquiries you receive."
        },
        {
          question: "Can you improve enquiry forms on my current site?",
          answer: "Yes. Complex or confusing forms discourage people from getting in touch. We redesign and optimise contact pathways so they are simple, clear, and easy for the user to complete, whether on mobile or desktop."
        },
        {
          question: "How quickly should businesses respond to enquiries?",
          answer: "Immediately. Follow-up speed is crucial. We often combine lead capture systems with business automation to ensure every enquiry receives an instant, professional response while you are still working or on a job."
        },
        {
          question: "Do lead capture systems work for trades businesses?",
          answer: "Absolutely. In fact, trades businesses often see the biggest improvements because their customers are usually looking for a fast, reliable quote. Clear 'Click to Call' buttons and simple quote request forms dramatically boost conversion."
        }
      ];
    case 'business-automation':
      return [
        {
          question: "What types of processes can be automated?",
          answer: "We focus on automating administrative chokepoints. This includes routing incoming enquiries instantly to the right team member, sending automated follow-up emails, logging leads straight into a CRM, requesting reviews after a job is complete, and syncing contact forms with booking calendars."
        },
        {
          question: "Do I need special software for automation?",
          answer: "Not necessarily. We specialize in API integrations, which means we often securely connect the tools you already use (like Mailchimp, existing email clients, or basic CRMs) to communicate with each other seamlessly."
        },
        {
          question: "Can automation work with my existing systems?",
          answer: "Yes. Modern automation rarely requires ripping out your entire tech stack. We build secure bridges between your website, your lead capture forms, and the operational software your team already understands."
        },
        {
          question: "Will automation replace manual work completely?",
          answer: "No, automation doesn't replace the human touch—it protects it. By allowing systems to handle repetitive admin (like quote confirmations and data entry), you win back time to focus on actually delivering your service and speaking directly with qualified leads."
        },
        {
          question: "Is automation suitable for small businesses?",
          answer: "Absolutely. Small businesses often see the highest ROI because automation acts as a 'virtual administrator'. It handles the background workflow scaling instantly during busy periods, so you don't have to hire additional staff just to manage emails."
        }
      ];
    case 'digital-marketing':
    case 'social-media-setup':
      return [
        {
          question: "Which social platforms should my business use?",
          answer: "It depends completely on your industry and target audience. For local trades, Facebook and Instagram are often the most effective for showcasing visual projects and community trust. For B2B services, structured LinkedIn company pages and Google Business Profiles are critical for professional networking and search visibility."
        },
        {
          question: "Can you improve my existing social media profiles?",
          answer: "Yes. We regularly perform 'profile rehabilitation', taking existing, fragmented accounts and updating their imagery, branding, service descriptions, and technical integrations to ensure they look perfectly aligned with your website."
        },
        {
          question: "Do I need social media for my business?",
          answer: "While you don't necessarily need to post every day, you absolutely need professional 'holding' profiles. Potential customers frequently check a business's Facebook or Instagram simply to verify they are legitimate and active before making a high-value enquiry."
        },
        {
          question: "Will social media help my website?",
          answer: "Yes. Structurally linking well-optimised social profiles to your website creates strong, legitimate brand signals that Google uses to understand and trust your business identity, indirectly supporting your ongoing SEO efforts."
        }
      ];
    case 'workwear-print':
      return [
        {
          question: "What types of workwear can you brand?",
          answer: "We supply and brand a full range of high-quality workwear, including hoodies, polo shirts, t-shirts, jackets, and high-visibility clothing, structurally designed to withstand tough working environments."
        },
        {
          question: "Can you print business cards and flyers?",
          answer: "Yes. We design and produce premium business cards, leaflets, brochures, and promotional materials that perfectly match your online identity and help you leave a lasting impression in the real world."
        },
        {
          question: "Do you supply clothing or just branding?",
          answer: "We supply the entire package end-to-end. We source high-quality garments from trusted suppliers and then manage the professional embroidery or printing process, delivering the finished product directly to you."
        },
        {
          question: "Can you match materials to my existing logo?",
          answer: "Absolutely. Our design team ensures complete brand consistency, carefully matching your specific brand colours (Pantone/CMYK) and logo architecture so every physical item flawlessly represents your business identity."
        }
      ];
    default:
      return [
        {
          question: "How do we get started?",
          answer: "The first step is a completely free operational audit. We review your current digital footprint and competitors, then present a custom blueprint outlining exactly how we'll generate predictable leads for your specific business."
        },
        {
          question: "Do you work with businesses outside of Kent?",
          answer: "While we specialize deeply in the Kent ecosystem and understand its unique commercial sub-sectors, we frequently partner with ambitious businesses across the broader UK looking to dominate their local radius."
        }
      ];
  }
};
