import ReactMarkdown from 'react-markdown';
import { remarkPlugins, rehypePlugins } from './config';

// Canonical Markdown renderer. Copied from Spotlight's lib/markdown/markdown.tsx
// and kept in sync manually (see ./config for the note). Defaulted to BSK's
// `prose prose-lg` typography -- the same class string the guides pages use --
// so Spotlight posts render in the site's house style. Renders in a Server
// Component, so no client JS is shipped.
const PROSE_CLASS =
  'prose prose-lg max-w-none ' +
  'prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-headings:tracking-tight ' +
  'prose-a:text-ink prose-a:font-medium prose-a:no-underline prose-a:border-b-2 prose-a:border-brand-gold/40 hover:prose-a:border-brand-gold hover:prose-a:text-brand-gold prose-a:transition-colors ' +
  'prose-p:text-ink prose-p:leading-relaxed ' +
  'prose-li:text-ink prose-li:marker:text-ink-faint ' +
  'prose-strong:text-ink prose-strong:font-semibold ' +
  'prose-blockquote:text-ink-muted prose-blockquote:border-brand-gold ' +
  'prose-code:text-ink prose-code:bg-paper-raised prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:hidden prose-code:after:hidden ' +
  'prose-img:rounded-xl';

export function Markdown({
  children,
  className = PROSE_CLASS,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
