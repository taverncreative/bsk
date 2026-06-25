export interface LinkTarget {
  text: string;
  url: string;
  matched?: boolean;
}

const services: LinkTarget[] = [
  { text: 'local seo', url: '/seo' },
  { text: 'seo strategy', url: '/seo' },
  { text: 'search engine optimisation', url: '/seo' },
  { text: 'website design', url: '/web-design' },
  { text: 'web design', url: '/web-design' },
  { text: 'website conversion', url: '/lead-capture' },
  { text: 'lead generation', url: '/lead-capture' },
  { text: 'lead capture', url: '/lead-capture' },
  { text: 'business automation', url: '/business-automation' },
  { text: 'automation systems', url: '/business-automation' },
];

const locations: LinkTarget[] = [
  { text: 'ashford', url: '/towns/ashford' },
  { text: 'canterbury', url: '/towns/canterbury' },
  { text: 'maidstone', url: '/towns/maidstone' },
  { text: 'folkestone', url: '/towns/folkestone' },
  { text: 'dover', url: '/towns/dover' },
  { text: 'margate', url: '/towns/margate' },
  { text: 'ramsgate', url: '/towns/ramsgate' },
  { text: 'broadstairs', url: '/towns/broadstairs' },
  { text: 'sevenoaks', url: '/towns/sevenoaks' },
  { text: 'tunbridge wells', url: '/towns/tunbridge-wells' },
  { text: 'dartford', url: '/towns/dartford' },
];

const industries: LinkTarget[] = [
  { text: 'electricians', url: '/industries/electricians' },
  { text: 'plumbers', url: '/industries/plumbers' },
  { text: 'builders', url: '/industries/builders' },
  { text: 'roofers', url: '/industries/roofers' },
  { text: 'landscapers', url: '/industries/landscapers' },
  { text: 'accountants', url: '/industries/accountants' },
  { text: 'cleaning companies', url: '/industries/cleaning-companies' },
];

export function injectContextualLinks(html: string): string {
  let result = html;
  let totalLinksAdded = 0;
  const maxLinks = 5;

  // We must not replace text inside existing tags (like <a href="...">text</a>) 
  // or inside heading tags.
  // A naive approach: target text nodes.
  
  const allTargets = [...services, ...locations, ...industries];
  
  // Create a regex to match text outside of HTML tags.
  // This matches anything not enclosed in < ... >
  // Then we replace keywords inside those text chunks.
  
  const tagRegex = /(<[^>]+>)/g;
  const parts = result.split(tagRegex);
  
  for (let i = 0; i < parts.length; i++) {
    // Over-linking safeguard
    if (totalLinksAdded >= maxLinks) break;

    // Skip HTML tags (they are at odd indices in the split result)
    if (i % 2 !== 0) continue;
    
    // In this text chunk, attempt to replace targets that haven't been matched yet
    for (const target of allTargets) {
      if (totalLinksAdded >= maxLinks) break;
      if (target.matched) continue; // Only link each keyword once per page
      
      const regex = new RegExp(`\\b(${target.text})\\b`, 'i');
      if (regex.test(parts[i])) {
        // We found a match, replace it with a link
        parts[i] = parts[i].replace(regex, (match) => {
          target.matched = true;
          totalLinksAdded++;
          return `<a href="${target.url}" class="text-brand-gold hover:text-brand-gold/80 hover:underline font-medium transition-colors">${match}</a>`;
        });
      }
    }
  }

  // Reset matched for next calls
  allTargets.forEach(t => t.matched = false);

  return parts.join('');
}
