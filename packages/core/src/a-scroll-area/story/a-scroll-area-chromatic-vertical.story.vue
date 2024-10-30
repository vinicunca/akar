<script setup lang="ts">
import AScrollAreaCopy from './_a-scroll-area-copy.vue';
import AScrollAreaStory from './_a-scroll-area-story.vue';
</script>

<template>
  <Story
    title="AScrollArea/Chromatic/Vertical"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      auto-props-disabled
      title="Vertical (Auto with overflow)"
    >
      <AScrollAreaStory
        type="auto"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Vertical (Auto without overflow)"
    >
      <AScrollAreaStory
        type="auto"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy class="h-[50px] overflow-hidden" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Vertical (Always with overflow)"
    >
      <AScrollAreaStory
        type="always"
        vertical
        :horizontal="false"
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
      title="Vertical (Scroll with overflow)"
    >
      <AScrollAreaStory
        type="scroll"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Vertical (Scroll without overflow)"
    >
      <AScrollAreaStory
        type="scroll"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy class="h-[50px] overflow-hidden" />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Vertical (Hover with overflow)"
    >
      <AScrollAreaStory
        type="hover"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy
          v-for="i in 10"
          :key="i"
        />
      </AScrollAreaStory>
    </Variant>

    <Variant
      auto-props-disabled
      title="Vertical (Hover without overflow)"
    >
      <AScrollAreaStory
        type="hover"
        vertical
        :horizontal="false"
      >
        <AScrollAreaCopy class="h-[50px] overflow-hidden" />
      </AScrollAreaStory>
    </Variant>
  </Story>
</template>
