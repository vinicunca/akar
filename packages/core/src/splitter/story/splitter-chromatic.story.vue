<script setup lang="ts">
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';
</script>

<template>
  <Story
    title="Splitter/Chromatic"
    :layout="{ type: 'grid', width: '100%', iframe: false }"
  >
    <Variant title="Horizontal">
      <div class="h-48 w-full">
        <ASplitterGroup direction="horizontal">
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

    <Variant title="Vertical">
      <div class="h-64 w-full">
        <ASplitterGroup direction="vertical">
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel A
          </ASplitterPanel>
          <ASplitterResizeHandle class="h-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel B
          </ASplitterPanel>
          <ASplitterResizeHandle class="h-2 transition data-[state=active]:bg-white" />
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>

    <Variant title="Nested">
      <div class="h-64 w-full">
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
          <ASplitterPanel class="flex items-center justify-center rounded-lg bg-blackA8">
            Panel C
          </ASplitterPanel>
        </ASplitterGroup>
      </div>
    </Variant>
  </Story>
</template>
