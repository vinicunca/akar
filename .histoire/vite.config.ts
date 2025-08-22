import { resolve } from 'node:path';
import { HstVue } from '@histoire/plugin-vue';
import alias from '@rollup/plugin-alias';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    alias({
      entries: [
        {
          find: '~~',
          replacement: resolve(projectRootDir, '../packages/core/src'),
        },
      ],
    }),
  ],

  histoire: {
    viteNodeInlineDeps: [/@tanstack/],
    plugins: [HstVue()],
    setupFile: './setup.ts',
    storyMatch: [
      resolve(
        projectRootDir,
        '../packages/core/src/**/*.story.vue',
      ),
    ],

    tree: {
      groups: [
        { title: 'Components', include: (_file) => true },
        { id: 'utilities', title: 'Utilities' },
      ],
    },

    theme: {
      title: 'Akar',
      logo: {
        square: '../docs/content/public/logo.svg',
        light: '../docs/content/public/logo.svg',
        dark: '../docs/content/public/logo.svg',
      },
    },
  },

  server: {
    fs: {
      // Allow serving files from two level up to the project root
      allow: ['..'],
    },
    host: true,
  },
});
