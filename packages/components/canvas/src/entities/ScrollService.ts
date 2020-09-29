import { SCROLL_PADDING } from '../constants';

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
      background: bg,
      contentRect,
      stageSize,
    } = this.service.getData();

    const { horizonal: horizontalPadding, vertical: verticalPadding } = this.service.getPadding();

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar || !bg) {
      return;
    }

    const minX = -(
      (contentRect.width + contentRect.x) * layer.scaleX() +
      horizontalPadding -
      stageSize.width
    );
    const maxX = -contentRect.x * layer.scaleX() + stageSize.width;

    const x = Math.max(minX, Math.min(layer.x() - dx, maxX));

    const minY = -(
      (contentRect.height + contentRect.y) * layer.scaleY() +
      verticalPadding -
      stageSize.height
    );
    const maxY = -contentRect.y * layer.scaleY() + stageSize.height;

    const y = Math.max(minY, Math.min(layer.y() - dy, maxY));
    layer.position({ x, y });

    this.scrollbarService.updateScrollbars();

    stage.batchDraw();
  }

  public scrollVertical(): void {
    const { verticalScrollbar, layer, stageSize, contentRect } = this.service.getData();

    const { vertical: verticalPadding } = this.service.getPadding();

    if (!verticalScrollbar || !layer) {
      return;
    }

    const availableHeight =
      contentRect.height * layer.scaleY() + 2 * verticalPadding - stageSize.height;
    const availableScrollHeight =
      stageSize.height - 2 * SCROLL_PADDING - verticalScrollbar.height();
    const delta = (verticalScrollbar.y() - SCROLL_PADDING) / availableScrollHeight;

    const y = -contentRect.y * layer.scaleY() + verticalPadding - availableHeight * delta;

    layer.y(y);
    layer.batchDraw();
  }

  public scrollHorizontal(): void {
    const { horizontalScrollbar, layer, stageSize, contentRect } = this.service.getData();

    const { horizonal: horizontalPadding } = this.service.getPadding();

    if (!horizontalScrollbar || !layer) {
      return;
    }

    const availableWidth =
      contentRect.width * layer.scaleX() + 2 * horizontalPadding - stageSize.width;
    const availableScrollWidth = stageSize.width - 2 * SCROLL_PADDING - horizontalScrollbar.width();
    const delta = (horizontalScrollbar.x() - SCROLL_PADDING) / availableScrollWidth;

    const x = -contentRect.x * layer.scaleX() + horizontalPadding - availableWidth * delta;

    layer.x(x);
    layer.batchDraw();
  }
}
