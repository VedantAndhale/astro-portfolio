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
    tailwind({
      applyBaseStyles: false,
      // Optimize Tailwind for production
      config: { applyBaseStyles: false }
    }),
    critters({
      fonts: true,
      preload: 'swap',
      // Enhanced critters settings for better performance
      pruneSource: true,
      inlineFonts: true,
      minimize: true
    }),
    prefetch({
      // Prefetch internal links for faster navigation
      selector: "a[href^='/']"
    }),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
        // Improve third-party script loading
        debug: false,
        lib: "./public/~partytown/"
      },
    }),
  ],

  // Configure how assets are handled
  assets: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'always', // Change to always to inline critical CSS
    // Add automatic compression for static assets
    format: 'file',
    // Optimize CSS
    cssMinify: true,
  },

  // Ensure markdown/MDX images are processed
  markdown: {
    drafts: false,
    shikiConfig: {
      theme: 'material-theme-palenight',
      // Optimize code blocks
      wrap: true,
    }
  },

  vite: {
    build: {
      // Optimize chunks for better loading
      cssCodeSplit: true,
      // Increase asset inlining limit for fewer requests
      assetsInlineLimit: 4096, // 4kb
      // Split chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'solid': ['solid-js'],
            'markdown': ['remark-gfm', 'rehype-slug', 'rehype-autolink-headings'],
          }
        }
      },
      minify: 'terser',
      // Terser optimization options
      terserOptions: {
        compress: {
          drop_console: true,
          dead_code: true
        }
      }
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
    // Add optimizations for CSS and JS
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      exclude: ['@vercel/speed-insights']
    }
  },

  compressHTML: true // Enable HTML compression for faster delivery
})