import Konva from 'konva';

import { GRID_BLOCK_SIZE, SCROLL_PADDING } from './constants';
import { ContentRect, Size } from './types';

type ViewData = {
  layer: Konva.Layer | null;
  stageSize: Size;
  contentRect: ContentRect;
};

export type ScrollbarData = {
  scrollbar: Konva.Rect | null;
  type: 'horizontal' | 'vertical';
};

type getBgRectParams = Pick<ViewData, 'stageSize' | 'contentRect'> & {
  scaleX?: number;
};

type ScrollbarPointsParams = ViewData & Pick<ScrollbarData, 'scrollbar'>;

type ScrollbarPointsGetter = (data: ScrollbarData) => number;

export const getContentRect = (
  elements: Konva.Node[],
  minWidth: number,
  minHeight: number,
): ContentRect => {
  const rect = {
    x: 0,
    y: 0,
    width: minWidth,
    height: minHeight,
  };

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    const elementXO = element.x();
    const elementY0 = element.y();
    const elementX1 = element.x() + element.width();
    const elementY1 = element.y() + element.height();

    /*

    x0, y0 ----- x1, y0
    |                 |
    |                 |
    |                 |
    x0, y1 ----- x1, y1

    */

    const rectX0 = rect.x;
    const rectY0 = rect.y;
    const rectX1 = rect.x + rect.width;
    const rectY1 = rect.y + rect.height;

    if (elementXO < rectX0) {
      rect.x = elementXO;
      rect.width = rectX1 - elementXO;
    }

    if (elementY0 < rectY0) {
      rect.y = elementY0;
      rect.height = rectY1 - elementY0;
    }

    if (elementX1 > rectX1) {
      rect.width = elementX1 - rectX0;
    }

    if (elementY1 > rectY1) {
      rect.height = elementY1 - rectY0;
    }
  }

  return rect;
};

export const getBgRect = (params: getBgRectParams): ContentRect => {
  const { stageSize, scaleX = 0, contentRect } = params;
  const { width: PADDING_HORIZONTAL, height: PADDING_VERTICAL } = stageSize;

  if (!scaleX) {
    return {
      x: contentRect.x - PADDING_HORIZONTAL,
      y: contentRect.y - PADDING_VERTICAL,
      width: contentRect.width + 2 * PADDING_HORIZONTAL,
      height: contentRect.height + 2 * PADDING_VERTICAL,
    };
  }

  const scale = scaleX;

  const x0 = contentRect.x - PADDING_HORIZONTAL * (1 / scale);
  const y0 = contentRect.y - PADDING_VERTICAL * (1 / scale);
  const width = contentRect.width + 2 * PADDING_HORIZONTAL * (1 / scale);
  const height = contentRect.height + 2 * PADDING_VERTICAL * (1 / scale);
  const x1 = x0 + width;
  const y1 = y0 + height;

  const bgRect = {
    x: x0,
    y: y0,
    width,
    height,
  };

  const intX0 = Math.trunc(x0 / GRID_BLOCK_SIZE);
  const intY0 = Math.trunc(y0 / GRID_BLOCK_SIZE);
  const intX1 = Math.trunc(x1 / GRID_BLOCK_SIZE);
  const intY1 = Math.trunc(y1 / GRID_BLOCK_SIZE);

  if (bgRect.x % GRID_BLOCK_SIZE < 0) {
    bgRect.x = GRID_BLOCK_SIZE * (intX0 - 1);
  }

  if (bgRect.x % GRID_BLOCK_SIZE > 0) {
    bgRect.x = GRID_BLOCK_SIZE * intX0;
  }

  if (bgRect.y % GRID_BLOCK_SIZE < 0) {
    bgRect.y = GRID_BLOCK_SIZE * (intY0 - 1);
  }

  if (bgRect.y % GRID_BLOCK_SIZE > 0) {
    bgRect.y = GRID_BLOCK_SIZE * intY0;
  }

  //

  if (x1 % GRID_BLOCK_SIZE < 0) {
    bgRect.width = GRID_BLOCK_SIZE * intX1 - bgRect.x;
  }

  if (x1 % GRID_BLOCK_SIZE > 0) {
    bgRect.width = GRID_BLOCK_SIZE * (intX1 + 1) - bgRect.x;
  }

  if (y1 % GRID_BLOCK_SIZE < 0) {
    bgRect.height = GRID_BLOCK_SIZE * intY1 - bgRect.y;
  }

  if (y1 % GRID_BLOCK_SIZE > 0) {
    bgRect.height = GRID_BLOCK_SIZE * (intY1 + 1) - bgRect.y;
  }

  return bgRect;
};

const getHorizontalScrollbarX = (params: ScrollbarPointsParams): number => {
  const { layer, stageSize, scrollbar, contentRect } = params;
  if (!layer || !scrollbar) {
    return 0;
  }
  const maxX = -contentRect.x * layer.scaleX() + stageSize.width;
  const availableWidth = contentRect.width * layer.scaleX() + 2 * stageSize.width - stageSize.width;
  const availableScrollWidth = stageSize.width - 2 * SCROLL_PADDING - scrollbar.width();

  const hx = ((maxX - layer.x()) / availableWidth) * availableScrollWidth + SCROLL_PADDING;

  return hx;
};

const getVerticalScrollbarY = (params: ScrollbarPointsParams): number => {
  const { layer, stageSize, scrollbar, contentRect } = params;
  if (!layer || !scrollbar) {
    return 0;
  }
  const maxY = -contentRect.y * layer.scaleY() + stageSize.height;
  const availableHeight =
    contentRect.height * layer.scaleY() + 2 * stageSize.height - stageSize.height;
  const availableScrollHeight = stageSize.height - 2 * SCROLL_PADDING - scrollbar.height();

  const vy = ((maxY - layer.y()) / availableHeight) * availableScrollHeight + SCROLL_PADDING;

  return vy;
};

export const createScrollbarPointGetter = (params: ViewData): ScrollbarPointsGetter => {
  return (data: ScrollbarData): number => {
    const scrollbarParams = {
      ...params,
      scrollbar: data.scrollbar,
    };

    if (data.type === 'horizontal') {
      return getHorizontalScrollbarX(scrollbarParams);
    }

    if (data.type === 'vertical') {
      return getVerticalScrollbarY(scrollbarParams);
    }

    return 0;
  };
};
