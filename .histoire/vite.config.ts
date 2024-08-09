import { HstVue } from '@histoire/plugin-vue';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

export default defineConfig({
  histoire: {
    plugins: [
      HstVue(),
    ],
    setupFile: './setup.ts',
    storyMatch: [
      resolve(
        projectRootDir,
        '../packages/akar/src/**/*.story.vue',
      ),
    ],
    theme: {
      title: 'Akar',
    },
  },

  plugins: [
    UnoCSS(),
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: '~~',
        replacement: resolve(projectRootDir, '../packages/akar/src'),
      },
    ],
  },

  /**
   * We need to allow serving files from the `akar` package,
   * if not vite will throw an error saying that the file doesn't exist.
   *
   * @see https://vitejs.dev/config/server-options#server-fs-allow
   */
  server: {
    fs: {
      // Allow serving files from two level up to the project root
      allow: ['..'],
    },
    host: true,
  },

  tree: {
    groups: [
      { include: (_file) => true, title: 'Components' },
      { id: 'utilities', title: 'Utilities' },
    ],
  },
});
