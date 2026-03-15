import Script from 'next/script';

export default function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Business Sorted Kent",
    "url": "https://www.businesssortedkent.co.uk/",
    "logo": "https://www.businesssortedkent.co.uk/logo.png",
    "image": "https://www.businesssortedkent.co.uk/logo.png",
    "description": "Business Sorted Kent helps tradespeople, sole traders and small businesses across Kent improve their online presence through professional websites, local SEO, lead generation systems and business automation.",
    "email": "hello@businesssortedkent.co.uk",
    "telephone": "07522388055",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "184 Sandyhurst Lane",
      "addressLocality": "Ashford",
      "addressRegion": "Kent",
      "postalCode": "TN25 4NX",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.1415",
      "longitude": "0.8751"
    },
    "areaServed": [
      { "@type": "City", "name": "Ashford" },
      { "@type": "City", "name": "Canterbury" },
      { "@type": "City", "name": "Maidstone" },
      { "@type": "City", "name": "Folkestone" },
      { "@type": "City", "name": "Dover" },
      { "@type": "City", "name": "Margate" },
      { "@type": "City", "name": "Ramsgate" },
      { "@type": "City", "name": "Broadstairs" },
      { "@type": "City", "name": "Sevenoaks" },
      { "@type": "City", "name": "Tunbridge Wells" },
      { "@type": "City", "name": "Tonbridge" },
      { "@type": "City", "name": "Dartford" },
      { "@type": "City", "name": "Gravesend" },
      { "@type": "City", "name": "Sittingbourne" },
      { "@type": "City", "name": "Faversham" },
      { "@type": "City", "name": "Whitstable" },
      { "@type": "City", "name": "Herne Bay" }
    ],
    "founder": {
      "@type": "Person",
      "name": "John Lally",
      "jobTitle": "Founder"
    },
    "sameAs": [
      "https://www.facebook.com/businesssortedkent",
      "https://www.instagram.com/businesssortedkent",
      "https://www.linkedin.com/company/business-sorted-kent"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Local SEO"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lead Capture Systems"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Automation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Branding and Logo Design"
        }
      }
    ]
  };

  return (
    <Script
      id="schema-local-business"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
