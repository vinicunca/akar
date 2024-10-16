<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..'
</script>

<template>
  <div class="w-full h-48">
    <ASplitterGroup direction="horizontal">
      <ASplitterPanel>
        Panel A
      </ASplitterPanel>
      <ASplitterResizeHandle />
      <ASplitterPanel>
        <ASplitterGroup direction="vertical">
          <ASplitterPanel>
            Panel B1
          </ASplitterPanel>
          <ASplitterResizeHandle />
          <ASplitterPanel>
            Panel B2
          </ASplitterPanel>
        </ASplitterGroup>
      </ASplitterPanel>
      <ASplitterResizeHandle />
      <ASplitterPanel :max-size="20">
        Panel C
      </ASplitterPanel>
    </ASplitterGroup>
  </div>
</template>
