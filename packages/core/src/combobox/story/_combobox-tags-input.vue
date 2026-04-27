<script setup lang="ts">
import { computed, ref } from 'vue';
import { AComboboxAnchor, AComboboxContent, AComboboxGroup, AComboboxInput, AComboboxItem, AComboboxRoot, AComboboxViewport } from '..';
import { useFilter } from '../../shared';
import { ATagsInputInput, ATagsInputItem, ATagsInputItemText, ATagsInputRoot } from '../../tags-input';

const props = withDefaults(defineProps<{
  addOnBlur?: boolean;
}>(), {
  addOnBlur: false,
});

const { contains } = useFilter({ sensitivity: 'base' });

const query = ref('');
const values = ref<Array<string>>([]);
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];

const filteredOptions = computed(() => options.filter((option) => contains({ string: option, substring: query.value }) && !values.value.includes(option)));
</script>

<template>
  <AComboboxRoot
    v-model="values"
    multiple
  >
    <AComboboxAnchor>
      <ATagsInputRoot
        v-slot="{ modelValue: tags }"
        v-model="values"
        :add-on-blur="props.addOnBlur"
        delimiter=""
      >
        <ATagsInputItem
          v-for="(item, index) in tags"
          :key="index"
          :value="item"
        >
          <ATagsInputItemText />
        </ATagsInputItem>

        <AComboboxInput
          v-model="query"
          as-child
        >
          <ATagsInputInput
            placeholder="Fruits..."
            @keydown.enter.prevent
          />
        </AComboboxInput>
      </ATagsInputRoot>
    </AComboboxAnchor>
    <AComboboxContent>
      <AComboboxViewport>
        <AComboboxGroup>
          <AComboboxItem
            v-for="(option, index) in filteredOptions"
            :key="index"
            :value="option"
          >
            <span>{{ option }}</span>
          </AComboboxItem>
        </AComboboxGroup>
      </AComboboxViewport>
    </AComboboxContent>
  </AComboboxRoot>
</template>
