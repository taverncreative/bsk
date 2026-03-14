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
    default:
      return {
        title: `Digital Growth Solutions for ${townName} Businesses`,
        subtitle: `Premium digital ecosystems engineered to build authority and convert visitors into customers in ${townName}.`,
      };
  }
}
