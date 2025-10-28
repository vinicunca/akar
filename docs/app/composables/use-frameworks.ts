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
      active: framework.value === 'nuxt',
    },
    {
      label: 'Vue',
      icon: 'i-devicon:vuejs',
      value: 'vue',
      onSelect: () => {
        framework.value = 'vue';
      },
      active: framework.value === 'vue',
    },
  ]);

  return {
    framework,
    frameworks,
  };
}
