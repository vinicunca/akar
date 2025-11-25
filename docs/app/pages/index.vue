<script setup lang="ts">
</script>

<template>
  <div class="bg-gray-50 min-h-screen relative overflow-hidden dark:bg-gray-950">
    <!-- Background Effects -->
    <div class="pointer-events-none inset-0 absolute">
      <div class="bg-[radial-gradient(ellipse_at_top,_var(--un-gradient-stops))] inset-0 absolute from-primary-500/10 to-transparent via-transparent dark:from-primary-400/10" />
      <div class="bg-[radial-gradient(circle_at_center,_var(--un-gradient-stops))] h-[600px] w-full left-1/2 top-0 absolute from-purple-500/10 to-transparent via-transparent blur-3xl -translate-x-1/2" />
      <!-- Grid Pattern -->
      <div class="bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 inset-0 absolute mix-blend-soft-light" />
    </div>

    <!-- Hero Section -->
    <div class="pb-16 pt-24 relative sm:pb-24 sm:pt-32">
      <div class="mx-auto px-4 text-center max-w-7xl lg:px-8 sm:px-6">
        <h1 class="text-5xl tracking-tight font-bold mb-8 sm:text-7xl">
          <span class="text-transparent from-gray-900 to-gray-900 via-gray-700 bg-gradient-to-r bg-clip-text dark:from-white dark:to-white dark:via-gray-200">
            Akar & Pohon UI
          </span>
        </h1>

        <p class="text-lg text-gray-600 leading-relaxed mx-auto mb-10 max-w-2xl sm:text-xl dark:text-gray-400">
          Create beautiful, responsive & accessible web apps quickly with Vue or Nuxt.
        </p>

        <div class="flex flex-col gap-4 justify-center sm:flex-row">
          <NuxtLink
            to="/docs/akar/overview/introduction"
            class="text-gray-900 font-medium px-8 py-4 border border-gray-200 rounded-xl bg-white flex gap-2 transition-all items-center justify-center dark:text-white dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-50 active:scale-95 hover:scale-105 dark:hover:bg-gray-800"
          >
            Get Started
          </NuxtLink>

          <NuxtLink
            to="https://github.com/vinicunca/akar"
            target="_blank"
            class="text-gray-900 font-medium px-8 py-4 border border-gray-200 rounded-xl bg-white flex gap-2 transition-all items-center justify-center dark:text-white dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-50 active:scale-95 hover:scale-105 dark:hover:bg-gray-800"
          >
            <i class="i-simple-icons:github text-xl" />
            GitHub
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
