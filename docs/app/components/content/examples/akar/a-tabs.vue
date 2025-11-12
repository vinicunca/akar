<script lang="ts" setup>
import { ATabsContent, ATabsIndicator, ATabsList, ATabsRoot, ATabsTrigger } from 'akar';

const items = [
  {
    label: 'Tab1',
    content: 'This is the content shown for Tab1',
  },
  {
    label: 'Tab2',
    content: 'And, this is the content for Tab2',
  },
  {
    label: 'Tab3',
    content: 'Finally, this is the content for Tab3',
  },
];
</script>

<template>
  <ATabsRoot
    class="flex flex-col gap-2 w-80 items-center"
    default-value="Tab1"
  >
    <ATabsList
      class="group p-1 rounded-lg bg-background-elevated flex w-full relative"
    >
      <ATabsIndicator class="rounded-md bg-primary w-$akar-tabs-indicator-size shadow-xs translate-x-$akar-tabs-indicator-position transition-[transform,width]-200 inset-y-1 left-0 absolute" />

      <ATabsTrigger
        v-for="tabItem in items"
        :key="tabItem.label"
        class="group text-sm font-medium px-3 py-1.5 rounded-md inline-flex grow gap-1.5 min-w-0 transition-colors-280 items-center justify-center relative data-[state=active]:color-text-inverted data-[state=inactive]:color-text-muted focus-visible:(outline-2 outline-primary outline-offset-2) disabled:(opacity-75 cursor-not-allowed) hover:data-[state=inactive]:not-disabled:color-text"
        :value="tabItem.label"
      >
        {{ tabItem.label }}
      </ATabsTrigger>
    </ATabsList>

    <ATabsContent
      v-for="tabItem in items"
      :key="tabItem.label"
      class="w-full focus:outline-none"
      :value="tabItem.label"
    >
      {{ tabItem.content }}
    </ATabsContent>
  </ATabsRoot>
</template>
