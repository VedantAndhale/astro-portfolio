import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { SITE } from "@consts";

const parser = new MarkdownIt();

function getItemLink(item: any) {
  return item.slug.startsWith("blog") ? `/blog/${item.slug}/` : `/projects/${item.slug}/`;
}

export async function GET(context: { site: string }) {
  const posts = await getCollection("blog");
  const projects = await getCollection("projects");

  const items = [...posts, ...projects];

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      content: sanitizeHtml(parser.render(item.body), {
        allowedTags: ["b", "i", "em", "strong", "a"],
        allowedAttributes: { a: ["href"] },
      }),
      pubDate: item.data.date,
      link: getItemLink(item),
      author: ("author" in item.data ? item.data.author : SITE.AUTHOR) as string,
      category: item.data.tags || [],
      enclosure: "image" in item.data ? { url: item.data.image as string, length: 0, type: "image/jpeg" } : undefined,
    })),
  });
}
