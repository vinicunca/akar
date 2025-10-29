<!-- eslint-disable sonar/no-nested-template-literals -->
<script lang="ts" setup>
import type { PChipProps } from 'pohon-ui';
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import * as theme from '#build/pohon';
import { MDCRenderer, PChip, PFormField, PSelect } from '#components';
import { fetchComponentMeta, parseMarkdown } from '#imports';
import { getProp, setProp } from '#pohon/utils';
import { CalendarDate } from '@internationalized/date';
import { isBoolean, toCamelCase, toKebabCase, toPascalCase } from '@vinicunca/perkakas';
import json5 from 'json5';
import { hash } from 'ohash';
import { computed, defineAsyncComponent, reactive } from 'vue';

const props = defineProps<{
  prose?: boolean;
  prefix?: string;
  /** Override the slug taken from the route */
  slug?: string;
  class?: any;
  /** List of props to ignore in selection */
  ignore?: Array<string>;
  /** List of props to hide from code and selection */
  hide?: Array<string>;
  /** List of props to externalize in script setup */
  external?: Array<string>;
  /** The types of the externalized props */
  externalTypes?: Array<string>;
  /** List of props to use with `v-model` */
  model?: Array<string>;
  /** List of props to cast from code and selection */
  cast?: { [key: string]: string };
  /** List of items for each prop */
  items?: { [key: string]: Array<string> };
  props?: { [key: string]: any };
  slots?: { [key: string]: any };
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
   * A list of line numbers to highlight in the code block
   */
  highlights?: Array<number>;
  /**
   * Whether to add overflow-hidden to wrapper
   */
  overflowHidden?: boolean;
}>();

interface Cast {
  get: (args: any) => any;
  template: (args: any) => string;
}

type CastDateValue = [number, number, number];

const castMap: Record<string, Cast> = {
  'DateValue': {
    get: (args: CastDateValue) => new CalendarDate(...args),
    template: (value: CalendarDate) => {
      return value ? `new CalendarDate(${value.year}, ${value.month}, ${value.day})` : 'null';
    },
  },
  'DateValue[]': {
    get: (args: Array<CastDateValue>) => args.map((date) => new CalendarDate(...date)),
    template: (value: Array<CalendarDate>) => {
      return value
        // eslint-disable-next-line sonar/no-nested-template-literals
        ? `[${value.map((date) => `new CalendarDate(${date.year}, ${date.month}, ${date.day})`).join(', ')}]`
        : '[]';
    },
  },
  'DateRange': {
    get: (args: { start: CastDateValue; end: CastDateValue }) => ({ start: new CalendarDate(...args.start), end: new CalendarDate(...args.end) }),
    template: (value: { start: CalendarDate; end: CalendarDate }) => {
      if (!value.start || !value.end) {
        return '{ start: null, end: null }';
      }

      return `{ start: new CalendarDate(${value.start.year}, ${value.start.month}, ${value.start.day}), end: new CalendarDate(${value.end.year}, ${value.end.month}, ${value.end.day}) }`;
    },
  },
};

const route = useRoute();
const { $prettier } = useNuxtApp();

const camelName = toCamelCase(props.slug ?? route.path.split('/').pop() ?? '');
const name = `${props.prose ? 'Prose' : 'P'}${toPascalCase(camelName)}`;

const component = defineAsyncComponent(() => {
  if (props.prefix) {
    return import(`#pohon/components/${props.prefix}/${toKebabCase(camelName)}.vue`);
  }

  if (props.prose) {
    return import(`#pohon/components/prose/${toKebabCase(camelName)}.vue`);
  }

  return import(`#pohon/components/${toKebabCase(camelName)}.vue`);
});

const componentProps = reactive({
  ...Object.fromEntries(Object.entries(props.props || {}).map(([key, value]) => {
    const cast = props.cast?.[key];

    if (cast && !castMap[cast]) {
      throw new Error(`Unknown cast: ${cast}`);
    }

    return [key, cast ? castMap[cast]!.get(value) : value];
  })),
});

const componentEvents = reactive({
  ...Object.fromEntries((props.model || []).map((key) => [`onUpdate:${key}`, (event: any) => setComponentProp(key, event)])),
  ...(componentProps.modelValue ? { 'onUpdate:modelValue': (event: any) => setComponentProp('modelValue', event) } : {}),
});

