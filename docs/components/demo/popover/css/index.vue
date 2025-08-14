<script setup lang="ts">
import { Icon } from '@iconify/vue';
import {
  APopoverArrow,
  APopoverClose,
  APopoverContent,
  APopoverPortal,
  APopoverRoot,
  APopoverTrigger,
} from 'akar';
import './styles.css';
</script>

<template>
  <APopoverRoot>
    <APopoverTrigger
      class="IconButton"
      aria-label="Update dimensions"
    >
      <Icon icon="radix-icons:mixer-horizontal" />
    </APopoverTrigger>
    <APopoverPortal>
      <APopoverContent
        side="bottom"
        :side-offset="5"
        class="APopoverContent"
      >
        <div :style="{ display: 'flex', flexDirection: 'column', gap: 10 }">
          <p class="Text">
            Dimensions
          </p>
          <fieldset class="Fieldset">
            <label
              class="Label"
              for="width"
            > Width </label>
            <input
              id="width"
              class="Input"
              defaultValue="100%"
            >
          </fieldset>
          <fieldset class="Fieldset">
            <label
              class="Label"
              for="maxWidth"
            > Max. width </label>
            <input
              id="maxWidth"
              class="Input"
              defaultValue="300px"
            >
          </fieldset>
          <fieldset class="Fieldset">
            <label
              class="Label"
              for="height"
            > Height </label>
            <input
              id="height"
              class="Input"
              defaultValue="25px"
            >
          </fieldset>
          <fieldset class="Fieldset">
            <label
              class="Label"
              for="maxHeight"
            > Max. height </label>
            <input
              id="maxHeight"
              class="Input"
              defaultValue="none"
            >
          </fieldset>
        </div>
        <APopoverClose
          class="APopoverClose"
          aria-label="Close"
        >
          <Icon icon="radix-icons:cross-2" />
        </APopoverClose>
        <APopoverArrow class="APopoverArrow" />
      </APopoverContent>
    </APopoverPortal>
  </APopoverRoot>
</template>
