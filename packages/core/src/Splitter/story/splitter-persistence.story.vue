<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..'
</script>

<template>
  <Story
    title="Splitter/Persistence"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="w-full h-48">
        <ASplitterGroup
          auto-save-id="persistence"
          direction="horizontal"
        >
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel B
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>
  </Story>
</template>
