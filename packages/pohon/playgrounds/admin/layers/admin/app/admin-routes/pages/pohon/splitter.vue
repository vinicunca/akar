<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from 'akar';
</script>

<template>
  <div class="text-sm color-primary font-semibold px-8 h-64 w-full md:px-16">
    <ASplitterGroup
      id="splitter-group-1"
      direction="horizontal"
    >
      <ASplitterPanel
        id="splitter-group-1-panel-1"
        :min-size="20"
        class="border rounded-xl flex items-center justify-center"
      >
        Panel A
      </ASplitterPanel>
      <ASplitterResizeHandle
        id="splitter-group-1-resize-handle-1"
        class="w-2"
      />
      <ASplitterPanel
        id="splitter-group-1-panel-2"
        :min-size="20"
      >
        <ASplitterGroup
          id="splitter-group-2"
          direction="vertical"
        >
          <ASplitterPanel
            id="splitter-group-2-panel-1"
            :min-size="20"
            class="border rounded-xl flex items-center justify-center"
          >
            Panel B
          </ASplitterPanel>
          <ASplitterResizeHandle
            id="splitter-group-2-resize-handle-1"
            class="h-2"
          />
          <ASplitterPanel
            id="splitter-group-2-panel-2"
            :min-size="20"
            class="border rounded-xl flex items-center justify-center"
          >
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </ASplitterPanel>
    </ASplitterGroup>
  </div>
</template>
