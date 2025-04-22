<script setup lang="ts">
// import AccordionDemo from '../../components/demo/Accordion/tailwind/index.vue';
// import CalendarDemo from '../../components/demo/Calendar/tailwind/index.vue';
// import HoverCardDemo from '../../components/demo/HoverCard/tailwind/index.vue';
// import NumberFieldDemo from '../../components/demo/NumberField/tailwind/index.vue';
// import PinInputDemo from '../../components/demo/PinInput/tailwind/index.vue';
// import ProgressDemo from '../../components/demo/Progress/tailwind/index.vue';
// import SelectDemo from '../../components/demo/Select/tailwind/index.vue';
// import SliderDemo from '../../components/demo/Slider/tailwind/index.vue';
// import TagsInputDemo from '../../components/demo/TagsInput/tailwind/index.vue';
// import ToolbarDemo from '../../components/demo/Toolbar/tailwind/index.vue';
// import TreeDemo from '../../components/demo/Tree/tailwind/index.vue';
</script>

<template>
  <section>
    <div class="grid justify-items-center gap-8 p-5 px-3 md:gap-10 md:px-8 sm:px-4">
      <div class="grid mt-6 max-w-4xl w-full justify-items-center gap-[inherit] md:mt-20 sm:mt-10">
        <h1 class="text-center text-pretty text-4xl text-foreground font-bold md:text-7xl sm:text-6xl sm:font-extrabold">
          Craft accessible web apps with Vue
        </h1>
        <p class="max-w-[720px] text-center text-pretty text-lg text-muted-foreground lg:text-2xl md:text-xl lg:leading-9 md:leading-8">
          An open-source library with
          <a
            class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
            href="/docs/guides/styling"
          >
            unstyled</a>,
          <a
            class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
            href="/docs/guides/composition"
          >
            primitive
          </a>
          components,
          accompanied by a variety of
          <a
            class="relative inline-block text-foreground font-semibold before:[translate:0_-0.1em] before:absolute before:inset-x-0 before:top-full before:h-[2px] before:bg-primary hover:before:h-[4px]"
            href="/examples"
          >
            examples & use cases
          </a>
          ready to be integrated into your projects.
        </p>
      </div>
      <div class="mb-12 max-w-[calc(100%-2rem)] flex flex-wrap items-center justify-center gap-4 md:mb-20">
        <a
          class="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-primary-foreground font-semibold hover:bg-primary/90"
          href="/docs/overview/getting-started"
        >
          Get started
        </a>
        <a
          class="group flex items-center justify-center gap-2 whitespace-nowrap border border-muted rounded-lg bg-muted/50 px-5 py-2.5 text-foreground/70 font-semibold hover:bg-card hover:text-foreground"
          href="/docs/components/checkbox"
        >
          Explore components
          <i class="i-lucide:arrow-right" />
        </a>
      </div>
    </div>
  </section>

  <section class="relative mt-12 h-[40rem] w-full overflow-hidden text-foreground">
    <div class="absolute left-1/2 h-[32rem] w-[90rem] overflow-hidden border border-muted rounded-3xl bg-card/20 -translate-x-1/2">
      <img
        class="absolute max-w-none w-[90rem] flex-none"
        decoding="async"
        src="/new-bg.png"
        alt="backdrop"
        draggable="false"
      >
    </div>
    <div class="absolute left-1/2 z-[1] h-[32rem] w-[90rem] md:block -translate-x-1/2">
      <div class="absolute left-[16rem] top-8 xl:left-8">
        <TagsInputDemo />
      </div>

      <div class="absolute right-[32rem] top-[24rem] text-sm text-stone-700 md:right-[30rem] md:top-[4rem]">
        <PinInputDemo />
      </div>

      <div class="absolute right-[30rem] top-8 md:right-[10rem] xl:right-6">
        <CalendarDemo />
      </div>

      <div class="absolute left-[20rem] top-[8rem]">
        <AccordionDemo />
      </div>

      <div class="absolute left-[2rem] top-48 xl:-left-12">
        <TreeDemo />
      </div>

      <div class="absolute bottom-[6rem] left-[20rem] xl:bottom-12 xl:left-[14rem]">
        <SliderDemo />
      </div>

      <div class="absolute bottom-2 left-[32rem] text-sm text-stone-700 xl:-bottom-4">
        <NumberFieldDemo />
      </div>

      <div class="absolute bottom-[4rem] right-[36rem] hidden xl:right-[32rem] md:block">
        <SelectDemo />
      </div>

      <div class="absolute right-[40rem] top-[12rem] hidden xl:right-[24rem] md:block">
        <HoverCardDemo />
      </div>

      <div class="absolute bottom-0 right-[8rem] xl:-right-12">
        <ToolbarDemo />
      </div>

      <div class="absolute bottom-[12rem] right-[30rem] hidden xl:right-[22rem] md:block">
        <ProgressDemo />
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-screen-xl py-24 md:px-6">
    <div class="grid grid-cols-1 h-[36rem] gap-y-4 lg:grid-cols-5 lg:h-96 lg:gap-4">
      <div class="relative col-span-3 flex flex-col overflow-hidden border border-muted rounded-2xl p-10">
        <div class="text-lg font-bold">
          Accessibility out of the box.
        </div>
        <div class="text-muted-foreground">
          Supports assistive technology
        </div>

        <img
          class="absolute max-w-none w-[1000px] -bottom-40 -left-40 -scale-y-100"
          src="/bg.png"
          alt="Background"
        >
        <div class="relative h-full w-full flex items-center justify-center">
          <div class="-translate-y-0 absolute flex items-center gap-2 border border-muted rounded-full bg-background/50 px-5 py-2.5 text-sm text-muted-foreground font-medium backdrop-blur-lg -translate-x-40">
            <i
              class="i-lucide:shield-check text-xl text-primary"
            />
            <span>WAI-ARIA compliant</span>
          </div>

          <div class="absolute flex translate-x-28 items-center gap-2 border border-muted rounded-full bg-background/50 px-5 py-2.5 text-sm text-muted-foreground font-medium backdrop-blur-lg -translate-y-16">
            <i
              class="i-lucide:keyboard text-xl text-primary"
            />
            <span>Keyboard navigation</span>
          </div>

          <div class="absolute flex translate-y-16 items-center gap-2 border border-muted rounded-full bg-background/50 px-5 py-2.5 text-sm text-muted-foreground font-medium backdrop-blur-lg -translate-x-20">
            <i
              class="i-lucide:text-cursor-input text-xl text-primary"
            />
            <span>Focus management</span>
          </div>

          <div class="absolute flex translate-x-44 translate-y-4 items-center gap-2 border border-muted rounded-full bg-background/50 px-5 py-2.5 text-sm text-muted-foreground font-medium backdrop-blur-lg">
            <i
              class="i-lucide:view text-xl text-primary"
            />
            <span>Screen reader support</span>
          </div>
        </div>

        <div />
      </div>
      <div class="relative col-span-2 overflow-hidden border border-muted rounded-2xl p-10">
        <div>
          <div class="text-lg font-bold">
            Save time. Ship faster.
          </div>
          <div class="text-muted-foreground">
            40+ Primitive Components
          </div>
        </div>

        <div class="absolute left-1/2 top-12 w-full flex flex-col items-center justify-center -translate-x-1/2">
          <img
            draggable="false"
            class="w-[300px]"
            src="/lightning.svg"
            alt="Lightning"
          >
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 mt-4 h-[36rem] gap-y-4 lg:(grid-cols-5 h-110 gap-4)">
      <div class="relative col-span-2 overflow-hidden border border-muted rounded-2xl p-10">
        <div class="absolute flex flex-col">
          <div class="z-10 text-lg font-bold">
            Developer Experience First.
          </div>
          <div class="text-muted-foreground">
            Unstyled, Customizable, Familiar API
          </div>

          <div class="relative mt-8 h-full w-full">
            <div class="language-vue prose prose-white">
              <pre
                class="shiki one-dark-pro vp-code"
              ><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#B392F0;"> setup</span><span style="color:#B392F0;"> lang</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">"ts"</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { AccordionRoot, AccordionItem } </span><span style="color:#F97583;">from</span><span style="color:#9ECBFF;"> '@vinicunca/akar'</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line" />
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">AccordionRoot</span> v-model</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">"controlRef"</span><span style="color:#B392F0;"><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:hsl(var(--muted-foreground));">    &lt;!-- css --&gt;</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">AccordionItem</span><span style="color:#B392F0;"> class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">"AccordionItem"</span><span style="color:#B392F0;"> /&gt;</span></span>
<span class="line"><span style="color:hsl(var(--muted-foreground));">    &lt;!-- unocss --&gt;</span></span>
<span class="line highlighted"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">AccordionItem</span><span style="color:#B392F0;"> class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">"bg-white px-4 py-2"</span><span style="color:#B392F0;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">AccordionRoot</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
            </code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="relative col-span-3 overflow-hidden border border-muted rounded-2xl p-10">
        <div class="absolute z-10">
          <div class="text-xl text-white font-bold">
            Ready for an international audience
          </div>
          <div class="text-muted-foreground">
            RTL support, Locale, Numbering System
          </div>
        </div>
        <img
          draggable="false"
          class="absolute left-48 top-0 scale-[1.75] hue-rotate-[220deg] saturate-[1.2] dark:mix-blend-lighten"
          src="/globe.jpg"
          alt="Globe image"
        >
      </div>
    </div>
  </section>
</template>
