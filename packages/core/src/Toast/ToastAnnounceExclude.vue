<script lang="ts">
import type { PrimitiveProps } from '@/Primitive';

export interface ToastAnnounceExcludeProps extends PrimitiveProps {
  altText?: string;
}
</script>

<script setup lang="ts">
import { renderAs } from '@/Primitive/renderAs';

defineProps<ToastAnnounceExcludeProps>();
</script>

<template>
  <component
    :is="renderAs(as, asChild)"
    data-akar-toast-announce-exclude=""
    :data-akar-toast-announce-alt="altText || undefined"
  >
    <slot />
  </component>
</template>
