import { useCookie } from '#app';
import { computed } from '#imports';

export function useFrameworks() {
  const framework = useCookie('pohon-ui-framework', { default: () => 'nuxt' });
  const frameworks = computed(() => [
    {
      label: 'Nuxt',
      icon: 'i-devicon:nuxt',
      value: 'nuxt',
      onSelect: () => {
        framework.value = 'nuxt';
      },
    },
    {
      label: 'Vue',
      icon: 'i-devicon:vuejs',
      value: 'vue',
      onSelect: () => {
        framework.value = 'vue';
      },
    },
  ].map((frame) => ({
    ...frame,
    active: framework.value === frame.value,
  })));

  return {
    framework,
    frameworks,
  };
}
