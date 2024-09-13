<script setup lang="ts">
import { reactive } from 'vue';

import AScrollAreaCopy from './_a-scroll-area-copy.vue';
import AScrollAreaStory from './_a-scroll-area-story.vue';

type Type = 'always' | 'auto' | 'hover' | 'scroll';

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
      <AScrollAreaStory :type="state.type">
        <AScrollAreaCopy
          v-for="i in 30"
          :key="i"
        />
      </AScrollAreaStory>

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
        <AScrollAreaStory class="h-full w-full">
          <AScrollAreaCopy
            v-for="i in 30"
            :key="i"
          />
        </AScrollAreaStory>
      </div>
    </Variant>

    <Variant
      auto-props-disabled
      title="Content Change"
    >
      <div class="h-[400px] w-[400px]">
        <AScrollAreaStory
          type="always"
          class="h-full w-full"
        >
          <AScrollAreaCopy
            v-for="i in contentChangeState.verticalCount"
            :key="i"
            :style="{ width: `${300 * contentChangeState.horizontalCount}px` }"
          />
        </AScrollAreaStory>
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
      <AScrollAreaStory animated>
        <AScrollAreaCopy
          v-for="i in 30"
          :key="i"
        />
      </AScrollAreaStory>
    </Variant>
  </Story>
</template>
