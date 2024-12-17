<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..'
</script>

<template>
  <Story
    title="Splitter/Chromatic"
    :layout="{ type: 'grid', width: '100%', iframe: false }"
  >
    <Variant title="Horizontal">
      <div class="w-full h-48">
        <ASplitterGroup direction="horizontal">
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

    <Variant title="Vertical">
      <div class="w-full h-64">
        <ASplitterGroup direction="vertical">
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="h-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel B
          </ASplitterPanel>
          <ASplitterResizeHandle class="h-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>

    <Variant title="Nested">
      <div class="w-full h-64">
        <ASplitterGroup direction="horizontal">
          <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="w-2 data-[state=active]:bg-white transition" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg">
            <ASplitterGroup direction="vertical">
              <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
                Panel B1
              </ASplitterPanel>
              <ASplitterResizeHandle class="h-2 data-[state=active]:bg-white transition" />
              <ASplitterPanel class="flex items-center justify-center bg-blackA8 rounded-lg">
                Panel B2
              </ASplitterPanel>
            </ASplitterGroup>
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
