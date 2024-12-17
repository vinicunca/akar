<script setup lang="ts">
import APopperAnchor from './popper-anchor.vue';
import APopperArrow from './popper-arrow.vue';
import APopperContent from './popper-content.vue';
import APopperRoot from './popper-root.vue';
</script>

<template>
  <APopperRoot>
    <APopperAnchor>
      Anchor
    </APopperAnchor>

    <APopperContent>
      Content

      <APopperArrow />
    </APopperContent>
  </APopperRoot>
</template>
