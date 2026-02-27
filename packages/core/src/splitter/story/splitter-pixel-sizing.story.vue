<script setup lang="ts">
import { ref } from 'vue';
import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';

const isShowingExtra = ref(true);
const collapsibleOpen = ref(true);
const collapsiblePanelRef = ref<InstanceType<typeof ASplitterPanel> | null>(null);

function handleCollapsed() {
  collapsibleOpen.value = false;
}

function handleExpanded() {
  collapsibleOpen.value = true;
}

function toggleCollapsible() {
  if (collapsibleOpen.value) {
    collapsiblePanelRef.value?.collapse?.();
  } else {
    collapsiblePanelRef.value?.expand?.();
  }

  collapsibleOpen.value = !collapsibleOpen.value;
}
</script>

<template>
  <Story
    title="Splitter/Pixel sized panels"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Fixed sidebar">
      <div class="space-y-4">
        <div
          class="h-48 w-full"
        >
          <ASplitterGroup direction="horizontal">
            <ASplitterPanel
              size-unit="px"
              :default-size="220"
              :min-size="160"
              :max-size="320"
              class="bg-blackA8 rounded-lg flex items-center justify-center"
            >
              Sidebar (px)
            </ASplitterPanel>
            <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            <ASplitterPanel class="bg-blackA8 rounded-lg flex items-center justify-center">
              Flexible content
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>

    <Variant title="Persistence (px)">
      <div class="space-y-4">
        <div
          class="h-48 w-full"
        >
          <ASplitterGroup
            auto-save-id="pixel-persistence"
            direction="horizontal"
          >
            <ASplitterPanel
              size-unit="px"
              :default-size="200"
              :min-size="140"
              :max-size="320"
              class="bg-blackA8 rounded-lg flex items-center justify-center"
            >
              Sidebar (px)
            </ASplitterPanel>
            <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            <ASplitterPanel class="bg-blackA8 rounded-lg flex items-center justify-center">
              Resizable content
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>

    <Variant title="Conditional panel (px)">
      <div class="space-y-4">
        <div class="flex gap-2 items-center">
          <button
            class="text-sm text-slate-800 px-3 py-1.5 rounded bg-white hover:bg-slate-100"
            @click="isShowingExtra = !isShowingExtra"
          >
            {{ isShowingExtra ? 'Hide' : 'Show' }} extra panel
          </button>
        </div>

        <div class="h-48 w-full">
          <ASplitterGroup direction="horizontal">
            <ASplitterPanel
              class="bg-blackA8 rounded-lg flex items-center justify-center"
              :min-size="15"
            >
              Primary
            </ASplitterPanel>
            <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />

            <template v-if="isShowingExtra">
              <ASplitterPanel
                size-unit="px"
                :default-size="180"
                :min-size="140"
                :max-size="260"
                :order="2"
                class="bg-blackA8 rounded-lg flex items-center justify-center"
              >
                Optional (px)
              </ASplitterPanel>
              <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            </template>

            <ASplitterPanel
              :order="3"
              class="bg-blackA8 rounded-lg flex items-center justify-center"
            >
              Main content
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>

    <Variant title="Collapsible (px)">
      <div class="space-y-3">
        <div class="text-muted-foreground text-sm flex gap-2 items-center">
          <button
            class="text-sm text-slate-800 px-3 py-1.5 rounded bg-white hover:bg-slate-100"
            @click="toggleCollapsible"
          >
            {{ collapsibleOpen ? 'Collapse' : 'Expand' }} sidebar
          </button>
        </div>

        <div class="h-48 w-full">
          <ASplitterGroup direction="horizontal">
            <ASplitterPanel
              ref="collapsiblePanelRef"
              collapsible
              size-unit="px"
              :collapsed-size="48"
              :default-size="200"
              :min-size="140"
              :max-size="260"
              class="bg-blackA8 rounded-lg flex items-center justify-center"
              :data-state="collapsibleOpen ? 'expanded' : 'collapsed'"
              @collapse="handleCollapsed"
              @expand="handleExpanded"
            >
              Collapsible (px)
            </ASplitterPanel>
            <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            <ASplitterPanel class="bg-blackA8 rounded-lg flex items-center justify-center">
              Content area
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
