<template>
  <div class="relative min-h-[300px] flex flex-col">
    <div class="relative h-full w-full flex flex-1 resize items-center justify-center rounded-xl from-teal9 to-green9 bg-gradient-to-br">
      <div class="max-w-[700px] w-full flex flex-col items-center justify-center">
        <slot />
      </div>
    </div>
  </div>
</template>
