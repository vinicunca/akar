<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { countryList } from '~~/shared/constant';
import { ATreeItem, ATreeRoot, ATreeVirtualizer } from '..';

function groupCountriesByFirstLetter(countries: Array<string>) {
  const grouped = countries.reduce((acc, country) => {
    const firstLetter = country[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = { title: firstLetter, children: [] };
    }

    acc[firstLetter].children.push({ title: country });
    return acc;
  }, {} as { [key: string]: { title: string; children: Array<{ title: string }> } });

  return Object.values(grouped);
}

const items = groupCountriesByFirstLetter(countryList);
</script>

<template>
  <Story
    title="Tree/Virtual"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        :items="items"
        :get-key="(item) => item.title"
        multiple
        selection-behavior="replace"
        propagate-select
        class="text-blackA11 text-sm font-medium p-2 list-none rounded-lg bg-white h-80 w-64 select-none overflow-y-auto"
      >
        <ATreeVirtualizer
          v-slot="{ item }"
          :text-content="(item) => item.title"
        >
          <ATreeItem
            class="data-[selected]:bg-grass4 focus:ring-grass9 my-0.5 px-2 py-1 outline-none rounded flex w-max items-center focus:ring-2"
            :style="{ 'margin-left': `${item.level - 1}rem` }"
            v-bind="item.bind"
          >
            <Icon
              v-if="item.hasChildren"
              icon="radix-icons:chevron-down"
              class="h-4 w-4"
            />
            <div class="pl-2">
              {{ item.value.title }}
            </div>
          </ATreeItem>
        </ATreeVirtualizer>
      </ATreeRoot>
    </Variant>
  </Story>
</template>
