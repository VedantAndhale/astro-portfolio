import type { CollectionEntry } from 'astro:content';
import ArrowCard from '@components/ArrowCard';
import FilterableContentList from '@components/FilterableContentList';

type Props = {
  tags: string[];
  data: CollectionEntry<'projects'>[];
};

// Define the SVG icon for Projects
const ProjectIcon = () => (
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
    <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
  </svg>
);

export default function Projects({ data, tags }: Props) {
  return (
    <FilterableContentList
      data={data}
      tags={tags}
      title="Projects"
      iconSvg={<ProjectIcon />}
      itemComponent={ArrowCard}
    />
  );
}
