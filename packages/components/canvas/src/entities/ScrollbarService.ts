import { createScrollbarPointGetter } from '../utils';

import { CanvasService, CanvasServiceData } from './CanvasService';

export class ScrollbarService {
  private service: CanvasService;

  constructor(data: CanvasServiceData) {
    this.service = new CanvasService(data);
  }

  public getPoints(): { vertical: number; horizontal: number } {
    const {
      layer,
      stageSize,
      contentRect,
      verticalScrollbar,
      horizontalScrollbar,
    } = this.service.getData();

    const getScrollbarPoint = createScrollbarPointGetter({
      layer,
      stageSize,
      contentRect,
    });

    const vy = getScrollbarPoint({ type: 'vertical', scrollbar: verticalScrollbar });

    const hx = getScrollbarPoint({ type: 'horizontal', scrollbar: horizontalScrollbar });

    return { vertical: vy, horizontal: hx };
  }

  public updateScrollbars(): void {
    const { verticalScrollbar, horizontalScrollbar } = this.service.getData();

    if (!verticalScrollbar || !horizontalScrollbar) {
      return;
    }

    const points = this.getPoints();
    verticalScrollbar.y(points.vertical);
    horizontalScrollbar.x(points.horizontal);
  }
}
