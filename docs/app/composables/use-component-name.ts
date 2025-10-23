import { useRoute } from '#app';
import { toPascalCase } from '@vinicunca/perkakas';

export function useComponentName(props: {
  prefix?: string;
  prose?: boolean;
}) {
  const route = useRoute();
  const slug = route.params.slug?.at(-1) as string;
  const pascalName = `P${toPascalCase(slug)}`;
  const componentName = props.prose ? `Prose${pascalName}` : pascalName;

  return { componentName, slug };
}
