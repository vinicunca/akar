<script setup lang="ts">
import APopperAnchor from './a-popper-anchor.vue';
import APopperArrow from './a-popper-arrow.vue';
import APopperContent from './a-popper-content.vue';
import APopperRoot from './a-popper-root.vue';
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
