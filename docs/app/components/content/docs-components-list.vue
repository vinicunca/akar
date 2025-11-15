<script setup lang="ts">
import { useAsyncData } from '#app';
import { queryCollection } from '#imports';

const props = defineProps<{
  category: string;
}>();

const { data: components } = await useAsyncData(
  `components-${props.category}`,
  () => {
    return queryCollection('docs')
      .where('path', 'LIKE', '/docs/pohon/components/%')
      .where('extension', '=', 'md')
      .where('category', '=', props.category)
      .select('path', 'title', 'description')
      .all();
  },
);
</script>

<template>
  <div class="gap-5 grid grid-cols-1 relative lg:grid-cols-3 sm:grid-cols-2">
    <div
      v-for="(component, index) in components"
      :key="component.path"
      class="group rounded-lg bg-background flex ring ring-ring-muted transition relative overflow-hidden hover:bg-background-elevated/50 has-focus-visible:(ring-2 ring-primary)"
    >
      <div class="p-0 flex flex-1 flex-col gap-x-8 gap-y-4 relative lg:(p-0 grid) sm:p-6">
        <div class="flex flex-1 flex-col items-start">
          <div class="border border-border-muted rounded-md rounded-b-none aspect-video overflow-hidden -m-px">
            <PColorModeImage
              :light="`${component.path.replace('/docs/pohon/components/', '/components/light/')}.png`"
              :dark="`${component.path.replace('/docs/pohon/components/', '/components/dark/')}.png`"
              class="size-full transition-transform group-hover:scale-105"
              :loading="index >= 4 ? 'lazy' : 'eager'"
              width="640"
              height="360"
              :alt="`${component.title} preview`"
            />
            <!--  -->
          </div>

          <div class="p-4 flex-1">
            <div class="text-[15px] color-text-highlighted font-medium text-pretty">
              {{ component.title }}
            </div>

            <div class="text-[15px] color-text-muted mt-0.5 text-pretty line-clamp-2">
              {{ component.description }}
            </div>
          </div>
        </div>
      </div>
      <NuxtLink
        :to="component.path"
        class="inset-0 absolute"
      />
    </div>
  </div>
</template>
