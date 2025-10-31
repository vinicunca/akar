<!-- eslint-disable sonar/no-nested-template-literals -->
<script lang="ts" setup>
import type { PChipProps } from 'pohon-ui';
import { MDCRenderer } from '#components';
import { fetchComponentExample, parseMarkdown, useAsyncData, useComponentName, useNuxtApp } from '#imports';
import { getProp, setProp } from '#pohon/utils';
import { toCamelCase } from '@vinicunca/perkakas';
import { useElementSize } from '@vueuse/core';
import { hash } from 'ohash';
import { computed, reactive, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
    class?: any;
    /**
     * Whether to render the component in an iframe
     * @defaultValue false
     */
    iframe?: boolean | { [key: string]: any };
    /**
     * Whether to display the component in a mobile-sized iframe viewport
     * @defaultValue false
     */
    iframeMobile?: boolean;
    props?: { [key: string]: any };
    /**
     * Whether to format the code with Prettier
     * @defaultValue false
     */
    prettier?: boolean;
    /**
     * Whether to collapse the code block
     * @defaultValue false
     */
    collapse?: boolean;
    /**
     * Whether to show the preview
     * When `false`, the filename will be shown instead
     * @defaultValue true
     */
    preview?: boolean;
    /**
     * Whether to show the source code
     * @defaultValue true
     */
    source?: boolean;
    /**
     * A list of variable props to link to the component.
     */
    options?: Array<{
      alias?: string;
      name: string;
      label: string;
      items?: Array<any>;
      default: any;
      multiple?: boolean;
    }>;
    /**
     * A list of line numbers to highlight in the code block
     */
    highlights?: Array<number>;
    /**
     * Whether to add overflow-hidden to wrapper
     */
    overflowHidden?: boolean;
  }>(),
  {
    preview: true,
    source: true,
  },
);

const slots = defineSlots<{
  options: (props?: object) => any;
  code: (props?: object) => any;
}>();

const camelName = toCamelCase(props.name);
const el = ref<HTMLElement>();
const { $prettier } = useNuxtApp();
const { width } = useElementSize(el);

const data = await fetchComponentExample(camelName);

const componentProps = reactive({ ...(props.props || {}) });

const { parentSlug } = useComponentName(props);

const isCollapsed = computed(() => {
  if (parentSlug === 'akar') {
    return true;
  }

  return props.collapse;
});

const code = computed(() => {
  let code = '';

  if (isCollapsed.value) {
    code += `::code-collapse
`;
  }

  code += `\`\`\`vue ${props.preview ? '' : ` [${data.pascalName}.vue]`}${props.highlights?.length ? `{${props.highlights.join('-')}}` : ''}
${data?.code ?? ''}
\`\`\``;

  if (isCollapsed.value) {
    code += `
::`;
  }

  return code;
});

const { data: ast } = await useAsyncData(
  `component-example-${camelName}${hash({ props: componentProps, collapse: isCollapsed.value })}`,
  async () => {
    if (!props.prettier) {
      return parseMarkdown(code.value);
    }

    let formatted = '';
    try {
      formatted = await $prettier.format(code.value, {
        trailingComma: 'none',
        semi: false,
        singleQuote: true,
        printWidth: 100,
      });
    } catch {
      formatted = code.value;
    }

    return parseMarkdown(formatted);
  },
  { watch: [code] },
);

const optionsValues = ref(
  props.options?.reduce((acc, option) => {
    if (option.name) {
      acc[option.alias || option.name] = option.default;
    }

    if (option.name.toLowerCase().endsWith('color') && option.items?.length) {
      option.items = option.items.map((item: any) => ({
        label: item,
        value: item,
        chip: { color: item },
      }));
    }

    return acc;
  }, {} as Record<string, any>) || {},
);

const urlSearchParams = computed(() => {
  const params = {
    ...optionsValues.value,
    ...componentProps,
  };

  if (!props.iframeMobile) {
    params.width = Math.round(width.value).toString();
  }

  return new URLSearchParams(params).toString();
});
</script>

<template>
  <div
    ref="el"
    class="my-5"
    :style="{ '--pohon-header-height': '4rem' }"
  >
    <template v-if="preview">
      <div
        class="border border-border-muted relative z-1"
        :class="[{
          'border-b-0 rounded-t-md': props.source,
          'rounded-md': !props.source,
          'overflow-hidden': props.overflowHidden,
        }]"
      >
        <div
          v-if="props.options?.length || !!slots.options"
          class="p-4 border-b border-border-muted flex gap-4"
        >
          <slot name="options" />

          <PFormField
            v-for="option in props.options"
            :key="option.name"
            :label="option.label"
            :name="option.name"
            size="sm"
            class="rounded-sm inline-flex ring ring-ring-accented"
            :pohon="{
              wrapper: 'bg-background-elevated/50 rounded-l-sm flex border-r border-border-accented',
              label: 'color-text-muted px-2 py-1.5',
              container: 'akar:mt-0',
            }"
          >
            <PSelectMenu
              v-if="option.items?.length"
              :model-value="getProp({ object: optionsValues, path: option.name })"
              :items="option.items"
              :search-input="false"
              :value-key="option.name.toLowerCase().endsWith('color') ? 'value' : undefined"
              color="neutral"
              variant="soft"
              class="rounded-sm rounded-l-none min-w-12"
              :multiple="option.multiple"
              :class="[option.name.toLowerCase().endsWith('color') && 'akar:pl-6']"
              :background="{ itemLeadingChip: 'size-2' }"
              @update:model-value="setProp({ object: optionsValues, path: option.name, value: $event })"
            >
              <template
                v-if="option.name.toLowerCase().endsWith('color')"
                #leading="{ modelValue, pohon }"
              >
                <PChip
                  inset
                  standalone
                  :color="(modelValue as any)"
                  :size="(pohon.itemLeadingChipSize() as PChipProps['size'])"
                  class="size-2"
                />
              </template>
            </PSelectMenu>

            <PInput
              v-else
              :model-value="getProp({ object: optionsValues, path: option.name })"
              color="neutral"
              variant="soft"
              :background="{ base: 'rounded-sm rounded-l-none min-w-12' }"
              @update:model-value="setProp({ object: optionsValues, path: option.name, value: $event })"
            />
          </PFormField>
        </div>

        <iframe
          v-if="iframe"
          v-bind="typeof iframe === 'object' ? iframe : {}"
          :src="`/examples/${name}?${urlSearchParams}`"
          class="w-full relative"
          :class="[props.class, !iframeMobile && 'lg:(left-1/2 -translate-x-1/2 w-[1024px])']"
        />
        <div
          v-else
          class="p-4 flex justify-center"
          :class="props.class"
        >
          <component
            :is="camelName"
            v-bind="{ ...componentProps, ...optionsValues }"
          />
        </div>
      </div>
    </template>

    <template v-if="props.source">
      <div
        v-if="!!slots.code"
        class="[&_div.my-5]:!mt-0 [&_pre]:!rounded-t-none"
      >
        <slot name="code" />
      </div>

      <MDCRenderer
        v-else-if="ast"
        :body="ast.body"
        :data="ast.data"
        class="[&_div.my-5]:!mt-0 [&_pre]:!rounded-t-none"
      />
    </template>
  </div>
</template>
