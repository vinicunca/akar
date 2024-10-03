<script lang="ts">
import type {
  AMenuContentImplEmits,
  AMenuRootContentTypeProps,
} from './a-menu-content-impl.vue';

export type AMenuContentEmits = Omit<AMenuContentImplEmits, 'entryFocus' | 'openAutoFocus'>;

export interface AMenuContentProps extends AMenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean;
}
</script>

<script setup lang="ts">
import { APresence } from '~~/a-presence';
import { useForwardPropsEmits } from '~~/shared';

import { injectAMenuContext, injectAMenuRootContext } from './a-menu-root.vue';
import AMenuRootContentModal from './a-menu-root-content-modal.vue';
import AMenuRootContentNonModal from './a-menu-root-content-non-modal.vue';

const props = defineProps<AMenuContentProps>();
const emits = defineEmits<AMenuContentImplEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectAMenuContext();
const rootContext = injectAMenuRootContext();
</script>

<template>
  <APresence :present="forceMount || menuContext.open.value">
    <AMenuRootContentModal
      v-if="rootContext.modal.value"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </AMenuRootContentModal>
    <AMenuRootContentNonModal
      v-else
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </AMenuRootContentNonModal>
  </APresence>
</template>
