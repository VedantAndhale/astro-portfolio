import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For, Show, onMount, onCleanup } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"
import PremiumFilter from "@components/PremiumFilter"

type Props = {
  tags: string[]
  data: CollectionEntry<"blog">[]
}

export default function Blog({ data, tags }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [posts, setPosts] = createSignal<CollectionEntry<"blog">[]>([])
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
    setPosts(data.filter((entry) =>
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
    <div class="flex flex-col gap-4 sm:gap-5">
      {/* Combined Filter and Results Section */}
      <div class="w-full" ref={filterContainerRef}>
        <div class="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-md overflow-hidden">
          {/* Header with filter summary and controls */}
          <div class="p-3 sm:p-4 border-b border-gray-200/50 dark:border-gray-700/30">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
              {/* Blog count and filter summary */}
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Blog Posts</h2>
                  <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Showing <span class="font-medium text-blue-600 dark:text-blue-400">{posts().length}</span> of <span class="font-medium">{data.length}</span>
                  </p>
                </div>
              </div>

              {/* Filter controls */}
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <Show when={filter().size > 0}>
                  <button
                    onClick={clearAllTags}
                    class="text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                  >
                    Clear filters
                  </button>
                </Show>
                <button
                  onClick={() => setFilterExpanded(!filterExpanded())}
                  class="ml-auto sm:ml-0 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all"
                >
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="text-xs sm:text-sm">{filterExpanded() ? 'Hide filters' : 'Filter posts'}</span>
                  <div class={cn(
                    "flex items-center justify-center transition-transform duration-300",
                    filterExpanded() ? "rotate-180" : ""
                  )}>
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Active filters display */}
            <Show when={filter().size > 0}>
              <div class="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200/50 dark:border-gray-700/30">
                <div class="flex flex-wrap gap-1.5 sm:gap-2 items-center">
                  <span class="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
                  <For each={[...filter()]}>
                    {(tag) => (
                      <button
                        onClick={() => toggleTag(tag)}
                        class="inline-flex items-center gap-1 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all"
                      >
                        {tag}
                        <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div class="p-3 sm:p-4 bg-gray-50/50 dark:bg-gray-800/20">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
                <For each={tags}>
                  {(tag) => (
                    <button
                      onClick={() => toggleTag(tag)}
                      class={cn(
                        "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-left hover:bg-white dark:hover:bg-gray-800/70 transition-colors duration-200 border border-transparent",
                        filter().has(tag) && "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50"
                      )}
                    >
                      <div class={cn(
                        "w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm flex-shrink-0 transition-colors border",
                        filter().has(tag)
                          ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      )} />
                      <span class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">{tag}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div class="w-full">
        {posts().length > 0 ? (
          <ul class="grid grid-cols-1 gap-3 sm:gap-4">
            {posts().map((post) => (
              <li>
                <ArrowCard entry={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div class="flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 text-center bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-md">
            <svg class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-600 mb-3 sm:mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 15h8M9.5 9h.01M14.5 9h.01"></path>
            </svg>
            <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">No posts found</h3>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">Try adjusting your filter selection</p>
            <button
              onClick={clearAllTags}
              class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
