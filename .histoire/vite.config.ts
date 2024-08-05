import { HstVue } from '@histoire/plugin-vue';
import Vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

export default defineConfig({
  histoire: {
    plugins: [
      HstVue(),
    ],
    storyMatch: [
      resolve(
        projectRootDir,
        '../packages/akar/src/**/*.story.vue',
      ),
    ],
  },

  plugins: [
    Vue(),
  ],

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
});
