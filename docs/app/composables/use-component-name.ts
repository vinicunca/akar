import { useRoute } from '#app';
import { toPascalCase } from '@vinicunca/perkakas';

export function useComponentName(props: {
  prose?: boolean;
  [key: string]: any;
}) {
  const route = useRoute();
  const slug = props.slug ?? route.params.slug?.at(-1) as string;
  const parentSlug = route.params.slug?.[0] as string;
  const pascalName = toPascalCase(slug);
  const componentName = props.prose ? `Prose${pascalName}` : `P${pascalName}`;

  return { componentName, slug, parentSlug };
}
