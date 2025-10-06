import { useRoute } from '#app';
import { computed } from '#imports';

export function useHeader() {
  const route = useRoute();

  const desktopLinks = computed(() => [
    {
      label: 'Akar',
      to: '/akar',
      active: route.path.startsWith('/akar/'),
    },
    {
      label: 'Pohon',
      to: '/pohon',
    },
    {
      label: 'Templates',
      to: '/templates',
    },
  ]);

  const mobileLinks = computed(() => [
    {
      label: 'Get Started',
      icon: 'i-lucide-square-play',
      to: '/docs/getting-started',
      active: route.path.startsWith('/docs/getting-started'),
    },
    {
      label: 'Components',
      icon: 'i-lucide-square-code',
      to: '/docs/components',
      active: route.path.startsWith('/docs/components'),
    },
    {
      label: 'Composables',
      icon: 'i-lucide-square-function',
      to: '/docs/composables',
      active: route.path.startsWith('/docs/composables'),
    },
    {
      label: 'Typography',
      icon: 'i-lucide-square-pilcrow',
      to: '/docs/typography',
      active: route.path.startsWith('/docs/typography'),
    },
    {
      label: 'Figma',
      icon: 'i-simple-icons-figma',
      to: '/figma',
    },
    {
      label: 'Templates',
      icon: 'i-lucide-panels-top-left',
      to: '/templates',
    },
    {
      label: 'Showcase',
      icon: 'i-lucide-presentation',
      to: '/showcase',
    },
    {
      label: 'Team',
      icon: 'i-lucide-users',
      to: '/team',
    },
    {
      label: 'Releases',
      icon: 'i-lucide-newspaper',
      to: '/releases',
    },
    {
      label: 'GitHub',
      to: 'https://github.com/nuxt/ui',
      icon: 'i-simple-icons-github',
      target: '_blank',
    },
  ]);

  return {
    desktopLinks,
    mobileLinks,
  };
}
