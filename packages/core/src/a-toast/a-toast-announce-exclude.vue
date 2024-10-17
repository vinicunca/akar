<script lang="ts">
import type { APrimitiveProps } from '~~/a-primitive';

export interface AToastAnnounceExcludeProps extends APrimitiveProps {
  altText?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '~~/a-primitive';

defineProps<AToastAnnounceExcludeProps>();
</script>

<template>
  <APrimitive
    :as="as"
    :as-child="asChild"
    data-akar-toast-announce-exclude=""
    :data-akar-toast-announce-alt="altText || undefined"
  >
    <slot />
  </APrimitive>
</template>
