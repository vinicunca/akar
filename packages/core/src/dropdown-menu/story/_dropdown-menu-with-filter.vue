<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  ADropdownMenuContent,
  ADropdownMenuFilter,
  ADropdownMenuItem,
  ADropdownMenuPortal,
  ADropdownMenuRoot,
  ADropdownMenuTrigger,
} from '..';

const props = defineProps<{
  defaultOpen?: boolean;
  disabledFilter?: boolean;
}>();

const toggleState = ref(props.defaultOpen ?? false);
const filterText = ref('');

const items = [
  { value: 'new-tab', label: 'New Tab' },
  { value: 'new-window', label: 'New Window' },
  { value: 'bookmarks', label: 'Show Bookmarks' },
  { value: 'history', label: 'Show History' },
];

const filteredItems = computed(() => {
  if (!filterText.value) {
    return items;
  }
  return items.filter((item) =>
    item.label.toLowerCase().includes(filterText.value.toLowerCase()),
  );
});

defineExpose({
  filterText,
});
</script>

<template>
  <div>
    <ADropdownMenuRoot v-model:open="toggleState">
      <ADropdownMenuTrigger
        class="text-violet11 shadow-blackA7 hover:bg-violet3 outline-none rounded-full bg-white inline-flex h-[35px] w-[35px] shadow-[0_2px_10px] items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Customise options"
      >
        Open
      </ADropdownMenuTrigger>

      <ADropdownMenuPortal to="#filter-test">
        <ADropdownMenuContent
          class="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade p-[5px] will-change-[opacity,transform] rounded-md bg-white min-w-[220px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <ADropdownMenuFilter
            v-model="filterText"
            :disabled="disabledFilter"
            class="text-sm mb-1 px-2 py-1 outline-none border-b border-gray-200 w-full"
            placeholder="Filter items..."
          />
          <ADropdownMenuItem
            v-for="item in filteredItems"
            :key="item.value"
            :value="item.value"
            class="group text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 text-[13px] leading-none px-[5px] pl-[25px] outline-none rounded-[3px] flex h-[25px] select-none items-center relative data-[disabled]:pointer-events-none"
          >
            {{ item.label }}
          </ADropdownMenuItem>
        </ADropdownMenuContent>
      </ADropdownMenuPortal>
    </ADropdownMenuRoot>

    <div id="filter-test" />
  </div>
</template>
