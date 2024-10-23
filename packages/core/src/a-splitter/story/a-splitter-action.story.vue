<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { ASplitterGroup, ASplitterPanel, ASplitterResizeHandle } from '..';

const panelRef = ref<InstanceType<typeof ASplitterPanel>>();

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(panelRef.value?.$el);
  // eslint-disable-next-line no-console
  console.log(panelRef.value?.getSize());
});
</script>

<template>
  <Story
    title="ASplitter/Action"
    :layout="{ type: 'single', width: '100%', iframe: false }"
  >
    <Variant title="default">
      <div>
        <button
          class="rounded bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-100"
          @click="panelRef?.isCollapsed ? panelRef?.expand() : panelRef?.collapse() "
        >
          {{ panelRef?.isCollapsed ? 'Expand' : 'Collapse' }}
        </button>

        <button
          class="ml-2 rounded bg-white px-3 py-1.5 text-sm text-slate-800 hover:bg-slate-100"
          @click="panelRef?.resize(20)"
        >
          Resize to 20
        </button>

        <div class="mt-4 h-48 w-full">
          <ASplitterGroup direction="horizontal">
            <ASplitterPanel
              ref="panelRef"
              collapsible
              :collapsed-size="5"
              :default-size="20"
              :max-size="30"
              :min-size="15"
              class="rounded-lg bg-blackA8"
            >
              <div class="p-4">
                Collapsible
              </div>
            </ASplitterPanel>
            <ASplitterResizeHandle class="w-2 transition data-[state=active]:bg-white" />
            <ASplitterPanel class="rounded-lg bg-blackA8">
              <div class="h-full overflow-auto">
                <div class="h-96 w-[30vw] p-4">
                  Non-collapsible
                </div>
              </div>
            </ASplitterPanel>
          </ASplitterGroup>
        </div>
      </div>
    </Variant>
  </Story>
</template>
