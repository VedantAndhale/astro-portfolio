import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import critters from 'astro-critters'
import compress from 'astro-compress'
import prefetch from '@astrojs/prefetch'

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
    compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
    })
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

  compressHTML: true
})