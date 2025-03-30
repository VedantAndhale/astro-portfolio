import { formatDate } from "@lib/utils";
import type { CollectionEntry } from "astro:content";

interface Props {
  entry: any;
  pill?: boolean;
}

export default function ArrowCard({ entry, pill = false }: Props) {
  const { collection } = entry;
  const { title, summary, date, tags } = entry.data;
  const href = `/${collection}/${entry.slug}`;

  return (
    <a href={href} class="inline-block w-full group hover:no-underline">
      <div class="relative flex flex-col sm:flex-row gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 group-hover:border-blue-200 dark:group-hover:border-blue-800/50 shadow-sm group-hover:shadow-md transition-all">
        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <time class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2 sm:mb-3">
            {summary}
          </p>
          <div class="flex flex-wrap gap-1.5">
            {tags?.map((tag: string) => (
              <span
                class="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div class="flex-shrink-0 hidden sm:block">
          <div class="w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-100 dark:border-gray-800 group-hover:shadow-sm transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
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
