<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';
</script>

<template>
  <Story
    title="Splitter/Overflow"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="h-48 w-full">
        <ASplitterGroup direction="horizontal">
          <ASplitterPanel class="bg-blackA8 rounded-lg">
            <div class="h-full overflow-auto">
              <div class="h-96 w-[30vw] p-4">
                Panel A
              </div>
            </div>
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="bg-blackA8 rounded-lg">
            <div class="h-full overflow-auto">
              <div class="h-96 w-[30vw] p-4">
                Panel B
              </div>
            </div>
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>
  </Story>
</template>
