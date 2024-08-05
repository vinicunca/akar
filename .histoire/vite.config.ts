/// <reference types="vitest" />
/// <reference types="vite/client" />

import { HstVue } from '@histoire/plugin-vue';
import alias from '@rollup/plugin-alias';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);
export default defineConfig({
  histoire: {
    outDir: './dist',
    plugins: [HstVue()],
    setupFile: './setup.ts',
    storyMatch: [resolve(projectRootDir, '../packages/akar/src/**/*.story.vue')],
    theme: {
      title: 'Akar',
    },
    tree: {
      groups: [
        { include: (_file) => true, title: 'Components' },
        { id: 'utilities', title: 'Utilities' },
      ],
    },
    viteNodeInlineDeps: [/@tanstack/],
  },
  plugins: [
    UnoCSS(),
    vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, '../packages/akar/src'),
        },
      ],
    }),
  ],
});

// animation, server fs, radix-ui/colors/, @iconify/vue, vitest, axe,
