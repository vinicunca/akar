<script lang="ts" setup>
withDefaults(
  defineProps<{
    to?: string;
    mode?: 'akar' | 'pohon';
  }>(),
  {
    mode: 'akar',
  },
);
</script>

<template>
  <template v-if="mode === 'akar'">
    <ProseP>
      One benefit of using Akar is its flexibility and low-level control over the components. However, this also means that you may need to manually construct more complex UI elements by combining multiple Akar components together.
    </ProseP>

    <ProseP>
      If you feel there's a lot of elements that needs to be constructed manually using Akar, consider using <ProseA :to="to">
        Pohon UI
      </ProseA> instead. It provides a higher-level abstraction over Akar components with pre-defined styles and behaviors that can help you build UIs faster.
    </ProseP>
  </template>

  <template v-if="mode === 'pohon'">
    <ProseP>
      With Pohon UI, you can achieve similar component functionality with less code and effort, as it comes with built-in styles mechanism and behaviors that are optimized for common use cases. Since it's using <ProseA to="https://vinicunca.dev/unocss-variants">
        unocss-variants
      </ProseA> it adds a runtime cost, but it can be worth it if you prioritize development speed and ease of use over fine-grained control.
    </ProseP>

    <ProseP>
      If this is a deal breaker for you, you can always stick to using <ProseA :to="to">
        Akar
      </ProseA> and build your own custom components on top of it.
    </ProseP>
  </template>
</template>
