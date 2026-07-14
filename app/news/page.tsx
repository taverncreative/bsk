import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog/client';

export const metadata: Metadata = {
  title: 'News | Business Sorted Kent',
  description:
    'Updates, announcements and short reads from Business Sorted Kent.',
  alternates: {
    canonical: 'https://businesssortedkent.co.uk/news',
  },
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function NewsIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-paper">
      <section className="bg-paper border-b border-paper-border pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-8">
            News
          </p>
          <h1 className="font-display text-ink mb-8 max-w-4xl">
            Updates and short reads from Business Sorted Kent.
          </h1>
          <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl">
            News, announcements and the occasional opinion. Written by the people
            doing the work.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {posts.length === 0 ? (
            <p className="text-ink-muted">No news yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const date = formatDate(post.published_at);
                return (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    className="group flex flex-col bg-paper-raised border border-paper-border rounded-xl overflow-hidden hover:border-brand-gold hover:shadow-[0_0_40px_rgba(214,173,103,0.15)] transition-all"
                  >
                    {post.featured_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featured_image}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {date && (
                        <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-faint mb-3">
                          {date}
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-ink group-hover:text-brand-gold mb-3 leading-snug transition-colors">
                        {post.title}
                      </h2>
                      {post.meta_description && (
                        <p className="text-ink-muted line-clamp-3 text-sm leading-relaxed">
                          {post.meta_description}
                        </p>
                      )}
                      <span className="mt-6 flex items-center font-semibold text-ink group-hover:text-brand-gold text-sm transition-colors">
                        Read
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
