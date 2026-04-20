declare module '#build/pohon/*' {
  const theme: Record<string, any>;
  export default theme;
}

declare module '#build/pohon-image-component' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent | string;
  export default component;
}
