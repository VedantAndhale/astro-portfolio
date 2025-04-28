import { createSignal, For, Show } from 'solid-js';
import { cn } from '@lib/utils';

type PremiumFilterProps = {
  tags: string[];
  selectedTags: Set<string>;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
  title: string;
  // description: string; // Removed
};

export default function PremiumFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll,
  title,
  // description, // Removed
}: PremiumFilterProps) {
  const [mobileExpanded, setMobileExpanded] = createSignal(false);
  const [desktopExpanded, setDesktopExpanded] = createSignal(false);

  return (
    <div class="lg:w-64">
      {/* Mobile filter toggle button */}
      <button
        class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80 lg:hidden"
        onClick={() => setMobileExpanded(!mobileExpanded())}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setMobileExpanded(!mobileExpanded());
          }
        }}
        aria-expanded={mobileExpanded()}
        aria-controls="mobile-filter-content"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <svg
              class="h-5 w-5"
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
          </div>
          <span class="font-medium text-gray-800 dark:text-gray-200">
            {title}
          </span>
        </div>
        {/* Combined chevron and clear button - Visual elements */}
        <div class="flex items-center gap-2">
          <Show when={selectedTags.size > 0}>
            <button
              class="text-xs text-blue-600 hover:underline dark:text-blue-400"
              onClick={(e) => {
                e.stopPropagation();
                onClearAll();
              }}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  onClearAll();
                }
              }}
              aria-label="Clear filters"
            >
              Clear
            </button>
          </Show>
          <div
            class={cn(
              'flex h-6 w-6 items-center justify-center transition-transform duration-300',
              mobileExpanded() ? 'rotate-180' : ''
            )}
          >
            <svg
              class="h-4 w-4"
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
        </div>
      </button>

      {/* Mobile filter expanded view */}
      <div
        id="mobile-filter-content"
        class={cn(
          'overflow-hidden transition-all duration-300 lg:hidden',
          mobileExpanded()
            ? 'mt-3 max-h-[60vh] opacity-100'
            : 'max-h-0 opacity-0'
        )}
      >
        <div class="rounded-xl border border-gray-200 bg-white/90 p-5 shadow-lg backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/90">
          <div class="mb-4 border-b border-gray-200 pb-4 dark:border-gray-800">
            <div class="mb-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedTags.size > 0 ? (
                <div class="flex w-full items-center justify-between">
                  <span>
                    {selectedTags.size} tag{selectedTags.size > 1 ? 's' : ''}{' '}
                    selected
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearAll();
                    }}
                    class="text-xs text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Clear all
                  </button>
                </div>
              ) : (
                <span>Select filters below</span>
              )}
            </div>

            <div class="flex flex-wrap gap-2">
              <For each={[...selectedTags]}>
                {(tag) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagToggle(tag);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        onTagToggle(tag);
                      }
                    }}
                    aria-label={`Remove filter: ${tag}`}
                    class="inline-flex items-center gap-1 rounded-full border border-blue-200/50 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1.5 text-xs text-blue-700 shadow-sm transition-all hover:shadow-md dark:border-blue-800/30 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300"
                  >
                    {tag}
                    <svg
                      class="h-3 w-3"
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

          {/* Mobile tag list */}
          <div class="relative">
            <div class="p-2">
              <div class="grid max-h-[350px] grid-cols-2 gap-2 overflow-y-auto pr-2 xs:grid-cols-3">
                <For each={tags}>
                  {(tag) => (
                    <button
                      role="checkbox"
                      aria-checked={selectedTags.has(tag)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTagToggle(tag);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          onTagToggle(tag);
                        }
                      }}
                      class={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800/70',
                        selectedTags.has(tag) &&
                        'bg-blue-50 dark:bg-blue-900/20'
                      )}
                    >
                      <div
                        class={cn(
                          'h-4 w-4 flex-shrink-0 rounded-sm transition-colors',
                          selectedTags.has(tag)
                            ? 'border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500'
                            : 'border border-gray-300 dark:border-gray-600'
                        )}
                      />
                      <span class="truncate text-sm text-gray-700 dark:text-gray-300">
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

      {/* Desktop filter (only visible on desktop) */}
      <div class="hidden lg:block">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <Show when={selectedTags.size > 0}>
            <button
              onClick={onClearAll}
              class="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Clear all
            </button>
          </Show>
        </div>

        {/* Desktop selected tags */}
        <Show when={selectedTags.size > 0}>
          <div class="mb-4 border-b border-gray-200 pb-4 dark:border-gray-800">
            <div class="flex flex-wrap gap-2">
              <For each={[...selectedTags]}>
                {(tag) => (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagToggle(tag);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        onTagToggle(tag);
                      }
                    }}
                    aria-label={`Remove filter: ${tag}`}
                    class="inline-flex items-center gap-1.5 rounded-md border border-blue-200/50 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-1.5 text-sm text-blue-700 shadow-sm transition-all hover:from-blue-500/15 hover:to-indigo-500/15 hover:shadow-md dark:border-blue-700/50 dark:from-blue-500/20 dark:to-indigo-500/20 dark:text-blue-300 dark:hover:from-blue-500/30 dark:hover:to-indigo-500/30"
                  >
                    {tag}
                    <svg
                      class="h-3.5 w-3.5"
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

        {/* Tags section - expandable on desktop */}
        <div class="relative">
          <div
            id="desktop-filter-tags"
            class={cn(
              'overflow-hidden transition-all duration-300',
              desktopExpanded() ? 'max-h-[1000px]' : 'max-h-[160px]'
            )}
          >
            <div class="flex flex-wrap gap-2">
              <For each={tags}>
                {(tag) => (
                  <button
                    onClick={() => onTagToggle(tag)}
                    class={cn(
                      'rounded-md border px-3 py-1.5 text-sm transition-colors',
                      selectedTags.has(tag)
                        ? 'border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                  >
                    {tag}
                  </button>
                )}
              </For>
            </div>
          </div>
          <Show when={tags.length > 10}>
            <div
              class={cn(
                'absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-white pt-8 pb-2 dark:from-gray-900',
                desktopExpanded() ? 'hidden' : ''
              )}
            >
              <button
                onClick={() => setDesktopExpanded(true)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setDesktopExpanded(true);
                  }
                }}
                class="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                aria-expanded="false"
                aria-controls="desktop-filter-tags"
              >
                Show more
                {/* ... chevron icon ... */}
              </button>
            </div>
            <Show when={desktopExpanded()}>
              <div class="mt-4 flex justify-center">
                <button
                  onClick={() => setDesktopExpanded(false)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setDesktopExpanded(false);
                    }
                  }}
                  class="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                  aria-expanded="true"
                  aria-controls="desktop-filter-tags"
                >
                  Show less
                  {/* ... chevron icon (rotated) ... */}
                </button>
              </div>
            </Show>
          </Show>
        </div>
      </div>
    </div>
  );
}
