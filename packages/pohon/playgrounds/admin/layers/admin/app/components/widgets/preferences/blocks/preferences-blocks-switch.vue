<script setup lang="ts">
withDefaults(
  defineProps<{ disabled?: boolean; tip?: string }>(),
  {
    disabled: false,
    tip: '',
  },
);

const checked = defineModel<boolean>();

const slots = useSlots();

function handleClick() {
  checked.value = !checked.value;
}
</script>

<template>
  <button
    :class="{
      'pointer-events-none opacity-50': disabled,
    }"
    class="px-2 py-2.5 rounded-md flex w-full transition-colors-280 items-center justify-between hover:bg-background-elevated"
    @click="handleClick"
  >
    <span class="text-sm flex items-center">
      <slot />

      <PTooltip
        v-if="tip"
      >
        <i class="i-lucide:circle-help ml-1 size-4 cursor-help" />

        <template #content>
          <p
            v-for="(line, index) in tip.split('\n')"
            :key="index"
          >
            {{ line }}
          </p>
        </template>
      </PTooltip>
    </span>

    <span
      v-if="slots.shortcut"
      class="text-xs ml-auto mr-2 opacity-60"
    >
      <slot name="shortcut" />
    </span>

    <PSwitch
      v-model="checked"
      @click.stop
    />
  </button>
</template>
