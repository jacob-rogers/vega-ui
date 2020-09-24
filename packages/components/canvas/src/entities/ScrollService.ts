import { SCROLL_PADDING } from '../constants';
import { getScrollbarPointCurry } from '../utils';

import { CanvasService } from './CanvasService';

export class ScrollService extends CanvasService {
  public scroll(dx: number, dy: number): void {
    const {
      stage,
      layer,
      horizontalScrollbar,
      verticalScrollbar,
      background: bg,
      contentRect,
      stageSize,
    } = this;

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar || !bg) {
      return;
    }

    const minX = -(
      (contentRect.width + contentRect.x) * layer.scaleX() +
      this.PADDING_HORIZONTAL -
      stageSize.width
    );
    const maxX = -contentRect.x * layer.scaleX() + stageSize.width;

    const x = Math.max(minX, Math.min(layer.x() - dx, maxX));

    const minY = -(
      (contentRect.height + contentRect.y) * layer.scaleY() +
      this.PADDING_VERTICAL -
      stageSize.height
    );
    const maxY = -contentRect.y * layer.scaleY() + stageSize.height;

    const y = Math.max(minY, Math.min(layer.y() - dy, maxY));
    layer.position({ x, y });

    const getScrollbarPoint = getScrollbarPointCurry({
      layer: this.layer,
      stageSize,
      contentRect,
    });

    const vy = getScrollbarPoint({ type: 'vertical', scrollbar: verticalScrollbar });
    verticalScrollbar.y(vy);

    const hx = getScrollbarPoint({ type: 'horizontal', scrollbar: horizontalScrollbar });

    horizontalScrollbar.x(hx);

    stage.batchDraw();
  }

  public dragVerticalScrollbar(): void {
    const { verticalScrollbar, layer, stageSize, contentRect } = this;

    if (!verticalScrollbar || !layer) {
      return;
    }

    const availableHeight =
      contentRect.height * layer.scaleY() + 2 * this.PADDING_VERTICAL - stageSize.height;
    const availableScrollHeight =
      stageSize.height - 2 * SCROLL_PADDING - verticalScrollbar.height();
    const delta = (verticalScrollbar.y() - SCROLL_PADDING) / availableScrollHeight;

    const y = -contentRect.y * layer.scaleY() + this.PADDING_VERTICAL - availableHeight * delta;

    layer.y(y);
    layer.batchDraw();
  }

  public dragHorizontalScrollbar(): void {
    const { horizontalScrollbar, layer, contentRect, stageSize } = this;

    if (!horizontalScrollbar || !layer) {
      return;
    }

    const availableWidth =
      contentRect.width * layer.scaleX() + 2 * this.PADDING_HORIZONTAL - stageSize.width;
    const availableScrollWidth = stageSize.width - 2 * SCROLL_PADDING - horizontalScrollbar.width();
    const delta = (horizontalScrollbar.x() - SCROLL_PADDING) / availableScrollWidth;

    const x = -contentRect.x * layer.scaleX() + this.PADDING_HORIZONTAL - availableWidth * delta;

    layer.x(x);
    layer.batchDraw();
  }
}
