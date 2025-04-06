import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import critters from 'astro-critters'
import prefetch from '@astrojs/prefetch'
import partytown from '@astrojs/partytown'

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
      // Add these options to improve font loading
      inlineFonts: true,
      pruneSource: true
    }),
    prefetch({
      // Only prefetch links that are highly likely to be clicked
      selector: "a[href^='/']:not([href*=\\#]):not([href$=\\.jpg]):not([href$=\\.png])"
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
        // Improve load time by deferring script execution
        debug: false,
        logScriptExecution: false
      },
    }),
  ],

  // Configure how assets are handled
  assets: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'always', // Always inline critical CSS
    // Build optimizations
    format: 'file', // Better code splitting
    splitting: true,
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
      // Optimize chunks for better caching
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            vendor: [/node_modules\/(react|solid-js)/],
          }
        }
      },
      // Enable minification
      minify: true,
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
    ],
    // Cache build assets for faster builds
    optimizeDeps: {
      include: ['astro-critters', '@fontsource/*']
    },
    // Optimize JS output
    esbuild: {
      legalComments: 'none',
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
    }
  },

  // Optimize HTML output
  compressHTML: true // Enable HTML compression for better performance
})