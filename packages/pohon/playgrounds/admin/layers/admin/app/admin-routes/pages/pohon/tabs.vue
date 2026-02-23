<script setup lang="ts">
import theme from '#build/pohon/tabs';
import { ATabsContent, ATabsIndicator, ATabsList, ATabsRoot, ATabsTrigger } from 'akar';
import { reactive, ref } from 'vue';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const orientations = Object.keys(theme.variants.orientation);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation);

const items = [{
  label: 'Tab1',
  avatar: {
    src: 'https://github.com/praburangki.png',
  },
  content: 'This is the content shown for Tab1',
}, {
  label: 'Tab2',
  icon: 'i-lucide:user',
  content: 'And, this is the content for Tab2',
}, {
  label: 'Tab3',
  icon: 'i-lucide:bell',
  content: 'Finally, this is the content for Tab3',
  slot: 'custom' as const,
  badge: '300',
}];
</script>

<template>
  <BaseNavbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      placeholder="Color"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      placeholder="Variant"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      placeholder="Size"
      multiple
    />
    <PSelect
      v-model="orientation"
      :items="orientations"
      placeholder="Orientation"
    />
  </BaseNavbar>

  <ATabsRoot
    class="flex flex-col gap-2 w-80 items-center"
    :default-value="items[0].label"
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

  <BaseMatrix
    v-slot="props"
    :attrs="attrs"
    container-class="gap-4"
  >
    <PTabs
      :orientation="orientation"
      :items="[{ label: 'Monthly' }, { label: 'Yearly' }]"
      :content="false"
      v-bind="props"
    />

    <PTabs
      :orientation="orientation"
      :items="items"
      class="w-80"
      v-bind="props"
    >
      <template #custom="{ item }">
        <span class="text-muted">Custom: {{ item.content }}</span>
      </template>
    </PTabs>
  </BaseMatrix>
</template>
