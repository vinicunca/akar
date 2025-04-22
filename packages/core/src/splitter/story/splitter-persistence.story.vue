<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';
</script>

<template>
  <Story
    title="Splitter/Persistence"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="h-48 w-full">
        <ASplitterGroup
          auto-save-id="persistence"
          direction="horizontal"
        >
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel B
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>
  </Story>
</template>
