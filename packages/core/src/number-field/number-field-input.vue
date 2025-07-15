<script lang="ts">
import type { APrimitiveProps } from '~~/primitive';

export interface ANumberFieldInputProps extends APrimitiveProps {
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { APrimitive, usePrimitiveElement } from '~~/primitive';
import { getActiveElement } from '~~/shared';
import { injectANumberFieldRootContext } from './number-field-root.vue';

const props = withDefaults(defineProps<ANumberFieldInputProps>(), {
  as: 'input',
});

const { primitiveElement, currentElement } = usePrimitiveElement();
const rootContext = injectANumberFieldRootContext();

function handleWheelEvent(event: WheelEvent) {
  if (rootContext.disableWheelChange.value) {
    return;
  }

  // only handle when in focus
  if (event.target !== getActiveElement()) {
    return;
  }

  // if on a trackpad, users can scroll in both X and Y at once, check the magnitude of the change
  // if it's mostly in the X direction, then just return, the user probably doesn't mean to inc/dec
  // this isn't perfect, events come in fast with small deltas and a part of the scroll may give a false indication
  // especially if the user is scrolling near 45deg
  if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
    return;
  }

  event.preventDefault();

  if (event.deltaY > 0) {
    if (rootContext.invertWheelChange.value) {
      rootContext.handleDecrease();
    } else {
      rootContext.handleIncrease();
    }
  } else if (event.deltaY < 0) {
    if (rootContext.invertWheelChange.value) {
      rootContext.handleIncrease();
    } else {
      rootContext.handleDecrease();
    }
  }
}

onMounted(() => {
  rootContext.onInputElement(currentElement.value as HTMLInputElement);
});

const inputValue = ref(rootContext.textValue.value);

watch(
  () => rootContext.textValue.value,
  () => {
    inputValue.value = rootContext.textValue.value;
  },
  { immediate: true, deep: true },
);

function handleChange() {
  requestAnimationFrame(() => {
    inputValue.value = rootContext.textValue.value;
  });
}
</script>

<template>
  <APrimitive
    v-bind="props"
    :id="rootContext.id.value"
    ref="primitiveElement"
    role="spinbutton"
    type="text"
    tabindex="0"
    :value="inputValue"
    :inputmode="rootContext.inputMode.value"
    :disabled="rootContext.disabled.value ? '' : undefined"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :readonly="rootContext.readonly.value ? '' : undefined"
    :data-readonly="rootContext.readonly.value ? '' : undefined"
    autocomplete="off"
    autocorrect="off"
    spellcheck="false"
    aria-roledescription="Number field"
    :aria-valuenow="rootContext.modelValue.value"
    :aria-valuemin="rootContext.min.value"
    :aria-valuemax="rootContext.max.value"
    @keydown.up.prevent="rootContext.handleIncrease()"
    @keydown.down.prevent="rootContext.handleDecrease()"
    @keydown.page-up.prevent="rootContext.handleIncrease(10)"
    @keydown.page-down.prevent="rootContext.handleDecrease(10)"
    @keydown.home.prevent="rootContext.handleMinMaxValue('min')"
    @keydown.end.prevent="rootContext.handleMinMaxValue('max')"
    @wheel="handleWheelEvent"
    @beforeinput="(event: InputEvent) => {
      const target = event.target as HTMLInputElement
      let nextValue
        = target.value.slice(0, target.selectionStart ?? undefined)
          + (event.data ?? '')
          + target.value.slice(target.selectionEnd ?? undefined);

      // validate
      if (!rootContext.validate(nextValue))
        event.preventDefault()
    }"
    @input="(event: InputEvent) => {
      const target = event.target as HTMLInputElement
      inputValue = target.value
    }"
    @change="handleChange"
    @keydown.enter="rootContext.applyInputValue($event.target?.value)"
    @blur="rootContext.applyInputValue($event.target?.value)"
  >
    <slot />
  </APrimitive>
</template>
