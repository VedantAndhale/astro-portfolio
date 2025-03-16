import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import critters from 'astro-critters'
import compress from "astro-compress"
import partytown from "@astrojs/partytown"

// https://astro.build/config
export default defineConfig({
  site: "https://vedant.me/",
  output: 'static',
  build: {
    // Enable inlining of assets
    inlineStylesheets: 'auto',
    assets: 'assets',
    // Optimize build
    format: 'file',
    splitting: true,
    // CSS optimization
    cssMinify: true,
    // Enable server-side rendering for improved SEO
    serverEntry: 'entry.mjs',
  },
  integrations: [
    mdx(), 
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('404'),
    }), 
    solidJs(),
    tailwind({ 
      applyBaseStyles: false,
      // Enable JIT for better performance
      mode: 'jit',
    }),
    critters({
      // Inline critical CSS
      preload: 'media',
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        debug: false,
      },
    }),
  ],

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['vedant.me'],
    // Add more optimized image formats
    serviceEntryPoint: '@astrojs/image/sharp',
    defaultQuality: 80,
  },

  // Markdown/MDX optimization
  markdown: {
    drafts: false,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
    remarkPlugins: ['remark-gfm', 'remark-smartypants'],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
  },

  // Enable prefetch for faster page loads
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  // Vite configuration for better performance
  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': [/node_modules/],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@astrojs/*'],
    },
  },
});