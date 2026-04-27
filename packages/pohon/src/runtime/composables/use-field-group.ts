import type { ComputedRef, InjectionKey } from 'vue';
import type { PFieldGroupProps } from '../components/FieldGroup.vue';
import type { GetObjectField } from '../types/utils';
import { computed, defineComponent, inject, provide } from 'vue';

export const fieldGroupInjectionKey: InjectionKey<ComputedRef<{
  size: PFieldGroupProps['size'];
  orientation: PFieldGroupProps['orientation'];
}>> = Symbol('nuxt-ui.field-group');

interface Props<T> {
  size?: GetObjectField<T, 'size'>;
}

export function useFieldGroup<T>(props: Props<T>) {
  const fieldGroup = inject(fieldGroupInjectionKey, undefined);
  return {
    orientation: computed(() => fieldGroup?.value.orientation),
    size: computed(() => props?.size ?? fieldGroup?.value.size),
  };
}

export const FieldGroupReset = defineComponent({
  name: 'FieldGroupReset',
  setup(_, { slots }) {
    provide(fieldGroupInjectionKey, computed(() => ({
      size: undefined,
      orientation: undefined,
    })));
    return () => slots.default?.();
  },
});
