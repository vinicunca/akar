import { useRoute } from '#app';
import { computed } from '#imports';

export function useHeader() {
  const route = useRoute();

  const desktopLinks = computed(() => [{
    label: 'Docs',
    to: '/docs',
    active: route.path.startsWith('/docs/'),
  }, {
    label: 'Figma',
    to: '/figma',
  }, {
    label: 'Templates',
    to: '/templates',
  }, {
    label: 'Showcase',
    to: '/showcase',
  }, {
    label: 'Community',
    children: [{
      label: 'Team',
      description: 'Meet the team building and maintaining Nuxt UI.',
      icon: 'i-lucide-users',
      to: '/team',
    }, {
      label: 'Devtools Integration',
      description: 'Integrate Nuxt UI with Nuxt Devtools with Compodium.',
      icon: 'i-lucide-code',
      to: 'https://github.com/romhml/compodium',
      target: '_blank',
    }, {
      label: 'Raycast Extension',
      description: 'Access Nuxt UI components without leaving your editor.',
      icon: 'i-simple-icons-raycast',
      to: 'https://www.raycast.com/HugoRCD/nuxt',
      target: '_blank',
    }, {
      label: 'Figma to Code',
      description: 'Convert Figma designs to Nuxt UI code.',
      icon: 'i-simple-icons-figma',
      to: 'https://github.com/Justineo/tempad-dev-plugin-nuxt-ui',
      target: '_blank',
    }],
  }, {
    label: 'Releases',
    to: '/releases',
  }]);

  const mobileLinks = computed(() => [{
    label: 'Get Started',
    icon: 'i-lucide-square-play',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs/getting-started'),
  }, {
    label: 'Components',
    icon: 'i-lucide-square-code',
    to: '/docs/components',
    active: route.path.startsWith('/docs/components'),
  }, {
    label: 'Composables',
    icon: 'i-lucide-square-function',
    to: '/docs/composables',
    active: route.path.startsWith('/docs/composables'),
  }, {
    label: 'Typography',
    icon: 'i-lucide-square-pilcrow',
    to: '/docs/typography',
    active: route.path.startsWith('/docs/typography'),
  }, {
    label: 'Figma',
    icon: 'i-simple-icons-figma',
    to: '/figma',
  }, {
    label: 'Templates',
    icon: 'i-lucide-panels-top-left',
    to: '/templates',
  }, {
    label: 'Showcase',
    icon: 'i-lucide-presentation',
    to: '/showcase',
  }, {
    label: 'Team',
    icon: 'i-lucide-users',
    to: '/team',
  }, {
    label: 'Releases',
    icon: 'i-lucide-newspaper',
    to: '/releases',
  }, {
    label: 'GitHub',
    to: 'https://github.com/nuxt/ui',
    icon: 'i-simple-icons-github',
    target: '_blank',
  }]);

  return {
    desktopLinks,
    mobileLinks,
  };
}
