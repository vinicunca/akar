// reference https://github.com/chakra-ui/zag/blob/main/packages/machines/pagination/src/pagination.utils.ts

import { isNumber, range } from '@vinicunca/perkakas';

type Pages = Array<{ type: 'ellipsis' } | { type: 'page'; value: number }>;

export function transform(items: Array<number | string>): Pages {
  return items.map((value) => {
    if (isNumber(value)) {
      return { type: 'page', value };
    }

    return { type: 'ellipsis' };
  });
}

function range_(start: number, end: number): Array<number> {
  /**
   * Perkakas's range is inclusive, so we need to add 1 to the end
   */
  return range(start, end + 1);
}

const ELLIPSIS = 'ellipsis';

export function getRange(
  { currentPage, pageCount, siblingCount, showEdges }:
  {
    currentPage: number;
    pageCount: number;
    showEdges: boolean;
    siblingCount: number;
  },
) {
  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

  if (showEdges) {
    /**
     * `2 * siblingCount + 5` explanation:
     * 2 * siblingCount for left/right siblings
     * 5 for 2x left/right ellipsis, 2x first/last page + 1x current page
     *
     * For some page counts (e.g. totalPages: 8, siblingCount: 2),
     * calculated max page is higher than total pages,
     * so we need to take the minimum of both.
     */
    const totalPageNumbers = Math.min(2 * siblingCount + 5, pageCount);

    const itemCount = totalPageNumbers - 2; // 2 stands for one ellipsis and either first or last page

    const showLeftEllipsis
      // default condition
      = leftSiblingIndex > firstPageIndex + 2
      // if the current page is towards the end of the list
      && Math.abs(lastPageIndex - itemCount - firstPageIndex + 1) > 2
      // if the current page is towards the middle of the list
      && Math.abs(leftSiblingIndex - firstPageIndex) > 2;

    const showRightEllipsis
      // default condition
      = rightSiblingIndex < lastPageIndex - 2
      // if the current page is towards the start of the list
      && Math.abs(lastPageIndex - itemCount) > 2
      // if the current page is towards the middle of the list
      && Math.abs(lastPageIndex - rightSiblingIndex) > 2;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = range_(1, itemCount);

      return [...leftRange, ELLIPSIS, lastPageIndex];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = range_(lastPageIndex - itemCount + 1, lastPageIndex);

      return [firstPageIndex, ELLIPSIS, ...rightRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = range_(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, ELLIPSIS, ...middleRange, ELLIPSIS, lastPageIndex];
    }

    return range_(firstPageIndex, lastPageIndex);
  } else {
    const itemCount = siblingCount * 2 + 1;

    if (pageCount < itemCount) {
      return range_(1, lastPageIndex);
    } else if (currentPage <= (siblingCount + 1)) {
      return range_(firstPageIndex, itemCount);
    } else if ((pageCount - currentPage) <= siblingCount) {
      return range_(pageCount - itemCount + 1, lastPageIndex);
    } else {
      return range_(leftSiblingIndex, rightSiblingIndex);
    }
  }
}
