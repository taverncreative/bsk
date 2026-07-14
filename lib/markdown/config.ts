import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

// Kept in sync MANUALLY with Spotlight's lib/markdown/config.ts. Spotlight is the
// source of truth: this is a verbatim copy of the plugin pipeline so posts
// render identically and safely here. If you change this, mirror it there (and
// vice versa).
//
// - remark-gfm: tables, task lists, strikethrough, autolinks.
// - rehype-sanitize: strips unsafe HTML, attributes and protocols against its
//   default schema. react-markdown does not pass raw HTML through unless
//   rehype-raw is added (it is not), so this is defence in depth over the
//   operator-authored Markdown coming from Spotlight.
export const remarkPlugins = [remarkGfm];
export const rehypePlugins = [rehypeSanitize];
