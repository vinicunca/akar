<script setup lang="ts">
import { ref } from 'vue';

import AEditable from './_dummy-a-editable.vue';

const defaultValue = 'Default value';
const modelValue = ref(defaultValue);
</script>

<template>
  <Story
    title="AEditable/Chromatic"
    :layout="{ type: 'grid', width: '50%', iframe: false }"
  >
    <Variant title="Uncontrolled (modelValue)">
      <AEditable :default-value="defaultValue" />
    </Variant>

    <Variant title="Controlled (modelValue)">
      <AEditable v-model="modelValue" />
    </Variant>

    <Variant title="Empty default">
      <AEditable />
    </Variant>

    <Variant title="Default value">
      <AEditable :default-value="defaultValue" />
    </Variant>

    <Variant title="Edit on focus">
      <AEditable
        :default-value="defaultValue"
        activation-mode="focus"
      />
    </Variant>

    <Variant title="Edit on double click">
      <AEditable
        :default-value="defaultValue"
        activation-mode="dblclick"
      />
    </Variant>

    <Variant title="Submit on blur">
      <AEditable
        :default-value="defaultValue"
        submit-mode="blur"
      />
    </Variant>

    <Variant title="Submit on enter">
      <AEditable
        :default-value="defaultValue"
        submit-mode="enter"
      />
    </Variant>

    <Variant title="Select on focus">
      <AEditable
        :default-value="defaultValue"
        activation-mode="focus"
        select-on-focus
      />
    </Variant>

    <Variant title="Disabled">
      <AEditable
        :default-value="defaultValue"
        disabled
      />
    </Variant>

    <Variant title="Start in edit mode">
      <AEditable
        :default-value="defaultValue"
        start-with-edit-mode
      />
    </Variant>

    <Variant title="Read only">
      <AEditable
        :default-value="defaultValue"
        readonly
      />
    </Variant>

    <Variant title="Auto resize">
      <AEditable
        :default-value="defaultValue"
        auto-resize
      />
    </Variant>
  </Story>
</template>
