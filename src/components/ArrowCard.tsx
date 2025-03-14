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
      class="group p-5 flex items-center justify-between rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div class="w-full pr-4">
        <div class="flex flex-wrap items-center gap-2">
          {pill && (
            <div class="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {entry.collection === "blog" ? "Post" : "Project"}
            </div>
          )}
          <div class="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
            {formatDate(entry.data.date)}
          </div>
        </div>

        <h3 class="text-base md:text-lg font-semibold mt-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {entry.data.title}
        </h3>

        <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
          {entry.data.summary}
        </p>

        <ul class="flex flex-wrap mt-3 gap-1.5">
          {entry.data.tags.map(
            (tag: string) => (
              <li class="text-xs font-medium py-1 px-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {tag}
              </li>
            )
          )}
        </ul>
      </div>

      <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
