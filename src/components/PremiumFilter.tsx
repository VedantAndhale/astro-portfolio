import { createSignal, createEffect, For, Show, onMount, onCleanup } from "solid-js";
import { cn } from "@lib/utils";

type FilterProps = {
    tags: string[];
    selectedTags: Set<string>;
    onTagToggle: (tag: string) => void;
    onClearAll: () => void;
    title: string;
    description: string;
};

export default function PremiumFilter({
    tags,
    selectedTags,
    onTagToggle,
    onClearAll,
    title,
    description
}: FilterProps) {
    const [mobileExpanded, setMobileExpanded] = createSignal(false);
    const [desktopExpanded, setDesktopExpanded] = createSignal(false);
    let mobileFilterRef: HTMLDivElement | undefined;
    let desktopFilterRef: HTMLDivElement | undefined;

    // Handle click outside to close filters
    const handleClickOutside = (event: MouseEvent) => {
        // For mobile filter
        if (mobileExpanded() && mobileFilterRef && !mobileFilterRef.contains(event.target as Node)) {
            setMobileExpanded(false);
        }

        // For desktop filter
        if (desktopExpanded() && desktopFilterRef && !desktopFilterRef.contains(event.target as Node)) {
            setDesktopExpanded(false);
        }
    };

    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
        onCleanup(() => {
            document.removeEventListener('mousedown', handleClickOutside);
        });
    });

    return (
        <>
            {/* Mobile filter toggle button (only visible on mobile) */}
            <div class="lg:hidden w-full mb-6" ref={mobileFilterRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent immediate propagation
                        setMobileExpanded(!mobileExpanded());
                    }}
                    class="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30 shadow-sm transition-all hover:shadow-md"
                >
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-glow-blue">
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                        </div>
                        <div class="text-left">
                            <h3 class="font-semibold text-gray-900 dark:text-white">{title}</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                {selectedTags.size > 0 ? `${selectedTags.size} selected` : 'Tap to filter'}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <Show when={selectedTags.size > 0}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClearAll();
                                }}
                                class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300"
                            >
                                Clear
                            </button>
                        </Show>
                        <div class={cn(
                            "w-6 h-6 flex items-center justify-center transition-transform duration-300",
                            mobileExpanded() ? "rotate-180" : ""
                        )}>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </button>

                {/* Mobile filter expanded view - UPDATED to match desktop style */}
                <div
                    class={cn(
                        "transition-all duration-300 overflow-hidden",
                        mobileExpanded() ? "max-h-[60vh] opacity-100 mt-3" : "max-h-0 opacity-0"
                    )}
                    onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the filter
                >
                    <div class="p-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
                        <div class="mb-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex justify-between items-center">
                                {selectedTags.size > 0 ? (
                                    <div class="flex justify-between items-center w-full">
                                        <span>{selectedTags.size} tag{selectedTags.size > 1 ? 's' : ''} selected</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClearAll();
                                            }}
                                            class="text-xs text-blue-600 dark:text-blue-400 hover:underline"
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
                                            class="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all"
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

                        {/* Updated mobile tag organization to match desktop */}
                        <div class="relative">
                            <div class="p-2">
                                <div class="grid grid-cols-2 xs:grid-cols-3 gap-2 max-h-[350px] overflow-y-auto pr-2">
                                    <For each={tags}>
                                        {(tag) => (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTagToggle(tag);
                                                }}
                                                class={cn(
                                                    "flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors duration-200",
                                                    selectedTags.has(tag) && "bg-blue-50 dark:bg-blue-900/20"
                                                )}
                                            >
                                                {/* Simple colored square for checkbox - Mobile */}
                                                <div class={cn(
                                                    "w-4 h-4 rounded-sm flex-shrink-0 transition-colors",
                                                    selectedTags.has(tag)
                                                        ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                                                        : "border border-gray-300 dark:border-gray-600"
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
            </div>

            {/* Desktop filter (only visible on desktop) */}
            <div class="hidden lg:block w-full" ref={desktopFilterRef}>
                <div class="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-100/50 dark:border-gray-700/30 shadow-xl overflow-hidden">
                    {/* Header with glass effect */}
                    <div class="relative p-6 overflow-hidden">
                        {/* Background blur effects */}
                        <div class="absolute -top-12 -left-12 w-32 h-32 bg-blue-200/30 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
                        <div class="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-200/30 dark:bg-indigo-700/10 rounded-full blur-3xl"></div>

                        {/* Content */}
                        <div class="relative">
                            <div class="flex flex-wrap justify-between items-center gap-4">
                                <div class="flex items-center gap-4">
                                    <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-glow-blue transform transition-transform hover:scale-105 duration-300">
                                        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {selectedTags.size > 0 ? (
                                            <span>{selectedTags.size} tag{selectedTags.size > 1 ? 's' : ''} selected</span>
                                        ) : (
                                            <span>No filters applied</span>
                                        )}
                                    </div>

                                    <Show when={selectedTags.size > 0}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClearAll();
                                            }}
                                            class="text-sm px-4 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </Show>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDesktopExpanded(!desktopExpanded());
                                        }}
                                        class="px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-colors flex items-center gap-1"
                                    >
                                        <span>{desktopExpanded() ? "Hide filters" : "Show filters"}</span>
                                        <div class={cn(
                                            "w-5 h-5 flex items-center justify-center transition-transform duration-300",
                                            desktopExpanded() ? "rotate-180" : ""
                                        )}>
                                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-2 mt-4">
                                <For each={[...selectedTags]}>
                                    {(tag) => (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onTagToggle(tag);
                                            }}
                                            class="inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-all hover:from-blue-500/15 hover:to-indigo-500/15 dark:hover:from-blue-500/30 dark:hover:to-indigo-500/30"
                                        >
                                            {tag}
                                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>

                    {/* Tags section - expandable on desktop */}
                    <div
                        class={cn(
                            "transition-all duration-300 overflow-hidden",
                            desktopExpanded() ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the filter
                    >
                        <div class="relative">
                            <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-gray-200/20 dark:from-gray-700/20 to-transparent"></div>
                            <div class="p-6 pt-4">
                                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[250px] overflow-y-auto pr-2">
                                    <For each={tags}>
                                        {(tag) => (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onTagToggle(tag);
                                                }}
                                                class={cn(
                                                    "flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors duration-200",
                                                    selectedTags.has(tag) && "bg-blue-50 dark:bg-blue-900/20"
                                                )}
                                            >
                                                {/* Simple colored square for checkbox - Desktop */}
                                                <div class={cn(
                                                    "w-4 h-4 rounded-sm flex-shrink-0 transition-colors",
                                                    selectedTags.has(tag)
                                                        ? "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500"
                                                        : "border border-gray-300 dark:border-gray-600"
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
            </div>
        </>
    );
}