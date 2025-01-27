<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';
</script>

<template>
  <Story
    title="Splitter/Collapsible"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="h-48 w-full">
        <ASplitterGroup direction="horizontal">
          <ASplitterPanel
            collapsible
            :collapsed-size="5"
            :default-size="20"
            :max-size="30"
            :min-size="15"
            class="bg-blackA8 rounded-lg"
          >
            <div class="p-4">
              Panel A
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
