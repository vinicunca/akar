<script lang="ts" setup>

</script>

<template>
  <div class="h-full relative">
    <NuxtPage
      :transition="{
        appear: true,
        mode: 'out-in',
        leaveActiveClass: 'transition-all-300',
        enterActiveClass: 'transition-all-300',
        enterFromClass: 'opacity-0 -translate-x-30px',
        leaveToClass: 'opacity-0 translate-x-30px',
      }"
    />
  </div>
</template>
