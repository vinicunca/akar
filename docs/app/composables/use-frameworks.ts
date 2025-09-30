import { useCookie } from '#app';
import { computed } from '#imports';

export function useFrameworks() {
  const framework = useCookie('pohon-framework', { default: () => 'nuxt' });
  const frameworks = computed(() => [
    {
      label: 'Nuxt',
      icon: 'i-simple-icons-nuxtdotjs',
      value: 'nuxt',
      onSelect: () => {
        framework.value = 'nuxt';
      },
    },
    {
      label: 'Vue',
      icon: 'i-simple-icons-vuedotjs',
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
