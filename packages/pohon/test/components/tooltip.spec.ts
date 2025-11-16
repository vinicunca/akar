import type { PTooltipProps, PTooltipSlots } from '../../src/runtime/components/tooltip.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { ATooltipProvider } from 'akar';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import Tooltip from '../../src/runtime/components/tooltip.vue';
import ComponentRender from '../component-render';

const TooltipWrapper = defineComponent({
  components: {
    ATooltipProvider,
    PTooltip: Tooltip,
  },
  inheritAttrs: false,
  template: `<ATooltipProvider>
  <PTooltip v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </PTooltip>
</ATooltipProvider>`,
});

describe('tooltip', () => {
  const props = { text: 'Tooltip', open: true, portal: false };

  it.each([
    // Props
    ['with text', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with kbds', { props: { ...props, kbds: ['meta', 'K'] } }],
    ['with class', { props: { ...props, class: 'text-sm' } }],
    ['with ui', { props: { ...props, pohon: { content: 'text-sm' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PTooltipProps; slots?: Partial<PTooltipSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, TooltipWrapper);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(TooltipWrapper, {
      props: {
        ...props,
        arrow: true,
        kbds: ['meta', 'K'],
      },
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
