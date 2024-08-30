import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import ScrollArea from './story/_scroll-area.vue';

describe('given default ScrollArea', () => {
  let wrapper: VueWrapper<InstanceType<typeof ScrollArea>>;

  beforeEach(() => {
    wrapper = mount(ScrollArea, { attachTo: document.body });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 500 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 2000 });
  });

  it('should pass axe accessibility tests', async () => {
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
