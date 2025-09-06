<script setup lang="ts">
import { hyphenate } from '@vueuse/core';
import {
  AHoverCardArrow,
  AHoverCardContent,
  AHoverCardPortal,
  AHoverCardRoot,
  AHoverCardTrigger,
} from 'akar';
import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const UTILITY_COMPONENT = ['AConfigProvider', 'AVisuallyHidden', 'AFocusScope', 'ARovingFocus'];

const href = computed(() => {
  const utilityComponent = UTILITY_COMPONENT.find((c) => props.name.includes(c));
  if (utilityComponent) {
    const hash = hyphenate(props.name.split(utilityComponent)?.[1]);
    // eslint-disable-next-line sonar/no-nested-template-literals
    return `/docs/utilities/${hyphenate(utilityComponent)}${hash ? `#${hash}` : ''}`;
  } else {
    const [last, ...parts] = hyphenate(props.name).split('-').reverse();
    return `/docs/components/${parts.reverse().join('-')}#${last}`;
  }
});
</script>

<template>
  <AHoverCardRoot :open-delay="300">
    <AHoverCardTrigger
      as="a"
      :href="href"
      class="not-prose underline decoration-1 underline-offset-[3px] decoration-dotted !text-inherit"
    >
      <slot />
    </AHoverCardTrigger>
    <AHoverCardPortal>
      <AHoverCardContent
        class="border border-muted-foreground/30 rounded-lg bg-card h-[16.5rem] w-[500px] shadow-xl overflow-x-hidden prose [&>div]:my-2 [&>ul:first-child>h5]:border-t-0 dark:prose-invert"
        side="top"
        align="start"
        :align-offset="-20"
      >
        <slot name="content" />

        <AHoverCardArrow
          class="fill-card stroke-muted-foreground/30 -translate-y-[1px]"
          :width="16"
          :height="8"
        />
      </AHoverCardContent>
    </AHoverCardPortal>
  </AHoverCardRoot>
</template>
