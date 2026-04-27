import type { FormInputEvents } from '../../src/module';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import theme from '#build/pohon/input';
import Select from '../../src/runtime/components/Select.vue';
import { renderEach } from '../component-render';
import { renderForm } from '../utils/form';
import { expectEmitPayloadType } from '../utils/types';

describe('Select', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const variants = Object.keys(theme.variants.variant) as any;

  const items = [{
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-lucide-circle-help',
  }, {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus',
  }, {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up',
  }, {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check',
  }, {
    label: 'Canceled',
    value: 'canceled',
    icon: 'i-lucide-circle-x',
  }];

  const itemsWithDescription = [...items.map((item) => ({ ...item, description: 'Description' }))];

  const props = { open: true, portal: false, items };

  renderEach(Select, [
    // Props
    ['with items', { props }],
  ]);
});
