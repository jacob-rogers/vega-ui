import { metrics } from '../metrics';
import { getContentPadding } from '../utils';

import { CanvasService, CanvasServiceData } from './CanvasService';
import { ScrollbarService } from './ScrollbarService';

export class ScrollService {
  private service: CanvasService;

  private scrollbarService: ScrollbarService;

  public constructor(data: CanvasServiceData) {
    this.service = new CanvasService(data);
    this.scrollbarService = new ScrollbarService(data);
  }

  public scroll(dx: number, dy: number): void {
    const {
      stage,
      layer,
      horizontalScrollbar,
      verticalScrollbar,
      stageSize,
      contentRect,
    } = this.service.getData();

    const { horizontal: horizontalPadding, vertical: verticalPadding } = getContentPadding(
      stageSize,
    );

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar) {
      return;
    }

    const minX = -(
      (contentRect.x + contentRect.width) * layer.scaleX() +
      horizontalPadding -
      stageSize.width
    );
    const maxX = -contentRect.x * layer.scaleX() + horizontalPadding;

    const minY = -(
      (contentRect.y + contentRect.height) * layer.scaleY() +
      verticalPadding -
      stageSize.height
    );
    const maxY = -contentRect.y * layer.scaleY() + verticalPadding;

    const x = Math.max(minX, Math.min(layer.x() - dx, maxX));
    const y = Math.max(minY, Math.min(layer.y() - dy, maxY));

    layer.position({ x, y });

    this.scrollbarService.updateScrollbars();

    stage.batchDraw();
  }

  public scrollVertical(): void {
    const { layer, verticalScrollbar, stageSize, contentRect } = this.service.getData();
    const { vertical: verticalPadding } = getContentPadding(stageSize);

    if (!layer || !verticalScrollbar) {
      return;
    }

    const availableHeight =
      contentRect.height * layer.scaleY() + 2 * verticalPadding - stageSize.height;
    const availableScrollHeight =
      stageSize.height -
      (metrics.scrollbar.vertical.marginTop + metrics.scrollbar.vertical.marginBottom) -
      verticalScrollbar.height();
    const delta =
      (verticalScrollbar.y() - metrics.scrollbar.vertical.marginTop) / availableScrollHeight;

    const y = -contentRect.y * layer.scaleY() + verticalPadding - availableHeight * delta;

    layer.y(y);
    layer.batchDraw();
  }

  public scrollHorizontal(): void {
    const { layer, horizontalScrollbar, stageSize, contentRect } = this.service.getData();
    const { horizontal: horizontalPadding } = getContentPadding(stageSize);

    if (!layer || !horizontalScrollbar) {
      return;
    }

    const availableWidth =
      contentRect.width * layer.scaleX() + 2 * horizontalPadding - stageSize.width;
    const availableScrollWidth =
      stageSize.width -
      (metrics.scrollbar.horizontal.marginLeft + metrics.scrollbar.horizontal.marginRight) -
      horizontalScrollbar.width();
    const delta =
      (horizontalScrollbar.x() - metrics.scrollbar.horizontal.marginLeft) / availableScrollWidth;

    const x = -contentRect.x * layer.scaleX() + horizontalPadding - availableWidth * delta;

    layer.x(x);
    layer.batchDraw();
  }
}
