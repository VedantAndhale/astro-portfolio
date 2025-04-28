import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { SITE } from '@consts';
import type { CollectionEntry } from 'astro:content'; // Ensure CollectionEntry is imported

const parser = new MarkdownIt();

// Define a union type for the items
type ContentEntry = CollectionEntry<'blog'> | CollectionEntry<'projects'>;

function getItemLink(item: ContentEntry) {
  // Changed any to ContentEntry
  // Use 'collection' property to differentiate
  return item.collection === 'blog'
    ? `/blog/${item.slug}/`
    : `/projects/${item.slug}/`;
}

export async function GET(context: { site: string }) {
  const posts = await getCollection('blog');
  const projects = await getCollection('projects');

  // Explicitly type the combined array
  const items: ContentEntry[] = [...posts, ...projects];

  items.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: { a: ['href'] },
      }),
      pubDate: item.data.date,
      link: getItemLink(item),
      author: ('author' in item.data && typeof item.data.author === 'string' // Add type check for author
        ? item.data.author
        : SITE.AUTHOR) as string,
      category: item.data.tags || [],
      enclosure:
        'image' in item.data && typeof item.data.image === 'string' // Add type check for image
          ? { url: item.data.image, length: 0, type: 'image/jpeg' }
          : undefined,
    })),
  });
}