function getComponentProp(name: string) {
  return getProp({ object: componentProps, path: name }) ?? undefined;
}

function setComponentProp(name: string, value: any) {
  setProp({ object: componentProps, path: name, value });
}

function mapKeys(obj: object, parentKey = ''): any {
  return Object.entries(obj || {}).flatMap(([key, value]: [string, any]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return mapKeys(value, key);
    }

    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    return !props.ignore?.includes(fullKey) && !props.hide?.includes(fullKey) ? fullKey : undefined;
  }).filter(Boolean);
}

const componentTheme = ((props.prose ? theme.prose : theme) as any)[camelName];
const meta = await fetchComponentMeta(name as any);

const options = computed(() => {
  const keys = mapKeys(props.props || {});

  return keys.map((key: string) => {
    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key);
    const propItems = getProp({ object: props.items, path: key, defaultValue: [] });
    let items;

    if (propItems.length) {
      items = propItems.map((item: any) => ({
        value: item,
        label: String(item),
        chip: key.toLowerCase().endsWith('color') ? { color: item } : undefined,
      }));
    } else if (prop?.type === 'boolean' || prop?.type === 'boolean | undefined') {
      items = [{ value: true, label: 'true' }, { value: false, label: 'false' }];
    } else {
      items = Object.keys(componentTheme?.variants?.[key] || {}).filter((variant) => {
        return variant !== 'true' && variant !== 'false';
      }).map((variant) => ({
        value: variant,
        label: variant,
        chip: key.toLowerCase().endsWith('color') ? { color: variant } : undefined,
      }));
    }

    return {
      name: key,
      label: key,
      type: props?.cast?.[key] ?? prop?.type,
      items,
    };
  });
});

const code = computed(() => {
  let code = '';

  if (props.prose) {
    code += `\`\`\`mdc
::${camelName}`;

    const proseProps = Object.entries(componentProps).map(([key, value]) => {
      if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
        return undefined;
      }

      return `${key}="${value}"`;
    }).filter(Boolean).join(' ');

    if (proseProps.length) {
      code += `{${proseProps}}`;
    }

    code += `
${props.slots?.default}
::
\`\`\``;

    return code;
  }

  if (props.collapse) {
    code += `::code-collapse
`;
  }

  code += `\`\`\`vue${props.highlights?.length ? ` {${props.highlights.join('-')}}` : ''}`;

  if (props.external?.length) {
    code += `
<script setup lang="ts">
`;
    if (props.externalTypes?.length) {
      const removeArrayBrackets = (type: string): string => type.endsWith('[]') ? removeArrayBrackets(type.slice(0, -2)) : type;

      const types = props.externalTypes.map((type) => removeArrayBrackets(type));
      code += `import type { ${types.join(', ')} } from 'pohon-ui'

`;
    }

    for (const [i, key] of props.external.entries()) {
      const cast = props.cast?.[key];
      const value = cast ? castMap[cast]!.template(componentProps[key]) : json5.stringify(componentProps[key], null, 2)?.replace(/,([ |\t\n]+[}|\]])/g, '$1');
      const type = props.externalTypes?.[i] ? `<${props.externalTypes[i]}>` : '';

      code += `const ${key === 'modelValue' ? 'value' : key} = ref${type}(${value})
`;
    }
    code += `<\/script>
`;
  }

  code += `
<template>
  <${name}`;
  for (const [key, value] of Object.entries(componentProps)) {
    if (key === 'modelValue') {
      code += ' v-model="value"';
      continue;
    }

    if (props.model?.includes(key)) {
      code += ` v-model:${key}="${key}"`;
      continue;
    }

    if (value === undefined || value === null || value === '' || props.hide?.includes(key)) {
      continue;
    }

    const prop = meta?.meta?.props?.find((prop: any) => prop.name === key);
    const propDefault = prop && (prop.default ?? prop.tags?.find((tag) => tag.name === 'defaultValue')?.text ?? componentTheme?.defaultVariants?.[prop.name]);
    const name = toKebabCase(key);

    if (isBoolean(value)) {
      if (value && (propDefault === 'true' || propDefault === '`true`' || propDefault === true)) {
        continue;
      }
      if (!value && (!propDefault || propDefault === 'false' || propDefault === '`false`' || propDefault === false)) {
        continue;
      }

      code += value ? ` ${name}` : ` :${name}="false"`;
    } else if (typeof value === 'object') {
      const parsedValue = !props.external?.includes(key) ? json5.stringify(value, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1') : key;

      code += ` :${name}="${parsedValue}"`;
    } else {
      if (propDefault === value) {
        continue;
      }

      code += ` ${typeof value === 'number' ? ':' : ''}${name}="${value}"`;
    }
  }

  if (props.slots) {
    code += '>';
    for (const [key, value] of Object.entries(props.slots)) {
      if (key === 'default') {
        code += props.slots.default;
      } else {
        code += `
  <template #${key}>
    ${value}
  </template>\n`;
      }
    }
    code += `${Object.keys(props.slots).length > 1 ? '\n' : ''}</${name}>`;
  } else {
    code += ' />';
  }
  code += `\n</template>
\`\`\`
`;

  if (props.collapse) {
    code += `
::`;
  }

  return code;
});

