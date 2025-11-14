<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef, useTemplateRef } from 'vue';

const inputDateRef = useTemplateRef('inputDateRef');

const modelValue = shallowRef(new CalendarDate(2022, 1, 10));
</script>

<template>
  <PInputDate
    ref="inputDateRef"
    v-model="modelValue"
  >
    <template #trailing>
      <PPopover :reference="inputDateRef?.inputsRef[3]?.$el">
        <PButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-calendar"
          aria-label="Select a date"
          class="akar:px-0"
        />

        <template #content>
          <PCalendar
            v-model="modelValue"
            class="p-2"
          />
        </template>
      </PPopover>
    </template>
  </PInputDate>
</template>
