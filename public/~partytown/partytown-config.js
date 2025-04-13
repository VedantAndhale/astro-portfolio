// This file configures the Partytown library for optimal third-party script handling
// Place this file in your public folder to make it accessible to Partytown

module.exports = {
    // Set the Partytown debugging mode (disable in production)
    debug: false,

    // Forward specific browser events to the main thread
    // This is critical for scripts that need to interact with the page
    forward: [
        // Analytics events
        'dataLayer.push',
        'gtag',
        '_ga',
        'ga.q.push',

        // Social media events
        'fbq',

        // Custom events - add your own as needed
        'customEvent'
    ],

    // Define proxied properties
    // These properties allow third-party scripts to access browser APIs
    proxiedProperties: [
        'navigator.userAgent',
        'navigator.language'
    ],

    // Resolve URLs that Partytown might struggle with
    resolveUrl: function (url, location, type) {
        // Handle CDN resources
        if (url.hostname.includes('cdn.')) {
            return url;
        }

        // Handle Google resources
        if (url.hostname.includes('google-analytics.com') ||
            url.hostname.includes('googletagmanager.com')) {
            return url;
        }

        // Default behavior
        return url;
    },

    // Optimize known script loading
    // This helps Partytown load and execute scripts in the correct order
    loadScriptsOnMainThread: [
        // Critical scripts that should run on the main thread
        // Generally best to keep this list very short or empty
    ]
};
