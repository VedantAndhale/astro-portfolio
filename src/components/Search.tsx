import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, Show } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"

type Props = {
  data: (CollectionEntry<"blog"> | CollectionEntry<"projects">)[]
}

export default function Search({ data }: Props) {
  const [isOpen, setIsOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<(CollectionEntry<"blog"> | CollectionEntry<"projects">)[]>([])
  const [selectedIndex, setSelectedIndex] = createSignal(-1)
  let inputRef: HTMLInputElement | undefined;

  const fuse = new Fuse(data, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  createEffect(() => {
    if (query().length < 2) {
      setResults([])
      setSelectedIndex(-1)
    } else {
      setResults(fuse.search(query()).map((result) => result.item))
      setSelectedIndex(-1)
    }
  })

  createEffect(() => {
    if (isOpen()) {
      // Focus input when dialog opens
      setTimeout(() => {
        inputRef?.focus()
      }, 0)
    }
  })

  const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentResults = results()
    if (currentResults.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < currentResults.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => prev > -1 ? prev - 1 : prev)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const selected = currentResults[selectedIndex()]
      if (selected) {
        window.location.href = '/' + selected.collection + '/' + selected.slug
      }
    }
  }

  // Handle keyboard shortcuts
  createEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(!isOpen())
      }
      // Forward slash to open search
      if (e.key === "/" && !isOpen()) {
        e.preventDefault()
        setIsOpen(true)
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  })

  return (
    <div class="relative">
      {/* Overlay */}
      <Show when={isOpen()}>
        <div
          class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
        <div class="fixed inset-x-4 top-4 md:top-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-50">
          <div class="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
            <div class="p-4">
              <div class="relative">
                <input
                  ref={inputRef}
                  name="search"
                  type="text"
                  value={query()}
                  onInput={onInput}
                  onKeyDown={handleKeyDown}
                  autocomplete="off"
                  spellcheck={false}
                  placeholder="Search anything..."
                  class="w-full px-4 py-3 pl-10 pr-16 rounded-lg outline-none text-base bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <svg class="w-5 h-5 stroke-current">
                    <use href={import.meta.env.BASE_URL + "ui.svg#search"} />
                  </svg>
                </div>
                <kbd class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                  <span class="text-xs">⌘</span><span class="text-xs">K</span>
                </kbd>
              </div>

              <Show when={query().length >= 2}>
                <div class="mt-4">
                  <Show when={results().length >= 1} fallback={
                    <div class="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                      No results found for "{query()}"
                    </div>
                  }>
                    <div class="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2 px-2">
                      Found {results().length} results
                    </div>
                    <div class="max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
                      <ul class="flex flex-col gap-1 px-2">
                        {results().map((result, index) => (
                          <li
                            class={`overflow-hidden rounded-lg transition-colors duration-150 ${index === selectedIndex()
                              ? 'bg-gray-100 dark:bg-gray-800/50'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                              } active:bg-gray-200 dark:active:bg-gray-700/50`}
                            onClick={() => {
                              window.location.href = '/' + result.collection + '/' + result.slug;
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
  )
}