import type { CollectionEntry } from 'astro:content';
import ArrowCard from '@components/ArrowCard';
import FilterableContentList from '@components/FilterableContentList';

type Props = {
  tags: string[];
  data: CollectionEntry<'blog'>[];
};

// Define the SVG icon for Blog Posts
const BlogIcon = () => (
  <svg
    class="h-4 w-4 sm:h-5 sm:w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default function Blog({ data, tags }: Props) {
  // Render the reusable component with blog-specific props
  return (
    <FilterableContentList
      data={data}
      tags={tags}
      title="Blog Posts"
      iconSvg={<BlogIcon />}
      itemComponent={ArrowCard} // Pass ArrowCard as the component to render each item
    />
  );
}
