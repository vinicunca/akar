import theme from '#build/pohon/avatar-group';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import AvatarGroup from '../../src/runtime/components/avatar-group.vue';
import Avatar from '../../src/runtime/components/avatar.vue';
import { renderEach } from '../component-render';

const AvatarGroupWrapper = defineComponent({
  components: {
    PAvatar: Avatar,
    PAvatarGroup: AvatarGroup,
  },
  template: `<PAvatarGroup>
  <PAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
  <PAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
  <PAvatar src="https://github.com/noook.png" alt="Neil Richter" />
</PAvatarGroup>`,
});

describe('AvatarGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any;

  renderEach(AvatarGroupWrapper, [
    // Props
    ['with max', { props: { max: 2 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'justify-start' } }],
    ['with pohon', { props: { pohon: { base: 'rounded-lg' } } }],
    // Slots
    ['with default slot', {}],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(AvatarGroupWrapper, {
      props: {
        max: 2,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
