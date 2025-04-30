import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
// import critters from 'astro-critters'; // Commented out
// import prefetch from '@astrojs/prefetch'; // Removed deprecated prefetch
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel'; // Import the Vercel adapter
import compress from 'astro-compress'; // Import compress directly

// Skip importing compress from astro-compress here
// We'll handle compression differently

// https://astro.build/config
export default defineConfig({
  // output: 'server', // Keep commented out for now
  site: 'https://vedant.me/', // Replace with your actual domain
  integrations: [// Start with minimal integrations
  // Keep tailwind for basic styling
  tailwind({ applyBaseStyles: false }), // Keep vercel adapter
  // mdx(), // Commented out
  // sitemap(), // Commented out
  // solidJs(), // Commented out
  // critters({ // Commented out
  //   fonts: true,
  //   preload: 'swap',
  //   inlineThreshold: 0, // Inline all CSS below 0kb
  //   pruneSource: true, // Remove unused styles
  // }),
  // prefetch({ // Removed deprecated prefetch
  //   throttle: 3, // Limit concurrent prefetch requests
  //   selector: "a[href^='/']:not([href*='.']):not([data-no-prefetch])", // Only prefetch internal pages
  // }),
  // compress({ // Commented out
  //   css: true,
  //   html: {
  //     removeAttributeQuotes: false,
  //     removeComments: true,
  //     removeRedundantAttributes: true,
  //     removeScriptTypeAttributes: true,
  //     removeStyleLinkTypeAttributes: true,
  //     removeEmptyAttributes: true,
  //     minifyJS: true,
  //     minifyCSS: true,
  //     useShortDoctype: true,
  //     collapseWhitespace: true,
  //   },
  //   img: true,
  //   js: true,
  //   svg: false, // Don't touch SVG assets as requested
  //   logger: 1, // Show only errors
  // }),
  // partytown({ // Commented out
  //   // Adds dataLayer.push as a forwarding-event.
  //   config: {
  //     forward: ['dataLayer.push'],
  //     debug: false, // Disable in production
  //     resolveUrl: (url) => {
  //       // Help Partytown load resources from the right location
  //       const browserURL = new URL(url);
  //       if (browserURL.hostname === 'cdn.example.com') {
  //         return new URL('https://cdn.example.com' + browserURL.pathname);
  //       }
  //       return url;
  //     },
  //   },
  // }),
  vercel(), solidJs()],

  // Configure how assets are handled
  assets: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
    split: true, // Enable code splitting
    format: 'file', // Optimize for long-term caching
  },

  // Ensure markdown/MDX images are processed
  markdown: {
    drafts: false,
    shikiConfig: {
      theme: 'material-theme-palenight',
    },
  },

  vite: {
    build: {
      assetsInlineLimit: 0, // Don't inline any assets (including SVGs)
      chunkSizeWarningLimit: 1000, // Increase size warning limit for chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Group vendor dependencies into separate chunks
            vendor: ['react', 'react-dom', 'solid-js'],
            'ui-components': [
              // Add common UI component paths here if you have many
            ],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ['@vercel/speed-insights'], // Don't pre-bundle analytics
      include: [], // You can add specific dependencies to pre-bundle here
    },
    // plugins: [ // Commented out custom plugin
    //   {
    //     name: 'no-svg-optimization',
    //     enforce: 'pre',
    //     transform(code, id) {
    //       if (id.endsWith('.svg')) {
    //         return {
    //           code,
    //           map: null,
    //         };
    //       }
    //     },
    //   },
    // ],
    // Add caching for improved build performance
    server: {
      fs: {
        strict: true,
      },
    },
  },
});