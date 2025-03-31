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
      preload: 'swap'
    }),
    prefetch(),
    // Completely removing astro-compress integration
    // We will handle compression separately, after the build
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