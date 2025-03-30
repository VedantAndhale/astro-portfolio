import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"
import PremiumFilter from "@components/PremiumFilter"

type Props = {
  tags: string[]
  data: CollectionEntry<"projects">[]
}

export default function Projects({ data, tags }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [projects, setProjects] = createSignal<CollectionEntry<"projects">[]>([])

  createEffect(() => {
    setProjects(data.filter((entry) =>
      Array.from(filter()).every((value) =>
        entry.data.tags.some((tag: string) =>
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    ))
  })

  function toggleTag(tag: string) {
    setFilter((prev) =>
      new Set(prev.has(tag)
        ? [...prev].filter((t) => t !== tag)
        : [...prev, tag]
      )
    )
  }

  function clearAllTags() {
    setFilter(new Set())
  }

  return (
    <div class="flex flex-col gap-6">
      {/* Filter Section - Now at the top for both mobile and desktop */}
      <div class="w-full">
        <PremiumFilter
          tags={tags}
          selectedTags={filter()}
          onTagToggle={toggleTag}
          onClearAll={clearAllTags}
          title="Filter Projects"
          description="Select tags to filter projects"
        />
      </div>

      {/* Results Summary */}
      <div class="flex justify-between items-center mb-2 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-md p-4">
        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Showing <span class="font-semibold text-blue-600 dark:text-blue-400">{projects().length}</span> of <span class="font-semibold">{data.length}</span> projects
        </div>

        {filter().size > 0 && (
          <div class="flex gap-2 items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Filtered by:</span>
            <div class="flex flex-wrap gap-1">
              <For each={[...filter()]}>
                {(tag) => (
                  <button
                    onClick={() => toggleTag(tag)}
                    class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all"
                  >
                    {tag}
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                )}
              </For>
            </div>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div class="w-full">
        {projects().length > 0 ? (
          <ul class="grid grid-cols-1 gap-5">
            {projects().map((project) => (
              <li>
                <ArrowCard entry={project} />
              </li>
            ))}
          </ul>
        ) : (
          <div class="flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-md">
            <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 15h8M9.5 9h.01M14.5 9h.01"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filter selection</p>
            <button
              onClick={clearAllTags}
              class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
