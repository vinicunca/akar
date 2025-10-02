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
    metadata: defineCollection({
      type: 'data',
      source: 'metadata/**.json',
      schema: z.object({
        props: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            type: z.string().optional(),
            required: z.boolean().optional(),
            default: z.string().optional(),
            tags: z.record(z.string()).optional(),
            schema: z.any().optional(),
          }),
        ),
        emits: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            type: z.string().optional(),
          }),
        ),
        slots: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            type: z.string().optional(),
          }),
        ),
        exposed: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            type: z.string().optional(),
          }),
        ),
      }),
    }),
  },
});
