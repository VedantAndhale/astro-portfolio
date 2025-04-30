/**
 * Web Vitals monitoring script for performance tracking
 * Reports Core Web Vitals metrics to analytics
 */

import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

// Function to send metrics to analytics
function sendToAnalytics({ name, delta, id, value }) {
    // You can customize this to send to your analytics platform
    // Example for Google Analytics
    if (window.gtag) {
        window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            non_interaction: true,
            metric_value: value,
        });
    }

    // Log metrics in development environment
    if (process.env.NODE_ENV === 'development') {
        console.log(`Web Vitals: ${name}`, { delta, id, value });
    }
}

// Report all Core Web Vitals
export function reportWebVitals() {
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
}

// Execute immediately when included
reportWebVitals();
