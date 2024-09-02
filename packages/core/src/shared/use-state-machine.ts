import { ref } from 'vue';

interface Machine<S> {
  [key: string]: { [key: string]: S };
}

type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never;

export function useStateMachine<M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>,

) {
  const state = ref(initialState);

  function dispatch(event: MachineEvent<M>) {
    state.value = reducer(event);
  }

  function reducer(event: MachineEvent<M>) {
    // @ts-expect-error  state.value is keyof M
    const nextState = machine[state.value][event];

    return nextState ?? state.value;
  }

  return {
    state,
    dispatch,
  };
}
