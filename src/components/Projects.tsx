import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For, Show, onMount, onCleanup } from "solid-js"
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
  const [filterExpanded, setFilterExpanded] = createSignal(false)
  let filterContainerRef: HTMLDivElement | undefined;

  // Handle click outside to close the filter dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (filterExpanded() && filterContainerRef && !filterContainerRef.contains(event.target as Node)) {
      setFilterExpanded(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

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
    // Close filter dropdown after selecting a tag
    setFilterExpanded(false);
  }

  function clearAllTags() {
    setFilter(new Set<string>())
  }

  return (
    <div class="flex flex-col gap-6">
      {/* Combined Filter and Results Section */}
      <div class="w-full" ref={filterContainerRef}>
        <div class="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg overflow-hidden">
          {/* Header with filter summary and controls */}
          <div class="p-4 sm:p-5 border-b border-gray-200/50 dark:border-gray-700/30">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              {/* Project count and filter summary */}
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Showing <span class="font-medium text-blue-600 dark:text-blue-400">{projects().length}</span> of <span class="font-medium">{data.length}</span>
                  </p>
                </div>
              </div>

              {/* Filter controls */}
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <Show when={filter().size > 0}>
                  <button
                    onClick={clearAllTags}
                    class="text-xs px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                  >
                    Clear filters
                  </button>
                </Show>
                <button
                  onClick={() => setFilterExpanded(!filterExpanded())}
                  class="ml-auto sm:ml-0 flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span>{filterExpanded() ? 'Hide filters' : 'Filter projects'}</span>
                  <div class={cn(
                    "flex items-center justify-center transition-transform duration-300",
                    filterExpanded() ? "rotate-180" : ""
                  )}>
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Active filters display */}
            <Show when={filter().size > 0}>
              <div class="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/30">
                <div class="flex flex-wrap gap-2 items-center">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
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
            </Show>
          </div>

          {/* Expandable filter section */}
          <div
            class={cn(
              "transition-all duration-300 overflow-hidden",
              filterExpanded() ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div class="p-5 bg-gray-50/50 dark:bg-gray-800/20">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <For each={tags}>
                  {(tag) => (
                    <button
                      onClick={() => toggleTag(tag)}
                      class={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-white dark:hover:bg-gray-800/70 transition-colors duration-200 border border-transparent",
                        filter().has(tag) && "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50"
                      )}
                    >
                      <div class={cn(
                        "w-4 h-4 rounded-sm flex-shrink-0 transition-colors border",
                        filter().has(tag)
                          ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      )} />
                      <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{tag}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
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
