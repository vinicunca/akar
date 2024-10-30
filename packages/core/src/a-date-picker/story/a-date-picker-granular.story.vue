<script setup lang="ts">
import DatePicker from './_dummy-a-date-picker.vue';
</script>

<template>
  <Story
    title="ADatePicker/Granular"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Granular (second)">
      <DatePicker granularity="second" />
    </Variant>

    <Variant title="Granular (minute)">
      <DatePicker granularity="minute" />
    </Variant>

    <Variant title="Granular (hour)">
      <DatePicker granularity="hour" />
    </Variant>

    <Variant title="Granular (day)">
      <DatePicker granularity="day" />
    </Variant>
  </Story>
</template>
