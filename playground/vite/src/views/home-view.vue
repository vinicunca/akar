<script setup lang="ts">
</script>

<template>
  <main data-akar-drawer-wrapper>
    <div class="relative">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-1/2 top-0 z-10 h-[400px] w-[1000px] opacity-[0.15] -translate-x-1/2 -translate-y-1/2"
        style="background-image: radial-gradient(#a4a4a3, transparent 50%)"
      />

      <div class="mx-auto max-w-2xl pt-64 text-center">
        <div class="relative flex flex-col">
          <h1 class="relative mb-4 text-7xl font-semibold">
            akar <span class="text-[#42b883]">Vue</span>
          </h1>
          <h2 class="text-xl text-gray-600">
            A Vue port of the popular React library created by <a
              target="_blank"
              href="https://emilkowal.ski/"
              class="underline decoration-1 decoration-gray-400 underline-offset-2"
            > Emil
              Kowalski </a>
          </h2>
        </div>
        <div class="mt-6 flex justify-center gap-4">
          <a
            href="https://github.com/unovue/@vinicunca/akar"
            target="_blank"
            class="rounded-full px-4 py-2.5 text-sm font-semibold hover:bg-gray-100"
          > GitHub <span
            aria-hidden="true"
          >→</span></a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
