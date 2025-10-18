import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    pohon: './src/pohon/index.ts',
  },
  clean: true,
  dts: true,
  external: ['unocss'],
});
