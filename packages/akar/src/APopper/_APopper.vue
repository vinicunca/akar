<script setup lang="ts">
import APopperAnchor from './APopperAnchor.vue';
import APopperArrow from './APopperArrow.vue';
import APopperContent from './APopperContent.vue';
import APopperRoot from './APopperRoot.vue';
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
