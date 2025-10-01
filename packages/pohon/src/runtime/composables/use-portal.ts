import type { InjectionKey, Ref } from 'vue';
import { isBoolean } from '@vinicunca/perkakas';
import { computed, inject } from 'vue';

export const portalTargetInjectionKey: InjectionKey<Ref<boolean | string | HTMLElement>> = Symbol('pohon.portal-target');

export function usePortal(portal: Ref<string | HTMLElement | boolean | undefined>) {
  const globalPortal = inject(portalTargetInjectionKey, undefined);

  const value = computed(() =>
    portal.value === true
      ? globalPortal?.value
      : portal.value,
  );

  const disabled = computed(() => typeof value.value === 'boolean' ? !value.value : false);

  const to = computed(() => isBoolean(value.value) ? 'body' : value.value);

  return computed(() => ({
    to: to.value,
    disabled: disabled.value,
  }));
}
