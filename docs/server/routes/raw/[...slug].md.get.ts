import { createError, eventHandler, getRouterParams, setHeader } from '#imports';
import { queryCollection } from '@nuxt/content/server';
import { stringify } from 'minimark/stringify';
import { withLeadingSlash } from 'ufo';
import { transformMdc } from '~~/server/utils/transform-mdc';

export default eventHandler(async (event) => {
  const params = getRouterParams(event)['slug.md'];

  const parent = params.split('/')[0] as 'akar' | 'pohon';

  if (!params?.endsWith('.md')) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  const path = withLeadingSlash(params.replace('.md', ''));
  const page = await queryCollection(event, parent).path(path).first();
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
  }

  // Add title and description to the top of the page if missing
  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description]);
    page.body.value.unshift(['h1', {}, page.title]);
  }

  const transformedPage = transformMdc({
    title: page.title,
    body: page.body,
  });

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');

  return stringify({ ...transformedPage.body, type: 'minimark' }, { format: 'markdown/html' });
});
