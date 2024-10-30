<script setup lang="ts">
import { countryList } from '~~/shared';

import { ATreeItem, ATreeRoot, ATreeVirtualizer } from '..';

function groupCountriesByFirstLetter(countries: Array<string>) {
  const grouped = countries.reduce((acc, country) => {
    const firstLetter = country[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = { title: firstLetter, children: [] };
    }

    acc[firstLetter].children.push({ title: country });
    return acc;
  }, {} as { [key: string]: { children: Array<{ title: string }>; title: string } });

  return Object.values(grouped);
}

const items = groupCountriesByFirstLetter(countryList);
</script>

<template>
  <Story
    title="ATree/Virtual"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="default">
      <ATreeRoot
        :items="items"
        :get-key="(item) => item.title"
        multiple
        selection-behavior="replace"
        propagate-select
        class="h-80 w-64 select-none list-none overflow-y-auto rounded-lg bg-white p-2 text-sm text-blackA11 font-medium"
      >
        <ATreeVirtualizer
          v-slot="{ item }"
          :text-content="(item) => item.title"
        >
          <ATreeItem
            class="my-0.5 w-max flex items-center rounded px-2 py-1 outline-none data-[selected]:bg-grass4 focus:ring-2 focus:ring-grass9"
            :style="{ 'margin-left': `${item.level - 1}rem` }"
            v-bind="item.bind"
          >
            <i
              v-if="item.hasChildren"
              class="i-radix-icons:chevron-down h-4 w-4"
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
