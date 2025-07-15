<script setup lang="ts">
import { reactive } from 'vue';
import ScrollAreaCopy from './_scroll-area-copy.vue';
import ScrollAreaStory from './_scroll-area-story.vue';

type Type = 'auto' | 'always' | 'scroll' | 'hover';

const state = reactive({
  type: 'hover' as Type,
});

const contentChangeState = reactive({
  verticalCount: 1,
  horizontalCount: 1,
});
</script>

<template>
  <Story
    title="Scroll Area/Basic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Basic">
      <ScrollAreaStory :type="state.type">
        <ScrollAreaCopy
          v-for="i in 30"
          :key="i"
        />
      </ScrollAreaStory>

      <template #controls>
        <HstSelect
          v-model="state.type"
          title="type"
          :options="['auto', 'always', 'scroll', 'hover']"
        />
      </template>
    </Variant>

    <Variant
      auto-props-disabled
      title="Resizable"
    >
      <div class="h-[400px] w-[400px] resize overflow-hidden">
        <ScrollAreaStory class="h-full w-full">
          <ScrollAreaCopy
            v-for="i in 30"
            :key="i"
          />
        </ScrollAreaStory>
      </div>
    </Variant>

    <Variant
      auto-props-disabled
      title="Content Change"
    >
      <div class="h-[400px] w-[400px]">
        <ScrollAreaStory
          type="always"
          class="h-full w-full"
        >
          <ScrollAreaCopy
            v-for="i in contentChangeState.verticalCount"
            :key="i"
            :style="{ width: `${300 * contentChangeState.horizontalCount}px` }"
          />
        </ScrollAreaStory>
      </div>

      <template #controls>
        <HstNumber
          v-model="contentChangeState.verticalCount"
          title="Vertical count"
          :step="1"
        />
        <HstNumber
          v-model="contentChangeState.horizontalCount"
          title="Horizontal count"
          :step="1"
        />
      </template>
    </Variant>

    <Variant
      auto-props-disabled
      title="Animated"
    >
      <ScrollAreaStory
        animated
        :type="state.type"
      >
        <ScrollAreaCopy
          v-for="i in 30"
          :key="i"
        />
      </ScrollAreaStory>

      <template #controls>
        <HstSelect
          v-model="state.type"
          title="type"
          :options="['auto', 'always', 'scroll', 'hover']"
        />
      </template>
    </Variant>
  </Story>
</template>
