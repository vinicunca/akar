import { describe, expect, it } from 'vitest';

import { useStateMachine } from './use-state-machine';

describe('useStateMachine', () => {
  const { state, dispatch } = useStateMachine('hidden', {
    hidden: {
      SCROLL: 'scrolling',
    },
    scrolling: {
      SCROLL_END: 'idle',
    },
    idle: {
      HIDE: 'hidden',
      SCROLL: 'scrolling',
    },
  });

  it('should set the initial state', () => {
    expect(state.value).toBe('hidden');
  });

  it('should change when dispatching an action', () => {
    dispatch('SCROLL');
    expect(state.value).toBe('scrolling');
    dispatch('SCROLL_END');
    expect(state.value).toBe('idle');
  });

  it('should go to default state if event is not found', () => {
    // @ts-expect-error testing unknown event
    dispatch('GA_ADA');
    expect(state.value).toBe('idle');
  });
});
