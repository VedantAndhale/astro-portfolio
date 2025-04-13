import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import critters from 'astro-critters'
import prefetch from '@astrojs/prefetch'
import partytown from '@astrojs/partytown'

// Skip importing compress from astro-compress here
// We'll handle compression differently

// https://astro.build/config
export default defineConfig({
  site: "https://vedant.me/", // Replace with your actual domain
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    tailwind({ applyBaseStyles: false }),
    critters({
      fonts: true,
      preload: 'swap',
      inlineThreshold: 0, // Inline all CSS below 0kb
      pruneSource: true, // Remove unused styles
    }),
    prefetch({
      throttle: 3, // Limit concurrent prefetch requests
    }),
    // Import and use astro-compress for production builds
    {
      name: 'astro-compress',
      hooks: {
        'astro:config:setup': ({ command }) => {
          // Only use compress in production builds
          if (command === 'build') {
            import('astro-compress').then(({ default: compress }) => {
              compress({
                css: true,
                html: true,
                img: true,
                js: true,
                svg: true,
                logger: 1, // Show only errors
              });
            });
          }
        }
      }
    },
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],

  // Configure how assets are handled
  assets: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },

  // Ensure markdown/MDX images are processed
  markdown: {
    drafts: false,
    shikiConfig: {
      theme: 'material-theme-palenight'
    }
  },

  vite: {
    build: {
      assetsInlineLimit: 0, // Don't inline any assets (including SVGs)
    },
    plugins: [
      {
        name: 'no-svg-optimization',
        enforce: 'pre',
        transform(code, id) {
          if (id.endsWith('.svg')) {
            return {
              code,
              map: null
            };
          }
        }
      }
    ]
  },

  compressHTML: false // Disable HTML compression which might affect inline SVGs
})