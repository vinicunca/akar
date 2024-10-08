import { HstVue } from '@histoire/plugin-vue';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
  ],

  resolve: {
    alias: [
      {
        find: '~~',
        replacement: resolve(projectRootDir, '../packages/core/src'),
      },
    ],
  },

  histoire: {
    plugins: [
      HstVue(),
    ],
    setupFile: './setup.ts',
    storyMatch: [
      resolve(
        projectRootDir,
        '../packages/core/src/**/*.story.vue',
      ),
      resolve(
        projectRootDir,
        '../packages/mandor/**/*.story.vue',
      ),
    ],
    theme: {
      title: 'Akar',
    },
    tree: {
      groups: [
        {
          id: 'components',
          include: (file) => !file.title.toLowerCase().includes('utilities'),
          title: 'Components',
        },
        {
          id: 'utilities',
          include: (file) => file.title.toLowerCase().includes('utilities'),
          title: 'Utilities',
        },
        {
          id: 'mandor',
          include: (file) => file.title.toLowerCase().includes('mandor'),
          title: 'Mandor',
        },
      ],
    },
  },

  /**
   * We need to allow serving files from the `core` package,
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

});
