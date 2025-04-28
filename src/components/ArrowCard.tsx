import type { CollectionEntry } from 'astro:content';

interface ArrowCardProps {
  entry: CollectionEntry<'blog'> | CollectionEntry<'projects'>;
}

export default function ArrowCard({ entry }: ArrowCardProps) {
  const { collection } = entry;
  const { title, summary, date, tags } = entry.data;
  const href = `/${collection}/${entry.slug}`;

  return (
    <a href={href} class="group inline-block w-full hover:no-underline">
      <div class="hover-card-premium relative flex flex-col gap-3 rounded-lg border border-gray-200 bg-white/70 p-3.5 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/70 dark:group-hover:border-blue-800/50 sm:flex-row sm:rounded-xl sm:p-5">
        {/* Left accent bar that appears on hover */}
        <div class="absolute bottom-0 left-0 top-0 w-1 rounded-l-lg bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div class="min-w-0 flex-1">
          <div class="mb-2 flex flex-col gap-1.5 sm:mb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <h3 class="line-clamp-1 font-display text-sm font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-lg">
              {title}
            </h3>
            <time class="whitespace-nowrap text-xs font-medium text-gray-500 dark:text-gray-400">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <p class="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-4 sm:text-sm">
            {summary}
          </p>
          <div class="flex flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <span class="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2 py-1 font-display text-xs font-medium tracking-tight text-blue-600 dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-400 sm:px-2.5 sm:py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div class="hidden flex-shrink-0 sm:block">
          <div class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gradient-to-br from-blue-50 to-indigo-50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md dark:border-gray-800 dark:from-blue-900/20 dark:to-indigo-900/20 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <title>View {title}</title>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
