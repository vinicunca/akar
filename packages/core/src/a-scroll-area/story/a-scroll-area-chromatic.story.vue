<script setup lang="ts">
import { AConfigProvider } from '../../a-config-provider';
import AScrollAreaCopy from './_a-scroll-area-copy.vue';
import AScrollAreaStory from './_a-scroll-area-story.vue';
</script>

<template>
  <Story
    title="Scroll Area/Chromatic"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      auto-props-disabled
      title="Min thumb size"
    >
      <AScrollAreaStory
        type="always"
        vertical
        horizontal
      >
        <AScrollAreaCopy
          v-for="i in 100"
          :key="i"
          style="width: 10000px"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="RTL (prop)"
    >
      <AScrollAreaStory
        type="always"
        dir="rtl"
        vertical
        horizontal
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="RTL (inherited)"
    >
      <AConfigProvider dir="rtl">
        <AScrollAreaStory
          type="always"
          vertical
          horizontal
        >
          <AScrollAreaCopy
            v-for="i in 10"
            :key="i"
          />
        </AScrollAreaStory>
      </AConfigProvider>
    </Variant>

    <Variant title="Ellipsis at viewport width">
      <AScrollAreaStory
        type="always"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
          class="w-full truncate"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant title="Ellipsis at content width">
      <AScrollAreaStory
        type="always"
        vertical
        :horizontal="true"
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
          class="truncate !w-[125px]"
        />
      </AScrollAreaStory>
    </Variant>
  </Story>
</template>
