import { formatDate } from "@lib/utils";
import type { CollectionEntry } from "astro:content";

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">;
  pill?: boolean;
};

export default function ArrowCard({ entry, pill }: Props) {
  return (
    <a
      href={`/${entry.collection}/${entry.slug}`}
      class="group relative p-5 flex items-center justify-between rounded-xl overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Premium gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-violet-50/50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-violet-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Bottom highlight animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

      <div class="w-full pr-4 relative z-10">
        <div class="flex flex-wrap items-center gap-2">
          {pill && (
            <div class="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400">
              {entry.collection === "blog" ? "Post" : "Project"}
            </div>
          )}
          <div class="flex items-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatDate(entry.data.date)}
          </div>
        </div>

        <h3 class="text-base md:text-lg font-semibold mt-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {entry.data.title}
        </h3>

        <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
          {entry.data.summary}
        </p>

        <ul class="flex flex-wrap mt-3 gap-1.5">
          {entry.data.tags.map(
            (tag: string) => (
              <li class="text-xs font-medium py-1 px-2.5 rounded-md bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700/50 group-hover:border-blue-100 dark:group-hover:border-blue-900/30 transition-colors">
                {tag}
              </li>
            )
          )}
        </ul>
      </div>

      <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/80 group-hover:from-blue-50 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30 shadow-sm transition-all duration-300 transform group-hover:scale-110 relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="stroke-gray-500 dark:stroke-gray-400 group-hover:stroke-blue-600 dark:group-hover:stroke-blue-400 transition-colors"
        >
          <line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            class="scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out"
          />
          <polyline
            points="12 5 19 12 12 19"
            class="group-hover:translate-x-1 transition-transform duration-300 ease-out"
          />
        </svg>
      </div>
    </a>
  );
}
