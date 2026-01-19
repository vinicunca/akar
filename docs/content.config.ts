import { defineCollection } from '@nuxt/content';
import { z } from 'zod';

const Avatar = z.object({
  src: z.string(),
  alt: z.string().optional(),
});

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  avatar: Avatar.optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  id: z.string().optional(),
  class: z.string().optional(),
});

export const collections = {
  docs: defineCollection({
    type: 'page',
    source: [{
      include: 'docs/**/*',
    }],
    schema: z.object({
      category: z.enum(['layout', 'form', 'element', 'navigation', 'data', 'overlay', 'dashboard', 'page', 'editor', 'color-mode', 'i18n']).optional(),
      framework: z.enum(['nuxt', 'vue']).optional(),
      navigation: z.object({
        title: z.string().optional(),
      }),
      links: z.array(Button),
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
          schema: z.any().optional(),
        }),
      ),
      events: z.array(
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
};
