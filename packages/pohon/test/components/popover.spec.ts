import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Popover from '../../src/runtime/components/popover.vue';
import { renderEach } from '../component-render';

describe('Popover', () => {
  const props = { open: true, portal: false };

  renderEach(Popover, [
    // Props
    ['with open', { props }],
    ['with arrow', { props: { ...props, arrow: true } }],
    ['with class', { props: { ...props, class: 'shadow-xl' } }],
    ['with pohon', { props: { ...props, pohon: { content: 'shadow-xl' } } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
    ['with content slot', { props, slots: { content: () => 'Content slot' } }],
    ['with anchor slot', { props, slots: { anchor: () => 'Anchor slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Popover, {
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
        'aria-dialog-name': {
          enabled: false,
        },
      },
    })).toHaveNoViolations();
  });
});
