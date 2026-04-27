<script setup lang="ts">
import {
  AMenuAnchor,
  AMenuContent,
  AMenuItem,
  AMenuPortal,
  AMenuRoot,
  AMenuSub,
  AMenuSubContent,
  AMenuSubTrigger,
} from '..';
</script>

<template>
  <AMenuRoot
    :open="true"
    :modal="false"
  >
    <AMenuAnchor :style="{ display: 'inline-block' }" />
    <AMenuPortal disabled>
      <AMenuContent
        align="start"
        @close-auto-focus.prevent
      >
        <AMenuItem>
          Item 1
        </AMenuItem>
        <AMenuSub>
          <AMenuSubTrigger>
            Sub Trigger
          </AMenuSubTrigger>
          <AMenuPortal disabled>
            <AMenuSubContent>
              <AMenuItem>
                Sub Item 1
              </AMenuItem>
              <AMenuItem>
                Sub Item 2
              </AMenuItem>
            </AMenuSubContent>
          </AMenuPortal>
        </AMenuSub>
        <AMenuItem>
          Item 2
        </AMenuItem>
      </AMenuContent>
    </AMenuPortal>
  </AMenuRoot>
</template>
