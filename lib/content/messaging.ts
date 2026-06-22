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
        title: `${townName} SEO: getting found on Google`,
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
      return {
        title: `Social media set up for ${townName} businesses.`,
        subtitle: `Profiles set up properly the first time, pointed at the work you want to win in ${townName}.`,
      };
    case 'digital-marketing':
      return {
        title: `Digital marketing for ${townName} businesses.`,
        subtitle: `Google, Meta and email campaigns pointed at the work you want to win in ${townName}. Plain monthly reports. Priced on the brief.`,
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
