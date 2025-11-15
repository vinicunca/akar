import { useRoute } from '#app';
import { computed } from '#imports';

export function useHeader() {
  const route = useRoute();

  const desktopLinks = computed(() => [
    {
      label: 'Akar',
      to: '/docs/akar/overview/introduction',
      active: route.path.startsWith('/docs/akar/'),
    },
    {
      label: 'Pohon',
      to: '/docs/pohon/getting-started',
      active: route.path.startsWith('/docs/pohon/'),
    },
  ]);

  const mobileLinks = computed(() => [
    {
      label: 'Akar Get Started',
      icon: 'i-lucide:square-play',
      to: '/docs/akar/overview',
      active: route.path.startsWith('/docs/akar/overview'),
    },
    {
      label: 'Akar Guides',
      icon: 'i-lucide:book-open',
      to: '/docs/akar/guides',
      active: route.path.startsWith('/docs/akar/guides'),
    },
    {
      label: 'Akar Components',
      icon: 'i-lucide:box',
      to: '/docs/akar/components',
      active: route.path.startsWith('/docs/akar/components'),
    },
    {
      label: 'Akar Utilities',
      icon: 'i-lucide:wrench',
      to: '/docs/akar/components',
      active: route.path.startsWith('/docs/akar/components'),
    },
    {
      label: 'Pohon Get Started',
      icon: 'i-lucide:square-play',
      to: '/docs/pohon/getting-started',
      active: route.path.startsWith('/docs/pohon/getting-started'),
    },
    {
      label: 'Pohon Components',
      icon: 'i-lucide:box',
      to: '/docs/pohon/components',
      active: route.path.startsWith('/docs/pohon/components'),
    },
    {
      label: 'Pohon Composables',
      icon: 'i-lucide:square-function',
      to: '/docs/pohon/composables',
      active: route.path.startsWith('/docs/pohon/composables'),
    },
    {
      label: 'Pohon Typography',
      icon: 'i-lucide:square-pilcrow',
      to: '/docs/pohon/typography',
      active: route.path.startsWith('/docs/pohon/typography'),
    },
    {
      label: 'Figma',
      icon: 'i-simple-icons:figma',
      to: '/figma',
    },
    {
      label: 'Templates',
      icon: 'i-lucide:panels-top-left',
      to: '/templates',
    },
    {
      label: 'Showcase',
      icon: 'i-lucide:presentation',
      to: '/showcase',
    },
    {
      label: 'Team',
      icon: 'i-lucide:users',
      to: '/team',
    },
    {
      label: 'Releases',
      icon: 'i-lucide:newspaper',
      to: '/releases',
    },
    {
      label: 'GitHub',
      to: 'https://github.com/nuxt/ui',
      icon: 'i-simple-icons:github',
      target: '_blank',
    },
  ]);

  return {
    desktopLinks,
    mobileLinks,
  };
}