const { data: ast } = await useAsyncData(
  `component-code-${name}-${hash({ props: componentProps, slots: props.slots, external: props.external, externalTypes: props.externalTypes })}`,
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
</script>

<template>
  <div
    class="my-5"
    :style="{ '--pohon-header-height': '4rem' }"
  >
    <div class="relative">
      <div
        v-if="options.length"
        class="px-4 py-2.5 border border-b-0 border-border-muted rounded-t-md flex flex-wrap gap-2.5 items-center relative overflow-x-auto"
      >
        <template
          v-for="option in options"
          :key="option.name"
        >
          <PFormField
            :label="option.label"
            size="sm"
            class="rounded-sm inline-flex ring ring-ring-accented"
            :pohon="{
              wrapper: 'bg-background-elevated/50 rounded-l-sm flex border-r border-border-accented',
              label: 'color-text-muted px-2 py-1.5',
              container: 'akar:mt-0',
            }"
          >
            <PSelect
              v-if="option.items?.length"
              :model-value="getComponentProp(option.name)"
              :items="option.items"
              value-key="value"
              color="neutral"
              variant="soft"
              class="rounded-sm rounded-l-none min-w-12"
              :class="[option.name.toLowerCase().endsWith('color') && 'akar:pl-6']"
              :pohon="{ itemLeadingChip: 'size-2' }"
              @update:model-value="setComponentProp(option.name, $event)"
            >
              <template
                v-if="option.name.toLowerCase().endsWith('color')"
                #leading="{ modelValue, pohon }"
              >
                <PChip
                  v-if="modelValue"
                  inset
                  standalone
                  :color="(modelValue as any)"
                  :size="(pohon.itemLeadingChipSize() as PChipProps['size'])"
                  class="size-2"
                />
              </template>
            </PSelect>

            <PInput
              v-else
              :type="option.type?.includes('number') && typeof getComponentProp(option.name) === 'number' ? 'number' : 'text'"
              :model-value="getComponentProp(option.name)"
              color="neutral"
              variant="soft"
              :pohon="{ base: 'rounded-sm rounded-l-none min-w-12' }"
              @update:model-value="setComponentProp(option.name, $event)"
            />
          </PFormField>
        </template>
      </div>
    </div>

    <div
      v-if="component"
      class="p-4 border border-b-0 border-border-muted flex justify-center relative z-1"
      :class="[!options.length && 'rounded-t-md', props.class, { 'overflow-hidden': props.overflowHidden }]"
    >
      <component
        :is="component"
        v-bind="{ ...componentProps, ...componentEvents }"
      >
        <template
          v-for="slot in Object.keys(slots || {})"
          :key="slot"
          #[slot]
        >
          <slot
            :name="slot"
            mdc-unwrap="p"
          >
            {{ slots?.[slot] }}
          </slot>
        </template>
      </component>
    </div>

    <MDCRenderer
      v-if="ast"
      :body="ast.body"
      :data="ast.data"
      class="[&_div.my-5]:!mt-0 [&_pre]:!rounded-t-none"
    />
  </div>
</template>
