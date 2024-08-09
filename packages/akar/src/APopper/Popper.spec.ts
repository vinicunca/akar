import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

import APopper from './_APopper.vue';

describe('give default Popper', async () => {
  let wrapper: VueWrapper<InstanceType<typeof APopper>>;
  globalThis.ResizeObserver = class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  };

  beforeEach(() => {
    wrapper = mount(APopper, { attachTo: document.body });
  });

  it('should render correctly and match snapshot', async () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
