import { createSignal, onMount } from 'solid-js';
import type { Component } from 'solid-js';

interface CounterProps {
    initialCount?: number;
    delayMs?: number; // Delay before hydration
}

// Enhanced with performance optimizations
const Counter: Component<CounterProps> = (props) => {
    const [count, setCount] = createSignal(props.initialCount || 0);
    const [isHydrated, setIsHydrated] = createSignal(false);

    // Track hydration state to implement progressive enhancement
    onMount(() => {
        // Optional delay to prioritize more important components
        if (props.delayMs) {
            setTimeout(() => setIsHydrated(true), props.delayMs);
        } else {
            setIsHydrated(true);
        }
    });

    return (
        <div
            style={{
                'padding': '1rem',
                'border': '1px solid #ccc',
                'border-radius': '0.5rem',
                'opacity': isHydrated() ? '1' : '0.8',
                'transition': 'opacity 0.3s ease'
            }}
            data-hydrated={isHydrated() ? 'true' : 'false'}
        >
            <p style={{ 'margin-bottom': '0.5rem' }}>Count: {count()}</p>
            <button
                onClick={() => setCount(c => c + 1)}
                style={{
                    'padding': '0.5rem 1rem',
                    'background-color': '#3b82f6',
                    'color': 'white',
                    'border-radius': '0.25rem',
                    'cursor': 'pointer'
                }}
                disabled={!isHydrated()}
            >
                Increment
            </button>
        </div>
    );
};

export default Counter;