import { createError, defineCachedEventHandler, getValidatedQuery } from '#imports';
import { queryCollection } from '@nuxt/content/server';
import { capitalize, toCamelCase, toKebabCase } from '@vinicunca/perkakas';
import { z } from 'zod';
import { normalizeComponentName } from '~~/server/utils/normalize-component-name';

const querySchema = z.object({
  componentName: z.string(),
});

export default defineCachedEventHandler(async (event) => {
  const { componentName } = await getValidatedQuery(event, querySchema.parse);

  // Normalize component name by removing "P" or "p-" prefix if present
  const normalizedName = normalizeComponentName(componentName);

  // Convert to kebab-case for path lookup
  const kebabName = toKebabCase(normalizedName);

  // Get basic component info without documentation content
  const page = await queryCollection(event, 'docs')
    .where('path', 'LIKE', `%/components/${kebabName}`)
    .where('extension', '=', 'md')
    .select('id', 'title', 'description', 'path', 'category', 'links')
    .first();

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: `Component '${componentName}' not found in documentation`,
    });
  }

  // Use the same approach as the docs components for metadata
  const camelName = toCamelCase(normalizedName);
  const componentMetaName = `P${capitalize(camelName)}`;

  const metadata = await $fetch(`/api/component-meta/${componentMetaName}.json`);

  return {
    name: normalizedName,
    title: page.title,
    description: page.description,
    category: page.category,
    documentation_url: `https://akar.vinicunca.dev${page.path}`,
    metadata: {
      pascalName: metadata.pascalName,
      kebabName: metadata.kebabName,
      props: metadata.meta.props,
      slots: metadata.meta.slots,
      emits: metadata.meta.emits,
    },
  };
}, {
  name: 'mcp-get-component-metadata-only',
  maxAge: 1800, // 30 minutes
});
