<script lang="ts">
import type {
  MenuContentImplEmits,
  MenuRootContentTypeProps,
} from './menu-content-impl.vue';

export type AMenuContentEmits = Omit<MenuContentImplEmits, 'entryFocus' | 'openAutoFocus'>;

export interface AMenuContentProps extends MenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/presence';
import { useForwardPropsEmits } from '~~/shared';
import MenuRootContentModal from './menu-root-content-modal.vue';
import MenuRootContentNonModal from './menu-root-content-non-modal.vue';
import { injectAMenuContext, injectAMenuRootContext } from './menu-root.vue';

const props = defineProps<AMenuContentProps>();
const emits = defineEmits<MenuContentImplEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();
const rootContext = injectAMenuRootContext();
</script>

<template>
  <APresence :present="forceMount || menuContext.open.value">
    <MenuRootContentModal
      v-if="rootContext.modal.value"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuRootContentModal>
    <MenuRootContentNonModal
      v-else
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuRootContentNonModal>
  </APresence>
</template>
