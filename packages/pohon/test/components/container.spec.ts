import type { PContainerProps, PContainerSlots } from '../../src/runtime/components/container.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Container from '../../src/runtime/components/container.vue';
import ComponentRender from '../component-render';

describe('Container', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'article' } }],
    ['with class', { props: { class: 'max-w-5xl' } }],
    // Slots
    ['with default slot', { slots: { default: () => 'Default slot' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PContainerProps; slots?: Partial<PContainerSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Container);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Container);

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
