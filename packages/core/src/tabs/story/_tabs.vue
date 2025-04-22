<script setup lang="ts">
import { ATabsContent, ATabsList, ATabsRoot, ATabsTrigger } from '..';
</script>

<template>
  <ATabsRoot
    class="w-[300px] flex flex-col shadow-[0_2px_10px] shadow-blackA4"
    :default-value="1"
  >
    <ATabsList
      class="flex shrink-0 border-b border-mauve6"
      aria-label="Manage your account"
    >
      <ATabsTrigger
        class="h-[45px] flex flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-violet11 hover:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
        :value="1"
      >
        Account
      </ATabsTrigger>
      <ATabsTrigger
        class="h-[45px] flex flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] text-mauve11 leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-violet11 hover:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
        value="tab2"
      >
        Password
      </ATabsTrigger>
    </ATabsList>
    <ATabsContent
      class="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      :value="1"
    >
      <p class="mb-5 text-[15px] text-mauve11 leading-normal">
        Make changes to your account here. Click save when you're done.
      </p>
    </ATabsContent>
    <ATabsContent
      class="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab2"
    >
      <p class="mb-5 text-[15px] text-mauve11 leading-normal">
        Change your password here. After saving, you'll be logged out.
      </p>
    </ATabsContent>
  </ATabsRoot>
</template>
