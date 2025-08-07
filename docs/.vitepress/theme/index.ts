/* eslint-disable no-restricted-syntax */
import type { Theme } from 'vitepress';

import { toPascalCase } from '@vinicunca/perkakas';

import Layout from '../custom/layout.vue';
import 'uno.css';
import './styles.css';

const regex = /\/(\w+)\.vue/;
const baseModules = import.meta.glob('../../components/*.vue', { eager: true });
const tableModules = import.meta.glob('../../components/tables/*.vue', { eager: true });

export default {
  Layout,
  enhanceApp({ app }) {
    for (const path in baseModules) {
      const componentName = toPascalCase(path.match(regex)?.[1] ?? '');
      app.component(componentName, (baseModules[path] as any)?.default);
    }

    for (const path in tableModules) {
      const componentName = toPascalCase(path.match(regex)?.[1] ?? '');
      app.component(componentName, (tableModules[path] as any)?.default);
    }
  },
} satisfies Theme;
