<script lang="ts" setup>
interface Props {
  menus?: Array<{}>;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    accordion: true,
    menus: () => [],
  },
);
</script>

<template>
  <PNavigationMenu
    orientation="vertical"
    :items="props.menus"
    expand-based-on-route
  />
</template>
