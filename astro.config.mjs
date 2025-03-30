import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  vite: {
    server: {
      headers: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self';",
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'X-Frame-Options': 'DENY',
      },
    },
  },
});