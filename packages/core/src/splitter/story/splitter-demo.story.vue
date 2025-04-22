<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';
</script>

<template>
  <Story
    title="Splitter/Demo"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <div class="h-48 w-full">
        <ASplitterGroup direction="horizontal">
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg">
            <ASplitterGroup direction="vertical">
              <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
                Panel B1
              </ASplitterPanel>
              <ASplitterResizeHandle class="h-2 transition data-[state=active]:bg-white" />
              <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
                Panel B2
              </ASplitterPanel>
            </ASplitterGroup>
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel
            :max-size="20"
            class="flex items-center justify-center rounded-lg bg-blackA8"
          >
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>
  </Story>
</template>
