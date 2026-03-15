create extension if not exists vector;

create table if not exists knowledge_index (
  id uuid primary key default gen_random_uuid(),
  page_title text,
  url text,
  content_category text,
  keywords text,
  content text,
  embedding vector(1536)
);

create or replace function match_knowledge (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  page_title text,
  url text,
  content text,
  similarity float
)
language sql stable
as $$
  select
    knowledge_index.id,
    knowledge_index.page_title,
    knowledge_index.url,
    knowledge_index.content,
    1 - (knowledge_index.embedding <=> query_embedding) as similarity
  from knowledge_index
  where 1 - (knowledge_index.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
