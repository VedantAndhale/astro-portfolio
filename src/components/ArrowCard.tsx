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
      <div class="relative flex flex-col sm:flex-row gap-3 p-3.5 sm:p-5 rounded-lg sm:rounded-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 group-hover:border-blue-200 dark:group-hover:border-blue-800/50 shadow-sm group-hover:shadow-lg transition-all duration-300 hover-card-premium">
        {/* Left accent bar that appears on hover */}
        <div class="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div class="flex-1 min-w-0">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-3">
            <h3 class="text-sm sm:text-lg font-semibold font-display tracking-tight text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <time class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
            {summary}
          </p>
          <div class="flex flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <span
                class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 font-display tracking-tight"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div class="flex-shrink-0 hidden sm:block">
          <div class="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-gray-100 dark:border-gray-800 group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:translate-x-1"
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
