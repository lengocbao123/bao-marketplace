import { useControlled } from './use-controlled';

export interface UsePaginationOptions {
  /**
   *  Number of always visible pages at the beginning and end.
   *  @default 1
   */
  boundaryCount?: number;
  /**
   * The total number of pages.
   * @default 1
   */
  count?: number;
  /**
   * The page selected by default when the component is uncontrolled.
   * @default 1
   */
  defaultPage?: number;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton?: boolean;
  /**
   * Callback fired when the page is changed.
   * @param event
   * @param {number} page
   */

  onChange?: (event: any, page: number) => void;
  /**
   * The current page.
   */
  page?: number;
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton?: boolean;
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton?: boolean;
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
}

export const usePagination = (options?: UsePaginationOptions) => {
  const {
    boundaryCount = 1,
    count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1
  } = options || {};

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage
  });

  const handleClick = (event: any, value: number) => {
    if (!pageProp) {
      setPageState(value);
    }

    handleChange?.(event, value);
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  /**
   * Basic list of items to render
   * e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
   * @type {any[]}
   */
  const itemList = [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : [])
  ];

  /**
   * Map the button type to its page number
   * @param {string} type
   * @returns {any}
   */
  const buttonPage = (type: string) => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  /**
   * Convert the basic item list to PaginationItem props objects
   * @type {({"aria-current": string | undefined, onClick: (event: any) => void, disabled: boolean, page: number, type: string, selected: boolean} | {onClick: (event: any) => void, disabled: boolean, page: any, type: any, selected: boolean})[]}
   */
  const items = itemList.map((item) => {
    return typeof item === 'number'
      ? {
          onClick: (event: any) => {
            handleClick(event, item);
          },
          type: 'page',
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined
        }
      : {
          onClick: (event: any) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            handleClick(event, buttonPage(item)!);
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1))
        };
  });

  return { items };
};
