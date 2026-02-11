import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kevinjin.dev',
  base: '/',
  outDir: './dist',
  publicDir: './public',
  build: {
    assets: '_astro'
  },
  integrations: [
    starlight({
      title: 'Kevin Jin',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kevinjin420' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/kevinjin0420/' },
        { icon: 'email', label: 'Email', href: 'mailto:kevinjin0420@gmail.com' },
      ],
      sidebar: [
        {
          label: 'Blog',
          autogenerate: { directory: 'blog' },
        },
        {
          label: 'Projects',
          autogenerate: { directory: 'projects' },
        },
        {
          label: 'Resume',
          link: '/resume',
        },
      ],
      customCss: ['./src/styles/starlight-theme.css'],
      disable404Route: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
  }
});
