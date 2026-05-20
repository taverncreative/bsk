export function getServiceHubMessaging(serviceSlug: string): { title: string; subtitle: string } {
  switch (serviceSlug) {
    case 'web-design':
      return {
        title: 'Websites for Kent businesses.',
        subtitle:
          '£280 for a classic small business site. E-commerce and custom work priced on application. Built right, indexed cleanly, yours in 1–2 weeks.',
      };
    case 'seo':
      return {
        title: 'Getting found on Google.',
        subtitle:
          '£45 an hour, from one hour a month. Real ranking work for Kent businesses. You see what got done and what it ranked for.',
      };
    case 'lead-capture':
      return {
        title: 'Forms, replies and the bits that mean a busy day doesn’t cost you the lead.',
        subtitle:
          'Contact forms, missed-call recovery, instant replies, follow-up reminders. Priced on the brief once we know what you handle now.',
      };
    case 'business-automation':
      return {
        title: 'The boring admin, automated.',
        subtitle:
          'CRM setup, job tracking, follow-ups, repeat invoicing. Anything you’d rather not do twice. Priced on the brief once we know what you actually run.',
      };
    case 'branding':
      return {
        title: 'A logo and brand identity that fits.',
        subtitle:
          'A proper mark, a usable colour palette, fonts that pair. For Kent businesses who want something that looks designed, not generated. Priced on the brief.',
      };
    case 'social-media-setup':
    case 'digital-marketing':
      return {
        title: 'Social media set up properly.',
        subtitle:
          'Profiles set up the right way the first time, branded consistently and pointed at the work you want to win. Priced on the brief.',
      };
    case 'ai-chatbots':
      return {
        title: 'AI chatbots that answer the same five questions on repeat.',
        subtitle:
          'A chatbot that handles the basic enquiries your website gets every day. Books appointments, answers FAQs, hands off to you when it matters. Priced on the brief.',
      };
    case 'ai-content':
      return {
        title: 'AI-assisted content that doesn’t read like AI content.',
        subtitle:
          'Blog posts, service pages and landing copy written with AI and edited by people who know what good writing looks like. Priced on the brief.',
      };
    case 'ai-automation':
      return {
        title: 'AI for the repeating bits of your business.',
        subtitle:
          'Email triage, follow-up sequences, document drafting, data sorting. Pick what eats your time and we’ll show you a way around it. Priced on the brief.',
      };
    case 'workwear-print':
      return {
        title: 'Workwear and print, matched to your brand.',
        subtitle:
          'T-shirts, polos, hi-vis, business cards, signage. Sorted at the same time as your website so it all matches.',
      };
    default:
      return {
        title: 'Web, SEO and automations for Kent businesses.',
        subtitle:
          '£280 websites. £45/hour SEO. Automations and systems priced on the brief. AI tooling made the work faster — same checks, less markup.',
      };
  }
}

export function getLocalServiceMessaging(
  serviceSlug: string,
  townName: string
): { title: string; subtitle: string } {
  switch (serviceSlug) {
    case 'web-design':
      return {
        title: `Websites for ${townName} businesses.`,
        subtitle: `£280 for a classic small business site. Built properly, indexed cleanly, ${townName}-ready in 1–2 weeks.`,
      };
    case 'seo':
      return {
        title: `Getting found on Google in ${townName}.`,
        subtitle: `£45 an hour of real local SEO work, from one hour a month. We focus on the searches ${townName} customers actually type.`,
      };
    case 'lead-capture':
      return {
        title: `Stop missing enquiries in ${townName}.`,
        subtitle: `Forms, replies and missed-call recovery so a busy day in ${townName} doesn’t cost you the work. Priced on the brief.`,
      };
    case 'business-automation':
      return {
        title: `Automated admin for ${townName} businesses.`,
        subtitle: `CRM setup, job tracking, follow-ups. The repeat work, handled. Priced on the brief.`,
      };
    case 'branding':
      return {
        title: `Branding for ${townName} businesses.`,
        subtitle: `A logo, palette and typography system that fits how you actually work. Priced on the brief.`,
      };
    case 'social-media-setup':
    case 'digital-marketing':
      return {
        title: `Social media set up for ${townName} businesses.`,
        subtitle: `Profiles set up properly the first time, pointed at the work you want to win in ${townName}.`,
      };
    case 'ai-chatbots':
      return {
        title: `AI chatbots for ${townName} businesses.`,
        subtitle: `Handles the repeat enquiries your site gets every day. Books appointments, answers FAQs. Priced on the brief.`,
      };
    case 'ai-content':
      return {
        title: `AI-assisted content for ${townName} businesses.`,
        subtitle: `Blog posts and service pages written with AI and edited by hand. Priced on the brief.`,
      };
    case 'ai-automation':
      return {
        title: `AI automation for ${townName} businesses.`,
        subtitle: `Email triage, follow-ups, document drafting. The repeat work, handled. Priced on the brief.`,
      };
    case 'workwear-print':
      return {
        title: `Workwear and print for ${townName} businesses.`,
        subtitle: `Branded properly, ordered alongside your website so it all matches.`,
      };
    default:
      return {
        title: `Web, SEO and automations for ${townName} businesses.`,
        subtitle: `£280 websites. £45/hour SEO. Automations priced on the brief. Built properly, locally.`,
      };
  }
}
