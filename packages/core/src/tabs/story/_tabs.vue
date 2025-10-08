<script setup lang="ts">
import { ATabsContent, ATabsList, ATabsRoot, ATabsTrigger } from '..';
</script>

<template>
  <ATabsRoot
    class="shadow-blackA4 flex flex-col w-[300px] shadow-[0_2px_10px]"
    :default-value="1"
  >
    <ATabsList
      class="border-mauve6 border-b flex shrink-0"
      aria-label="Manage your account"
    >
      <ATabsTrigger
        class="text-mauve11 data-[state=active]:text-violet11 hover:text-violet11 text-[15px] leading-none px-5 outline-none bg-white flex flex-1 h-[45px] cursor-default select-none items-center justify-center first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black data-[state=active]:focus:relative"
        :value="1"
      >
        Account
      </ATabsTrigger>
      <ATabsTrigger
        class="text-mauve11 data-[state=active]:text-violet11 hover:text-violet11 text-[15px] leading-none px-5 outline-none bg-white flex flex-1 h-[45px] cursor-default select-none items-center justify-center first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black data-[state=active]:focus:relative"
        value="tab2"
      >
        Password
      </ATabsTrigger>
    </ATabsList>
    <ATabsContent
      class="p-5 outline-none rounded-b-md bg-white grow focus:shadow-[0_0_0_2px] focus:shadow-black"
      :value="1"
    >
      <p class="text-mauve11 text-[15px] leading-normal mb-5">
        Make changes to your account here. Click save when you're done.
      </p>
    </ATabsContent>
    <ATabsContent
      class="p-5 outline-none rounded-b-md bg-white grow focus:shadow-[0_0_0_2px] focus:shadow-black"
      value="tab2"
    >
      <p class="text-mauve11 text-[15px] leading-normal mb-5">
        Change your password here. After saving, you'll be logged out.
      </p>
    </ATabsContent>
  </ATabsRoot>
</template>
