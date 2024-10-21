<script lang="ts" setup>
function handleKeydown(event) {
  console.log('🚀 ~ handleKeydown ~ :', event.key);
}

function handleClick() {
  console.log('🚀 ~ handleClick ~ :');
}
</script>

<template>
  <button
    data-testid="test-coba"
    @keydown="handleKeydown"
    @click="handleClick"
  >
    hehe
  </button>
</template>
