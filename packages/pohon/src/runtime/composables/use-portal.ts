import type { InjectionKey, Ref } from 'vue';
import { isBoolean } from '@vinicunca/perkakas';
import { computed, inject, provide } from 'vue';

export const portalTargetInjectionKey: InjectionKey<Ref<string | HTMLElement>> = Symbol('pohon.portal-target');

export function usePortal(portal: Ref<string | HTMLElement | boolean | undefined>) {
  const portalTarget = inject(portalTargetInjectionKey, undefined);

  const to = computed(() => {
    if (isBoolean(portal.value) || portal.value === undefined) {
      return portalTarget?.value ?? 'body';
    }

    return portal.value;
  });

  const disabled = computed(() => isBoolean(portal.value) ? !portal.value : false);

  provide(portalTargetInjectionKey, computed(() => to.value));

  return computed(() => ({
    to: to.value,
    disabled: disabled.value,
  }));
}
