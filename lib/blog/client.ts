import { notFound } from 'next/navigation';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

// Server-only client for Spotlight's public content API. It reads Business
// Sorted Kent's PUBLISHED posts from Spotlight's key-scoped, no-store endpoints.
//
// The bearer key lives in SPOTLIGHT_CONTENT_API_KEY -- a server-only env var
// with no NEXT_PUBLIC prefix, so Next never inlines it into a client bundle --
// and every function here is called only from Server Components. The key
// therefore never reaches the browser, and there is no CORS surface.
//
// Spotlight sends `cache-control: no-store`, so freshness is controlled on this
// side via Next's ISR: each fetch revalidates every 5 minutes.

const CLIENT_SLUG = 'business-sorted-kent';
const REVALIDATE_SECONDS = 300;

function endpoint(path: string): string {
  const baseUrl = process.env.SPOTLIGHT_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('SPOTLIGHT_API_BASE_URL is not set');
  }
  return `${baseUrl.replace(/\/$/, '')}/api/public/clients/${CLIENT_SLUG}${path}`;
}

function authHeaders(): HeadersInit {
  const apiKey = process.env.SPOTLIGHT_CONTENT_API_KEY;
  if (!apiKey) {
    throw new Error('SPOTLIGHT_CONTENT_API_KEY is not set');
  }
  return { Authorization: `Bearer ${apiKey}` };
}

// List published posts (no body). Returns [] on ANY failure -- a Spotlight
// outage, a missing key, or a bad response must never fail the BSK build (this
// backs generateStaticParams + the /news index) or take the page down. The News
// index just shows its empty state until the next successful revalidate.
export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  try {
    const res = await fetch(endpoint('/posts'), {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as unknown;
    return Array.isArray(data) ? (data as BlogPostSummary[]) : [];
  } catch {
    return [];
  }
}

// Single published post (full Markdown body). A draft or unknown slug returns
// 404 from the API, and any transient failure is treated the same way, so the
// route renders Next's not-found rather than crashing.
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  let res: Response;
  try {
    res = await fetch(endpoint(`/posts/${encodeURIComponent(slug)}`), {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
    notFound();
  }
  if (!res.ok) {
    notFound();
  }
  return (await res.json()) as BlogPost;
}
