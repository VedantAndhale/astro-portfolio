import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

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

  return (
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filter Section */}
      <div class="order-1 lg:order-2 col-span-1">
        <div class="sticky top-24">
          <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter Projects
            </h2>

            <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Select tags to filter projects
            </p>

            <div class="border-t border-gray-200 dark:border-gray-800 pt-4 mb-3">
              <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {filter().size > 0 ? (
                  <div class="flex justify-between items-center">
                    <span>{filter().size} tag{filter().size > 1 ? 's' : ''} selected</span>
                    <button
                      onClick={() => setFilter(new Set())}
                      class="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                ) : (
                  <span>All tags</span>
                )}
              </div>

              <ul class="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
                <For each={tags}>
                  {(tag) => (
                    <li>
                      <button
                        onClick={() => toggleTag(tag)}
                        class={cn(
                          "w-full px-3 py-2 rounded-lg",
                          "flex items-center gap-2",
                          "transition-all duration-200 hover:shadow-sm",
                          filter().has(tag)
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50"
                            : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <div class={cn(
                          "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center",
                          filter().has(tag)
                            ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        )}>
                          {filter().has(tag) && (
                            <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span class="text-sm">{tag}</span>
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div class="order-2 lg:order-1 col-span-1 lg:col-span-3">
        <div class="flex flex-col">
          <div class="flex justify-between items-center mb-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
            <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Showing <span class="font-semibold text-blue-600 dark:text-blue-400">{projects().length}</span> of <span class="font-semibold">{data.length}</span> projects
            </div>

            {filter().size > 0 && (
              <div class="flex gap-2 items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Filtered by:</span>
                <div class="flex flex-wrap gap-1">
                  <For each={[...filter()]}>
                    {(tag) => (
                      <button
                        onClick={() => toggleTag(tag)}
                        class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
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

          {projects().length > 0 ? (
            <ul class="grid grid-cols-1 gap-5">
              {projects().map((project) => (
                <li>
                  <ArrowCard entry={project} />
                </li>
              ))}
            </ul>
          ) : (
            <div class="flex flex-col items-center justify-center p-12 text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 15h8M9.5 9h.01M14.5 9h.01"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No projects found</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filter selection</p>
              <button
                onClick={() => setFilter(new Set())}
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
