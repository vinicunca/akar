import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: [{
        include: 'docs/**/*',
      }],
      schema: z.object({
        category: z.enum([
          'layout',
          'form',
          'element',
          'navigation',
          'data',
          'overlay',
          'dashboard',
          'page',
          'ai',
          'color-mode',
          'i18n',
        ]).optional(),
        framework: z.enum(['nuxt', 'vue']).optional(),
        navigation: z.object({
          title: z.string().optional(),
        }),
        links: z.array(
          z.object({
            label: z.string(),
            icon: z.string(),
            avatar: z.object({
              src: z.string(),
              alt: z.string(),
            }).optional(),
            to: z.string(),
            target: z.string().optional(),
          }),
        ),
      }),
    }),
  },
});
