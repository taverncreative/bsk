import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/category/:slug*',
        destination: '/guides',
        permanent: true,
      },
      // Wix-era /blog/categories/* (plural) — MUST come before /blog/:slug*
      // wildcard below, or they'd 301 to non-existent /guides/categories/... 404.
      { source: '/blog/categories/local-seo-help', destination: '/guides', permanent: true },
      { source: '/blog/categories/small-business-advice', destination: '/guides', permanent: true },
      { source: '/blog/categories/web-design-tips', destination: '/guides', permanent: true },
      { source: '/blog-feed.xml', destination: '/sitemap.xml', permanent: true },
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
      { source: '/logo-branding', destination: '/branding', permanent: true },
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

      // ────────────────────────────────────────────────────────────────
      // Multi-word town slug normalisation: external crawlers/backlinks
      // sometimes construct '/towns/<town with space>' from the display
      // name. Next.js matches sources against the raw (still-encoded)
      // request pathname, so these must use '%20' rather than a literal
      // space. All destinations have been verified against the production
      // sitemap.
      // ────────────────────────────────────────────────────────────────
      { source: '/towns/tunbridge%20wells', destination: '/towns/tunbridge-wells', permanent: true },
      { source: '/towns/tunbridge%20wells%20borough', destination: '/towns/tunbridge-wells-borough', permanent: true },
      { source: '/towns/herne%20bay', destination: '/towns/herne-bay', permanent: true },
      { source: '/towns/tonbridge%20and%20malling', destination: '/towns/tonbridge-and-malling', permanent: true },
      { source: '/towns/ashford%20borough', destination: '/towns/ashford-borough', permanent: true },
      { source: '/towns/canterbury%20district', destination: '/towns/canterbury-district', permanent: true },
      { source: '/towns/dartford%20borough', destination: '/towns/dartford-borough', permanent: true },
      { source: '/towns/dover%20district', destination: '/towns/dover-district', permanent: true },
      { source: '/towns/maidstone%20borough', destination: '/towns/maidstone-borough', permanent: true },
      { source: '/towns/sevenoaks%20district', destination: '/towns/sevenoaks-district', permanent: true },

      { source: '/estate-agents', destination: '/industries/letting-agents', permanent: true },
      { source: '/maidstone', destination: '/towns/maidstone', permanent: true },
      { source: '/website-design-kent', destination: '/web-design', permanent: true },
      { source: '/solicitors', destination: '/industries/solicitors', permanent: true },
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

      // ────────────────────────────────────────────────────────────────
      // Wix migration: legacy compound town URLs.
      // (Wix used "<town>-website-design-seo-branding" as one page per town.)
      // ────────────────────────────────────────────────────────────────
      { source: '/ashford-website-design-seo-branding', destination: '/towns/ashford', permanent: true },
      { source: '/canterbury-website-design-seo-branding', destination: '/towns/canterbury', permanent: true },
      { source: '/faversham-website-design-seo-branding', destination: '/towns/faversham', permanent: true },
      { source: '/folkestone-website-design-seo-branding', destination: '/towns/folkestone', permanent: true },
      { source: '/gravesend-website-design-seo-branding', destination: '/towns/gravesend', permanent: true },
      { source: '/herne-bay-website-design-seo-branding', destination: '/towns/herne-bay', permanent: true },
      { source: '/maidstone-website-design-seo-branding', destination: '/towns/maidstone', permanent: true },
      { source: '/sevenoaks-website-design-seo-branding', destination: '/towns/sevenoaks', permanent: true },
      { source: '/thanet-website-design-seo-branding', destination: '/towns/margate', permanent: true },
      { source: '/tunbridge-wells-website-design-seo-branding', destination: '/towns/tunbridge-wells', permanent: true },
      { source: '/whitstable-website-design-seo-branding', destination: '/towns/whitstable', permanent: true },

      // ────────────────────────────────────────────────────────────────
      // Wix migration: legacy /seo-for-<industry>-kent URLs.
      // Some old industry labels are mapped onto current consolidated
      // industries (carpet-cleaners → cleaning-companies, estate-agents
      // → letting-agents, gardeners → garden-services).
      // ────────────────────────────────────────────────────────────────
      { source: '/seo-for-accountants-kent', destination: '/industries/accountants', permanent: true },
      { source: '/seo-for-builders-kent', destination: '/industries/builders', permanent: true },
      { source: '/seo-for-carpet-cleaners-kent', destination: '/industries/cleaning-companies', permanent: true },
      { source: '/seo-for-electricians-kent', destination: '/industries/electricians', permanent: true },
      { source: '/seo-for-estate-agents-kent', destination: '/industries/letting-agents', permanent: true },
      { source: '/seo-for-gardeners-kent', destination: '/industries/garden-services', permanent: true },
      { source: '/seo-for-hair-beauty-kent', destination: '/industries', permanent: true },
      { source: '/seo-for-landscapers-kent', destination: '/industries/landscapers', permanent: true },
      { source: '/seo-for-letting-agents-kent', destination: '/industries/letting-agents', permanent: true },
      { source: '/seo-for-new-businesses-startups-kent', destination: '/seo', permanent: true },
      { source: '/seo-for-painters-decorators-kent', destination: '/industries/painters-and-decorators', permanent: true },
      { source: '/seo-for-plumbers-kent', destination: '/industries/plumbers', permanent: true },
      { source: '/seo-for-roofers-kent', destination: '/industries/roofers', permanent: true },
      { source: '/seo-for-solicitors-kent', destination: '/industries/solicitors', permanent: true },
      { source: '/seo-for-window-cleaners-kent', destination: '/industries/cleaning-companies', permanent: true },

      // ────────────────────────────────────────────────────────────────
      // Wix migration: legacy /local-seo-<town> URLs.
      // ────────────────────────────────────────────────────────────────
      { source: '/local-seo-canterbury', destination: '/seo-canterbury', permanent: true },
      { source: '/local-seo-folkestone', destination: '/seo-folkestone', permanent: true },
      { source: '/local-seo-thanet', destination: '/seo-margate', permanent: true },
      { source: '/local-seo-services-kent', destination: '/seo', permanent: true },
      // The site's one deep (non-homepage) backlink points here and it 404s.
      // Recover it to the SEO hub, matching the /local-seo-services-kent mapping.
      { source: '/local-seo-kent', destination: '/seo', permanent: true },

      // ────────────────────────────────────────────────────────────────
      // Wix migration: legacy service / brand / "-kent" suffix URLs.
      // ────────────────────────────────────────────────────────────────
      { source: '/branding-services-kent', destination: '/branding', permanent: true },
      { source: '/logo-design-in-kent', destination: '/branding', permanent: true },
      { source: '/business-automation-kent', destination: '/business-automation', permanent: true },
      { source: '/business-print-materials-kent', destination: '/workwear-print', permanent: true },
      { source: '/business-support-kent', destination: '/services', permanent: true },
      { source: '/crm-tools-for-small-businesses-kent', destination: '/business-automation', permanent: true },
      { source: '/seo-consultancy-kent', destination: '/seo', permanent: true },
      { source: '/website-design-ashford-kent', destination: '/web-design-ashford', permanent: true },
      { source: '/website-design-for-trades-kent', destination: '/industries', permanent: true },
      { source: '/website-lead-generation-automation', destination: '/lead-capture', permanent: true },
      { source: '/social-media-setup-for-trades', destination: '/social-media-setup', permanent: true },

      // ────────────────────────────────────────────────────────────────
      // Wix structural / misc legacy URLs.
      // ────────────────────────────────────────────────────────────────
      { source: '/home', destination: '/', permanent: true },
      { source: '/affordable-seo-for-startups-kent', destination: '/seo', permanent: true },
      { source: '/towns/hythe', destination: '/towns/folkestone', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },

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
