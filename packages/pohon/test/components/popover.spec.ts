import type { PPopoverProps, PPopoverSlots } from '../../src/runtime/components/popover.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PPopover from '../../src/runtime/components/popover.vue';
import ComponentRender from '../component-render';

describe('PPopover', () => {
  const props = { open: true, portal: false };

  it.each([
    // Props
    ['with open', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with class', { props: { ...props, class: 'shadow-xl' } }],
    ['with ui', { props: { ...props, pohon: { content: 'shadow-xl' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with anchor slot', { props, slots: { anchor: () => 'Anchor slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PPopoverProps; slots?: Partial<PPopoverSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, PPopover);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PPopover, {
      props: {
        open: true,
        portal: false,
        arrow: true,

      },
      slots: {
        default: () => 'Default Slot',
        content: () => 'Content Slot',
        anchor: () => 'Anchor Slot',
      },
    });

    expect(await axe(wrapper.element, {
      rules: {
        // "ARIA dialog and alertdialog nodes should have an accessible name (aria-dialog-name)"

        // Fix any of the following:
        //   aria-label attribute does not exist or is empty
        //   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
        //   Element has no title attribute
        'aria-dialog-name': { enabled: false },
      },
    })).toHaveNoViolations();
  });
});
