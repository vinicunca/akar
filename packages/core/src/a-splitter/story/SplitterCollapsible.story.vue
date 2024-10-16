<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..'
</script>

<template>
  <Story
    title="ASplitter/Collapsible"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div class="w-full h-48">
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
          <ASplitterResizeHandle class="w-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="bg-blackA8 rounded-lg ">
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
