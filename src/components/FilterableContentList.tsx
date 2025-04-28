// src/components/FilterableContentList.tsx
import type { CollectionEntry } from 'astro:content';
import {
  createSignal,
  createEffect,
  For,
  Show,
  onMount,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js';
import { cn } from '@lib/utils';

// Define a generic type for the content entry that includes necessary data
type ContentItem = CollectionEntry<'blog'> | CollectionEntry<'projects'>;

// Define the props for the reusable component
type Props = {
  data: ContentItem[];
  tags: string[];
  title: string; // e.g., "Blog Posts", "Projects"
  iconSvg: JSX.Element; // Pass the SVG element directly
  itemComponent: Component<{ entry: ContentItem }>; // Component to render each item (e.g., ArrowCard)
};

export default function FilterableContentList({
  data,
  tags,
  title,
  iconSvg,
  itemComponent: ItemComponent, // Rename prop for clarity
}: Props) {
  const [filter, setFilter] = createSignal(new Set<string>());
  const [items, setItems] = createSignal<ContentItem[]>([]); // Generic name 'items'
  const [filterExpanded, setFilterExpanded] = createSignal(false);
  let filterContainerRef: HTMLDivElement | undefined;

  // Handle click outside to close the filter dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterExpanded() &&
      filterContainerRef &&
      !filterContainerRef.contains(event.target as Node)
    ) {
      setFilterExpanded(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  // Effect to filter items based on selected tags
  createEffect(() => {
    setItems(
      data.filter((entry) =>
        Array.from(filter()).every((value) =>
          entry.data.tags.some(
            (tag: string) => tag.toLowerCase() === String(value).toLowerCase()
          )
        )
      )
    );
  });

  // Toggle a tag in the filter set
  function toggleTag(tag: string) {
    setFilter(
      (prev) =>
        new Set(
          prev.has(tag) ? [...prev].filter((t) => t !== tag) : [...prev, tag]
        )
    );
    setFilterExpanded(false); // Close dropdown after selection
  }

  // Clear all selected tags
  function clearAllTags() {
    setFilter(new Set<string>());
  }

  return (
    <div class="flex flex-col gap-4 sm:gap-5">
      {/* Filter Section */}
      <div class="w-full" ref={filterContainerRef}>
        <div class="overflow-hidden rounded-lg border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/80 shadow-md backdrop-blur-lg dark:border-gray-700/30 dark:from-gray-900 dark:to-gray-800/80 sm:rounded-xl">
          {/* Header */}
          <div class="border-b border-gray-200/50 p-3 dark:border-gray-700/30 sm:p-4">
            <div class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
              {/* Title and Count */}
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md sm:h-10 sm:w-10">
                  {/* Use the passed icon SVG */}
                  {iconSvg}
                </div>
                <div>
                  <h2 class="font-display text-base font-semibold tracking-tight text-gray-900 dark:text-white sm:text-lg">
                    {/* Use the title prop */}
                    {title}
                  </h2>
                  <p class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    Showing{' '}
                    <span class="font-medium text-blue-600 dark:text-blue-400">
                      {items().length}
                    </span>{' '}
                    of <span class="font-medium">{data.length}</span>
                  </p>
                </div>
              </div>

              {/* Filter Controls */}
              <div class="flex w-full items-center gap-2 sm:w-auto">
                <Show when={filter().size > 0}>
                  <button
                    onClick={clearAllTags}
                    class="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-800/30 sm:px-3 sm:py-1.5"
                  >
                    Clear filters
                  </button>
                </Show>
                <button
                  onClick={() => setFilterExpanded(!filterExpanded())}
                  class="ml-auto flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 px-2.5 py-1.5 font-display font-medium tracking-tight text-white shadow-sm transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-md sm:ml-0 sm:flex-initial sm:gap-2 sm:px-3 sm:py-1.5"
                >
                  {/* Filter Icon */}
                  <svg
                    class="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  <span class="text-xs sm:text-sm">
                    {filterExpanded()
                      ? 'Hide filters'
                      : `Filter ${title.toLowerCase()}`}
                  </span>
                  {/* Chevron Icon */}
                  <div
                    class={cn(
                      'flex items-center justify-center transition-transform duration-300',
                      filterExpanded() ? 'rotate-180' : ''
                    )}
                  >
                    <svg
                      class="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            <Show when={filter().size > 0}>
              <div class="mt-2 border-t border-gray-200/50 pt-2 dark:border-gray-700/30 sm:mt-3 sm:pt-3">
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Active filters:
                  </span>
                  <For each={[...filter()]}>
                    {(tag) => (
                      <button
                        onClick={() => toggleTag(tag)}
                        class="inline-flex items-center gap-1 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-100 to-indigo-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 shadow-sm transition-all hover:shadow-md dark:border-blue-800/30 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 sm:px-2 sm:py-1"
                      >
                        {tag}
                        {/* Close Icon */}
                        <svg
                          class="h-2.5 w-2.5 sm:h-3 sm:w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>

          {/* Expandable Tag Selection */}
          <div
            class={cn(
              'overflow-hidden transition-all duration-300',
              filterExpanded()
                ? 'max-h-[300px] opacity-100'
                : 'max-h-0 opacity-0'
            )}
          >
            <div class="bg-gray-50/50 p-3 dark:bg-gray-800/20 sm:p-4">
              <div class="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-6">
                <For each={tags}>
                  {(tag) => (
                    <button
                      onClick={() => toggleTag(tag)}
                      class={cn(
                        'flex items-center gap-1.5 rounded-lg border border-transparent px-2 py-1.5 text-left transition-colors duration-200 hover:bg-white dark:hover:bg-gray-800/70 sm:gap-2 sm:px-3 sm:py-2',
                        filter().has(tag) &&
                        'border-blue-100 bg-blue-50 dark:border-blue-800/50 dark:bg-blue-900/20'
                      )}
                    >
                      {/* Checkbox Visual */}
                      <div
                        class={cn(
                          'h-3.5 w-3.5 flex-shrink-0 rounded-sm border transition-colors sm:h-4 sm:w-4',
                          filter().has(tag)
                            ? 'border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500'
                            : 'border-gray-300 dark:border-gray-600'
                        )}
                      />
                      <span class="truncate text-xs font-medium text-gray-700 dark:text-gray-300 sm:text-sm">
                        {tag}
                      </span>
                    </button>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items List Section */}
      <div class="w-full">
        {items().length > 0 ? (
          <ul class="grid grid-cols-1 gap-3 sm:gap-4">
            {/* Use the ItemComponent prop to render each item */}
            {items().map((item) => (
              <li>
                <ItemComponent entry={item} />
              </li>
            ))}
          </ul>
        ) : (
          // "No items found" message
          <div class="flex flex-col items-center justify-center rounded-lg border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/80 p-6 text-center shadow-md backdrop-blur-lg dark:border-gray-700/30 dark:from-gray-900 dark:to-gray-800/80 sm:rounded-xl sm:p-8 md:p-10">
            {/* Sad Face Icon */}
            <svg
              class="mb-3 h-12 w-12 text-gray-400 dark:text-gray-600 sm:mb-4 sm:h-16 sm:w-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 15h8M9.5 9h.01M14.5 9h.01"></path>
            </svg>
            <h3 class="mb-1 font-display text-base font-medium tracking-tight text-gray-900 dark:text-white sm:text-lg">
              No {title.toLowerCase()} found
            </h3>
            <p class="mb-3 text-xs text-gray-500 dark:text-gray-400 sm:mb-4 sm:text-sm">
              Try adjusting your filter selection
            </p>
            <button
              onClick={clearAllTags}
              class="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 font-display text-xs font-medium tracking-tight text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-md dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 sm:px-4 sm:py-2 sm:text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
