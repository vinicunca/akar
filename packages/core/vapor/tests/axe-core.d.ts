// `axe-core` is a dependency of vitest-axe, aliased by vitest.vapor.config.ts; only `run` is used.
declare module 'axe-core' {
  interface Result { id: string; nodes: Array<{ target: Array<string> }> }
  const axe: { run: (context: Element, options?: Record<string, unknown>) => Promise<{ violations: Array<Result> }> };
  export default axe;
}
