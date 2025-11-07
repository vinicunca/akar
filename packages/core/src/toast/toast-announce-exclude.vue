<script lang="ts">
import type { APrimitiveProps } from '../primitive';

export interface ToastAnnounceExcludeProps extends APrimitiveProps {
  altText?: string;
}
</script>

<script setup lang="ts">
import { APrimitive } from '../primitive';

defineProps<ToastAnnounceExcludeProps>();
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
