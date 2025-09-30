<script lang="ts" setup>
import { PContainer, PMain } from '#components';
</script>

<template>
  <PMain>
    <PContainer>
      <div class="flex-vertical lg:(gap-10 grid grid-cols-10)">
        <!-- Left Aside -->
        <div class="lg-col-span-2">
          <!--  -->
        </div>

        <div class="lg:col-span-8">
          <slot />
        </div>
      </div>
    </PContainer>
  </PMain>
</template>
