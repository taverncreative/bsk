export function getServiceHubMessaging(serviceSlug: string): { title: string; subtitle: string } {
  switch (serviceSlug) {
    case 'web-design':
      return {
        title: 'Websites Built to Rank and Generate Leads',
        subtitle: 'High performance websites designed to convert visitors into enquiries for businesses across Kent.',
      };
    case 'seo':
      return {
        title: 'Get Your Business Found on Google',
        subtitle: 'Local SEO strategies designed to rank Kent businesses and generate consistent inbound enquiries.',
      };
    case 'business-automation':
      return {
        title: 'Turn Enquiries into Automated Sales',
        subtitle: 'CRM systems and automated workflows that convert leads into customers automatically.',
      };
    case 'branding':
      return {
        title: 'Branding That Builds Trust Instantly',
        subtitle: 'Professional brand identities that elevate your Kent business and attract high-value customers.',
      };
    case 'digital-marketing':
      return {
        title: 'Digital Campaigns That Generate Enquiries',
        subtitle: 'Data-driven marketing campaigns that scale operations and drive inbound leads for Kent businesses.',
      };
    case 'ai-chatbots':
      return {
        title: 'AI Chatbots That Convert Visitors Into Leads — 24/7',
        subtitle: 'Custom-built AI assistants that engage your website visitors, answer questions, capture leads, and book appointments around the clock.',
      };
    case 'ai-content':
      return {
        title: 'AI-Powered Content That Ranks and Converts',
        subtitle: 'Professional blog posts, social media content, and website copy created with AI — consistent, SEO-optimised, and on-brand.',
      };
    case 'ai-automation':
      return {
        title: 'AI Automation That Runs Your Business While You Sleep',
        subtitle: 'Intelligent automation for email responses, lead scoring, customer follow-ups, and data processing — powered by AI.',
      };
    default:
      return {
        title: 'Digital Growth Solutions That Generate Leads',
        subtitle: 'High performance digital ecosystems designed to convert visitors into customers for businesses across Kent.',
      };
  }
}

export function getLocalServiceMessaging(serviceSlug: string, townName: string): { title: string; subtitle: string } {
  switch (serviceSlug) {
    case 'web-design':
      return {
        title: `Websites That Generate Leads for ${townName} Businesses`,
        subtitle: `High performance web design designed to convert local traffic into enquiries for companies in ${townName}.`,
      };
    case 'seo':
      return {
        title: `Get Your ${townName} Business Found on Google`,
        subtitle: `Local SEO strategies designed to dominate search rankings and generate inbound enquiries in ${townName}.`,
      };
    case 'business-automation':
      return {
        title: `Turn Enquiries into Sales for Your ${townName} Business`,
        subtitle: `CRM systems and automated workflows customized to convert leads automatically for businesses across ${townName}.`,
      };
    case 'branding':
      return {
        title: `Branding That Builds Trust for ${townName} Businesses`,
        subtitle: `Professional brand identities that elevate your local presence and attract high-value customers in ${townName}.`,
      };
    case 'digital-marketing':
      return {
        title: `Digital Campaigns That Generate Enquiries in ${townName}`,
        subtitle: `Data-driven marketing campaigns structured to scale your local operations and drive inbound leads in ${townName}.`,
      };
    case 'ai-chatbots':
      return {
        title: `AI Chatbots for ${townName} Businesses — Capture Leads 24/7`,
        subtitle: `Custom AI assistants built for ${townName} businesses — engage visitors, answer questions, and book appointments while you focus on running your business.`,
      };
    case 'ai-content':
      return {
        title: `AI Content Creation for ${townName} Businesses`,
        subtitle: `SEO-optimised blog posts, social media, and website copy powered by AI — helping ${townName} businesses publish consistent content that ranks.`,
      };
    case 'ai-automation':
      return {
        title: `AI Business Automation for ${townName} Companies`,
        subtitle: `Intelligent AI automation for email responses, lead scoring, and workflow management — built for businesses in ${townName}.`,
      };
    default:
      return {
        title: `Digital Growth Solutions for ${townName} Businesses`,
        subtitle: `Premium digital ecosystems engineered to build authority and convert visitors into customers in ${townName}.`,
      };
  }
}
