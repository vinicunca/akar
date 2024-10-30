<script setup lang="ts">
import AScrollAreaCopy from './_a-scroll-area-copy.vue';
import AScrollAreaStory from './_a-scroll-area-story.vue';
</script>

<template>
  <Story
    title="AScrollArea/Chromatic/Horizontal"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      auto-props-disabled
      title="Horizontal (Auto with overflow)"
    >
      <AScrollAreaStory
        type="auto"
        :vertical="false"
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
      title="Horizontal (Auto without overflow)"
    >
      <AScrollAreaStory
        type="auto"
        :vertical="false"
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !w-[50px]" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Horizontal (Always with overflow)"
    >
      <AScrollAreaStory
        type="always"
        :vertical="false"
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
      title="Horizontal (Scroll with overflow)"
    >
      <AScrollAreaStory
        type="scroll"
        :vertical="false"
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
      title="Horizontal (Scroll without overflow)"
    >
      <AScrollAreaStory
        type="scroll"
        :vertical="false"
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !w-[50px]" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Horizontal (Hover with overflow)"
    >
      <AScrollAreaStory
        type="hover"
        :vertical="false"
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
      title="Horizontal (Hover without overflow)"
    >
      <AScrollAreaStory
        type="hover"
        :vertical="false"
        horizontal
      >
        <AScrollAreaCopy class="overflow-hidden !w-[50px]" />
      </AScrollAreaStory>
    </Variant>
  </Story>
</template>
