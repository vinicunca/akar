import type { Collections, PageCollectionItemBase } from '@nuxt/content';
import collections from '#content/manifest';
import { queryCollection } from '@nuxt/content/server';
import { createError, eventHandler, getRouterParams, setHeader } from 'h3';
import { stringify } from 'minimark/stringify';
import { withLeadingSlash } from 'ufo';
import { transformMdc } from '../../utils/transform-mdc';

export default eventHandler(async (event) => {
  const slug = getRouterParams(event)['slug.md'];
  if (!slug?.endsWith('.md')) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  let path = withLeadingSlash(slug.replace('.md', ''));
  if (path.endsWith('/index')) {
    path = path.substring(0, path.length - 6);
  }

  const _collections = Object.entries(collections as unknown as Record<string, { type: string }>)
    .filter(([_key, value]) => value.type === 'page')
    .map(([key]) => key) as Array<string>;

  let page: PageCollectionItemBase | null = null;
  for (const collection of _collections) {
    // eslint-disable-next-line no-await-in-loop
    page = await queryCollection(event, collection as keyof Collections).path(path).first() as PageCollectionItemBase | null;
    if (page) {
      break;
    }
  }

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  // Transform MDC components to standard elements for LLM consumption
  await transformMdc(event, page as any);

  // Add title and description to the top of the page if missing
  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description]);
    page.body.value.unshift(['h1', {}, page.title]);
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
  return stringify({ ...page.body, type: 'minimark' }, { format: 'markdown/html' });
});
