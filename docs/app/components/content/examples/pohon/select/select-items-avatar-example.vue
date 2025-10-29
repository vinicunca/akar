<script setup lang="ts">
import type { SelectItem } from 'pohon-ui'

const items = ref([
  {
    label: 'praburangki',
    value: 'praburangki',
    avatar: {
      src: 'https://github.com/praburangki.png',
      alt: 'praburangki'
    }
  },
  {
    label: 'wahyu-ivan',
    value: 'wahyu-ivan',
    avatar: {
      src: 'https://github.com/wahyu-ivan.png',
      alt: 'wahyu-ivan'
    }
  },
  {
    label: 'GunawanAhmad',
    value: 'GunawanAhmad',
    avatar: {
      src: 'https://github.com/GunawanAhmad.png',
      alt: 'GunawanAhmad'
    }
  },
  {
    label: 'sandros94',
    value: 'sandros94',
    avatar: {
      src: 'https://github.com/sandros94.png',
      alt: 'sandros94'
    }
  }
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

const avatar = computed(() => items.value.find(item => item.value === value.value)?.avatar)
</script>

<template>
  <USelect v-model="value" :items="items" value-key="value" :avatar="avatar" class="w-48" />
</template>
