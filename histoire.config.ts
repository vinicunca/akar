import { HstVue } from '@histoire/plugin-vue';
import { defineConfig } from 'histoire';

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: '/path/to/your/histoire.setup.ts',
  // Other configuration options...
});
