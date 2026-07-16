import type { Metadata } from 'next';
import { getPublishedPosts, getPostBySlug } from '@/lib/blog/client';
import { Markdown } from '@/lib/markdown/markdown';

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-render the currently-published posts at build; allow posts published to
// Spotlight after the build to render on-demand (then cache per the fetch's
// hourly revalidate). If the list fetch fails at build, this returns [] and
// every post renders on-demand instead -- the build never breaks.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const description =
    post.meta_description || `Read ${post.title} from Business Sorted Kent.`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `https://businesssortedkent.co.uk/news/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Business Sorted Kent`,
      description,
      type: 'article',
      url: `https://businesssortedkent.co.uk/news/${post.slug}`,
      ...(post.published_at && { publishedTime: post.published_at }),
      ...(post.featured_image && {
        images: [
          {
            url: post.featured_image,
            ...(post.featured_image_alt && { alt: post.featured_image_alt }),
          },
        ],
      }),
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="bg-paper pt-48 pb-24">
      {/* Article JSON-LD, mirroring the guides pages (author/publisher fixed). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.meta_description || post.title,
            // ImageObject rather than a bare URL so the alt can travel with it
            // (schema.org's property for alt-style text is `caption`).
            ...(post.featured_image && {
              image: {
                '@type': 'ImageObject',
                url: post.featured_image,
                ...(post.featured_image_alt && {
                  caption: post.featured_image_alt,
                }),
              },
            }),
            author: {
              '@type': 'Person',
              name: 'John Lally',
              jobTitle: 'Founder',
              url: 'https://businesssortedkent.co.uk/about',
              worksFor: {
                '@type': 'Organization',
                '@id': 'https://businesssortedkent.co.uk/#organization',
                name: 'Business Sorted Kent',
              },
            },
            publisher: {
              '@type': 'Organization',
              name: 'Business Sorted Kent',
              logo: {
                '@type': 'ImageObject',
                url: 'https://businesssortedkent.co.uk/logo.png',
              },
            },
            ...(post.published_at && { datePublished: post.published_at }),
            mainEntityOfPage: `https://businesssortedkent.co.uk/news/${post.slug}`,
          }),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <header className="mb-12 border-b border-paper-border pb-10">
          {date && (
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint mb-4 block">
              {date}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.meta_description && (
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              {post.meta_description}
            </p>
          )}
        </header>

        {post.featured_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featured_image}
            alt={post.featured_image_alt ?? ''}
            className="w-full rounded-xl border border-paper-border mb-12"
          />
        )}

        {post.body ? <Markdown>{post.body}</Markdown> : null}
      </div>
    </div>
  );
}
