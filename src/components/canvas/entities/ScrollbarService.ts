import { createScrollbarPointGetter } from '../utils';

import { CanvasService, CanvasServiceData } from './CanvasService';

export class ScrollbarService {
  private service: CanvasService;

  constructor(data: CanvasServiceData) {
    this.service = new CanvasService(data);
  }

  public getPoints(): { hx: number; vy: number } {
    const { layer, horizontalScrollbar, verticalScrollbar, stageSize, contentRect } =
      this.service.getData();

    const getScrollbarPoint = createScrollbarPointGetter({
      layer,
      stageSize,
      contentRect,
    });

    const hx = getScrollbarPoint({ type: 'horizontal', scrollbar: horizontalScrollbar });
    const vy = getScrollbarPoint({ type: 'vertical', scrollbar: verticalScrollbar });

    return { hx, vy };
  }

  public updateScrollbars(): void {
    const { horizontalScrollbar, verticalScrollbar } = this.service.getData();

    if (!horizontalScrollbar || !verticalScrollbar) {
      return;
    }

    const { hx, vy } = this.getPoints();

    horizontalScrollbar.x(hx);
    verticalScrollbar.y(vy);
  }
}
