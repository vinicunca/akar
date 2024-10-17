import { mount } from '@vue/test-utils';
import { expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import ASeparator from './ASeparator.vue';

it('should pass axe accessibility tests', async () => {
  const wrapper = mount(ASeparator);
  expect(await axe(wrapper.element)).toHaveNoViolations();

  const wrapperVertical = mount(ASeparator, {
    props: {
      orientation: 'vertical',
    },
  });
  expect(await axe(wrapperVertical.element)).toHaveNoViolations();
});
