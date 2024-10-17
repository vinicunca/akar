<script lang="ts">
import type { AToastCloseProps } from './a-toast-close.vue';

export interface AToastActionProps extends AToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users
   * who will not be able to navigate to the button easily/quickly.
   * @example <AToastAction altText="Goto account settings to upgrade">Upgrade</AToastAction>
   * @example <AToastAction altText="Undo (Alt+U)">Undo</AToastAction>
   */
  altText: string;
}
</script>

<script setup lang="ts">
import { useForwardExpose } from '~~/shared';

import AToastAnnounceExclude from './a-toast-announce-exclude.vue';
import AToastClose from './a-toast-close.vue';

const props = defineProps<AToastActionProps>();

if (!props.altText) {
  throw new Error('Missing prop `altText` expected on `AToastAction`');
}

const { forwardRef } = useForwardExpose();
</script>

<template>
  <AToastAnnounceExclude
    v-if="altText"
    :alt-text="altText"
    as-child
  >
    <AToastClose
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
    >
      <slot />
    </AToastClose>
  </AToastAnnounceExclude>
</template>
