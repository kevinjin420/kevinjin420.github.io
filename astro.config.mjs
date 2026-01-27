import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kevinjin420.github.io',
  base: '/',
  outDir: './dist',
  publicDir: './public',
  build: {
    assets: '_astro'
  },
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
  }
});
