import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~~': resolve(projectRootDir, 'src'),
    },
  },
});
