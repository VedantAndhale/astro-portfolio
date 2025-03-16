import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';

const Counter: Component = () => {
    const [count, setCount] = createSignal(0);

    return (
        <div style={{
            'padding': '1rem',
            'border': '1px solid #ccc',
            'border-radius': '0.5rem'
        }}>
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
            >
                Increment
            </button>
        </div>
    );
};

export default Counter;