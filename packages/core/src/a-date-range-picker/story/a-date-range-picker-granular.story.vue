<script setup lang="ts">
import ADateRangePicker from './_dummy-a-date-range-picker.vue';
</script>

<template>
  <Story
    title="Date Range Picker/Granular"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant title="Granular (second)">
      <ADateRangePicker granularity="second" />
    </Variant>

    <Variant title="Granular (minute)">
      <ADateRangePicker granularity="minute" />
    </Variant>

    <Variant title="Granular (hour)">
      <ADateRangePicker granularity="hour" />
    </Variant>

    <Variant title="Granular (day)">
      <ADateRangePicker granularity="day" />
    </Variant>
  </Story>
</template>
