export default function SiteSchema() {
  const ORG_ID = 'https://businesssortedkent.co.uk/#organization';
  const WEBSITE_ID = 'https://businesssortedkent.co.uk/#website';

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Business Sorted Kent',
      url: 'https://businesssortedkent.co.uk/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://businesssortedkent.co.uk/logo.png',
      },
      image: 'https://businesssortedkent.co.uk/logo.png',
      description:
        'Founder-led digital agency in Kent. Websites, SEO and automations for everyday Kent businesses, with rigorous checks for speed, security and SEO on every build.',
      email: 'hello@businesssortedkent.co.uk',
      telephone: '+447522388055',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '84 Abbots Walk, Wye',
        addressLocality: 'Ashford',
        addressRegion: 'Kent',
        postalCode: 'TN25 5ES',
        addressCountry: 'GB',
      },
      founder: {
        '@type': 'Person',
        name: 'John Lally',
        jobTitle: 'Founder',
      },
      sameAs: [
        'https://www.facebook.com/businesssortedkent',
        'https://www.instagram.com/businesssortedkent',
        'https://www.linkedin.com/company/business-sorted-kent',
      ],
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Kent' },
        { '@type': 'AdministrativeArea', name: 'Greater London' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Websites',
          itemOffered: { '@type': 'Service', name: 'Website Design' },
        },
        {
          '@type': 'Offer',
          name: 'SEO',
          itemOffered: { '@type': 'Service', name: 'Local SEO' },
        },
        {
          '@type': 'Offer',
          name: 'Lead capture',
          itemOffered: { '@type': 'Service', name: 'Lead Capture Systems' },
        },
        {
          '@type': 'Offer',
          name: 'Automations',
          itemOffered: { '@type': 'Service', name: 'Business Automation' },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: 'https://businesssortedkent.co.uk/',
      name: 'Business Sorted Kent',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-GB',
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
