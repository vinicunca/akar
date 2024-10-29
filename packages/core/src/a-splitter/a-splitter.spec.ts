import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { nextTick } from 'vue';

import ASplitter from './story/_a-splitter.vue';

// Simple a11y test for now
describe('test splitter functionalities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should pass axe accessibility tests', async () => {
    const wrapper = mount(ASplitter);
    await nextTick();
    expect(await axe(wrapper.element, {
      rules: {
        'label': { enabled: false },
        'nested-interactive': { enabled: false },
      },
    })).toHaveNoViolations();
  });
});
