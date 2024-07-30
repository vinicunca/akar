import { HstVue } from '@histoire/plugin-vue'
import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

const projectRootDir = resolve(__dirname)
export default defineConfig({
  histoire: {
    outDir: './dist',
    plugins: [{ name: 'builtin:tailwind-tokens' }, HstVue()],
    setupFile: './setup.ts',
    storyMatch: [resolve(projectRootDir, '../packages/akar/src/**/*.story.vue')],
    theme: {
      title: 'Akar',
    },
    tree: {
      groups: [
        { include: _file => true, title: 'Components' },
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
  resolve: {
    alias: {
      '@iconify/vue': './node_modules/@iconify/vue/dist/iconify.mjs',
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
    host: true,
  },
})
