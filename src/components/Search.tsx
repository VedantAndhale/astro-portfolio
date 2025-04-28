import type { CollectionEntry } from 'astro:content';
import { createEffect, createSignal, Show } from 'solid-js';
import Fuse from 'fuse.js';
import ArrowCard from '@components/ArrowCard';

type SearchProps = {
  data: (CollectionEntry<'blog'> | CollectionEntry<'projects'>)[];
};

export default function Search({ data }: SearchProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal<
    (CollectionEntry<'blog'> | CollectionEntry<'projects'>)[]
  >([]);
  const [selectedIndex, setSelectedIndex] = createSignal(-1);
  let inputRef: HTMLInputElement | undefined;

  const fuse = new Fuse(data, {
    keys: ['slug', 'data.title', 'data.summary', 'data.tags'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  });

  createEffect(() => {
    if (query().length < 2) {
      setResults([]);
      setSelectedIndex(-1);
    } else {
      setResults(fuse.search(query()).map((result) => result.item));
      setSelectedIndex(-1);
    }
  });

  createEffect(() => {
    if (isOpen()) {
      // Focus input when dialog opens
      setTimeout(() => {
        inputRef?.focus();
      }, 0);
    }
  });

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentResults = results();
    if (currentResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < currentResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = currentResults[selectedIndex()];
      if (selected) {
        window.location.href = '/' + selected.collection + '/' + selected.slug;
      }
    }
  };

  // Handle keyboard shortcuts
  createEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen());
      }
      // Forward slash to open search
      if (e.key === '/' && !isOpen()) {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  });

  return (
    <div class="relative">
      {/* Overlay */}
      <Show when={isOpen()}>
        <div
          role="button" // Add role
          tabIndex={0} // Make it focusable
          class="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          // Add keyboard handler to close on Enter/Space
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}
          aria-label="Close search dialog" // Add aria-label
        />
        <div class="fixed inset-x-4 top-4 z-50 md:inset-x-auto md:left-1/2 md:top-8 md:w-full md:max-w-xl md:-translate-x-1/2">
          <div class="relative rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div class="p-4">
              <div class="relative">
                <input
                  ref={inputRef}
                  name="search"
                  type="text"
                  aria-label="Search anything" // Add aria-label
                  value={query()}
                  onInput={onInput}
                  onKeyDown={handleKeyDown}
                  autocomplete="off"
                  spellcheck={false}
                  placeholder="Search anything..."
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pl-10 pr-16 text-base outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-blue-400"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <svg class="h-5 w-5 stroke-current">
                    <use href={import.meta.env.BASE_URL + 'ui.svg#search'} />
                  </svg>
                </div>
                <kbd class="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400 sm:inline-flex">
                  <span class="text-xs">⌘</span>
                  <span class="text-xs">K</span>
                </kbd>
              </div>

              <Show when={query().length >= 2}>
                <div class="mt-4">
                  <Show
                    when={results().length >= 1}
                    fallback={
                      <div class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        No results found for "{query()}"
                      </div>
                    }
                  >
                    <div class="mb-2 px-2 text-xs uppercase text-gray-500 dark:text-gray-400">
                      Found {results().length} results
                    </div>
                    <div class="max-h-[50vh] overflow-y-auto md:max-h-[60vh]">
                      <ul class="flex flex-col gap-1 px-2">
                        {results().map((result, index) => (
                          <li
                            role="option" // Add role
                            aria-selected={index === selectedIndex()} // Indicate selection state
                            tabIndex={0} // Make it focusable
                            class={`overflow-hidden rounded-lg transition-colors duration-150 ${index === selectedIndex()
                                ? 'bg-gray-100 dark:bg-gray-800/50'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                              } active:bg-gray-200 dark:active:bg-gray-700/50`}
                            onClick={() => {
                              window.location.href =
                                '/' + result.collection + '/' + result.slug;
                            }}
                            // Add keyboard handler to navigate on Enter/Space
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                window.location.href =
                                  '/' + result.collection + '/' + result.slug;
                              }
                            }}
                          >
                            <ArrowCard entry={result} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Show>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
