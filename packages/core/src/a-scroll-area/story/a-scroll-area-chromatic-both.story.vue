<script setup lang="ts">
import AScrollAreaCopy from './_a-scroll-area-copy.vue';
import AScrollAreaStory from './_a-scroll-area-story.vue';
</script>

<template>
  <Story
    title="Scroll Area/Chromatic/Both"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      auto-props-disabled
      title="Both (Auto with overflow)"
    >
      <AScrollAreaStory
        type="auto"
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
      title="Both (Auto without overflow)"
    >
      <AScrollAreaStory
        type="auto"
        vertical
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !h-[50px] !w-[50px]" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Both (Always with overflow)"
    >
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
    </Variant>

    <Variant />

    <Variant
      auto-props-disabled
      title="Both (Scroll with overflow)"
    >
      <AScrollAreaStory
        type="scroll"
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
      title="Both (Scroll without overflow)"
    >
      <AScrollAreaStory
        type="scroll"
        vertical
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !h-[50px] !w-[50px]" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Both (Hover with overflow)"
    >
      <AScrollAreaStory
        type="hover"
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
      title="Both (Hover without overflow)"
    >
      <AScrollAreaStory
        type="hover"
        vertical
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !h-[50px] !w-[50px]" />
      </AScrollAreaStory>
    </Variant>
  </Story>
</template>
