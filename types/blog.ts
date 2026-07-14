// Shapes returned by Spotlight's public content API
// (GET /api/public/clients/{slug}/posts[/{slug}]). These mirror the columns the
// Spotlight `published_posts` / `published_post` SQL functions expose -- no id,
// no status, published rows only. meta_description, featured_image and
// published_at are all nullable; the single-post body may also be empty.

export type BlogPostSummary = {
  title: string;
  slug: string;
  meta_description: string | null;
  featured_image: string | null;
  published_at: string | null;
};

export type BlogPost = BlogPostSummary & {
  body: string | null;
};
