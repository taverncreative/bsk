import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/category/:slug*',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/guides/:slug*',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/post/:slug*',
        destination: '/guides/:slug*',
        permanent: true,
      },
      // Legacy Pages Migration
      { source: '/seo-by-industry-kent', destination: '/seo', permanent: true },
      { source: '/plumbers', destination: '/industries/plumbers', permanent: true },
      { source: '/case-studies-business-sorted-kent', destination: '/case-studies', permanent: true },
      { source: '/east-kent', destination: '/towns', permanent: true },
      { source: '/local-seo', destination: '/seo', permanent: true },
      { source: '/medway', destination: '/towns/medway', permanent: true },
      { source: '/builders', destination: '/industries/builders', permanent: true },
      { source: '/contact-business-sorted-kent', destination: '/contact', permanent: true },
      { source: '/hair-beauty', destination: '/industries', permanent: true },
      { source: '/carpet-cleaners', destination: '/industries', permanent: true },
      { source: '/shopify-web-design', destination: '/web-design', permanent: true },
      { source: '/seo-audit', destination: '/seo', permanent: true },
      { source: '/sevenoaks', destination: '/towns/sevenoaks', permanent: true },
      { source: '/canterbury', destination: '/towns/canterbury', permanent: true },
      { source: '/west-kent', destination: '/towns', permanent: true },
      { source: '/tunbridge-wells', destination: '/towns/tunbridge-wells', permanent: true },
      { source: '/estate-agents', destination: '/industries', permanent: true },
      { source: '/maidstone', destination: '/towns/maidstone', permanent: true },
      { source: '/website-design-kent', destination: '/web-design', permanent: true },
      { source: '/solicitors', destination: '/industries', permanent: true },
      { source: '/branding-logo-design-kent', destination: '/branding', permanent: true },
      { source: '/thanet', destination: '/towns/margate', permanent: true },
      { source: '/ai-seo', destination: '/seo', permanent: true },
      { source: '/ashford', destination: '/towns/ashford', permanent: true },
      { source: '/dartford', destination: '/towns/dartford', permanent: true },
      { source: '/shopify-seo', destination: '/seo', permanent: true },
      { source: '/electricians', destination: '/industries/electricians', permanent: true },
      { source: '/about-business-sorted-kent', destination: '/about', permanent: true },
      { source: '/seo-consultancy', destination: '/seo', permanent: true },
      { source: '/gardeners', destination: '/industries/landscapers', permanent: true },
      { source: '/accountants', destination: '/industries/accountants', permanent: true },
      { source: '/locations', destination: '/towns', permanent: true },
      { source: '/social-media', destination: '/digital-marketing', permanent: true },
      { source: '/cleaners', destination: '/industries/cleaning-companies', permanent: true },
      { source: '/print-workwear', destination: '/workwear-print', permanent: true },

      // Legacy/Placeholder Case Study redirects to Hub
      { source: '/case-studies/trades-business-website', destination: '/case-studies', permanent: true },
      { source: '/case-studies/local-seo-for-plumber', destination: '/case-studies', permanent: true },
      { source: '/case-studies/lead-capture-system-builder', destination: '/case-studies', permanent: true },
      { source: '/case-studies/automated-enquiry-followups', destination: '/case-studies', permanent: true },
      { source: '/case-studies/branding-and-website-launch', destination: '/case-studies', permanent: true },
    ];
  },
};

export default nextConfig;
