export const FRAMEWORKS = {
  vite: {
    name: 'vite',
    label: 'Vite',
    links: {
      installation: 'https://pohon.vinicunca.dev/docs/installation/vite',
      unocss: 'https://unocss.dev/integrations/vite',
    },
  },
  nuxt: {
    name: 'nuxt',
    label: 'Nuxt',
    links: {
      installation: 'https://pohon.vinicunca.dev/docs/installation/nuxt',
      unocss: 'https://unocss.dev/integrations/nuxt',
    },
  },
} as const;

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];
