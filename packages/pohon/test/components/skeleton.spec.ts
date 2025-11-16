import type { PSkeletonProps } from '../../src/runtime/components/skeleton.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Skeleton from '../../src/runtime/components/skeleton.vue';
import ComponentRender from '../component-render';

describe('Skeleton', () => {
  it.each([
    // Props
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'rounded-full size-12' } }],
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: PSkeletonProps }) => {
    const html = await ComponentRender(nameOrHtml, options, Skeleton);
    expect(html).toMatchSnapshot();
  });

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(Skeleton, {
      props: {
        class: 'h-4 w-32',
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
