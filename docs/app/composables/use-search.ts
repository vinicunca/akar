import { useRoute } from '#app';
import { computed, ref } from '#imports';

export function useSearch() {
  const route = useRoute();

  const searchTerm = ref('');

  const links = computed(() => [
    {
      label: 'Get Started',
      description: 'Learn how to get started with Pohon UI.',
      icon: 'i-lucide-square-play',
      to: '/docs/pohon/getting-started',
      active: route.path.startsWith('/docs/pohon/getting-started'),
    },
    {
      label: 'Components',
      description: 'Explore the components available in Pohon UI.',
      icon: 'i-lucide-square-code',
      to: '/docs/pohon/components',
      active: route.path.startsWith('/docs/pohon/components'),
    },
    {
      label: 'Composables',
      description: 'Learn how to use the composables available in Pohon UI.',
      icon: 'i-lucide-square-function',
      to: '/docs/pohon/composables',
      active: route.path.startsWith('/docs/pohon/composables'),
    },
    {
      label: 'Typography',
      description: 'Discover the typography features and customization options in Pohon UI.',
      icon: 'i-lucide-square-pilcrow',
      to: '/docs/pohon/typography',
      active: route.path.startsWith('/docs/pohon/typography'),
    },
    {
      label: 'Templates',
      description: 'Explore official templates built with Pohon UI.',
      icon: 'i-lucide-panels-top-left',
      to: '/templates',
    },
    {
      label: 'GitHub',
      description: 'Check out the Pohon UI repository and follow development on GitHub.',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/vinicunca/akar',
      target: '_blank',
    },
  ]);

  return {
    links,
    searchTerm,
  };
}
