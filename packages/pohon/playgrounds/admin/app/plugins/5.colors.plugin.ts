import type { UseHeadInput } from '@unhead/vue/types';
import {
  computed,
  defineNuxtPlugin,
  useAppConfig,
  useHead,
  useNuxtApp,
} from '#imports';

import { SHADES } from '../themes/constant';

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();

  const root = computed(() => {
    const { neutral, ...colors } = appConfig.pohon.colors;

    return `@layer theme {
    :root {
      ${Object.entries(appConfig.pohon.colors).map(([key, value]) => generateShades(key, value)).join('\n  ')}
    }
    :root, .light {
      ${Object.keys(colors).map((key) => generateColor(key, 500)).join('\n  ')}
    }
    .dark {
      ${Object.keys(colors).map((key) => generateColor(key, 400)).join('\n  ')}
    }
    }`;
  });

  // Head
  const headData: UseHeadInput = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'pohon-colors',
    }],
  };

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style');

    style.innerHTML = root.value;
    style.setAttribute('data-pohon-colors', '');
    document.head.appendChild(style);

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-pohon-colors]\'))',
    }];
  }

  useHead(headData);
});

function generateShades(key: string, value: string) {
  return `${SHADES.map(
    (shade) => `--akar-${key}-${shade}: var(--colors-${value}-${shade});`,
  ).join('\n  ')}`;
}

function generateColor(key: string, shade: number) {
  return `--akar-${key}: var(--akar-${key}-${shade});`;
}
