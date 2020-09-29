import { SCROLL_RATIO } from '../constants';
import { getBgRect } from '../utils';

import { CanvasService, CanvasServiceData } from './CanvasService';
import { ScrollbarService } from './ScrollbarService';

export class ZoomService {
  private service: CanvasService;

  private scrollbarService: ScrollbarService;

  public constructor(data: CanvasServiceData) {
    this.service = new CanvasService(data);
    this.scrollbarService = new ScrollbarService(data);
  }

  public zoom(dy: number): void {
    const {
      stage,
      layer,
      horizontalScrollbar,
      verticalScrollbar,
      background: bg,
      contentRect,
      stageSize,
    } = this.service.getData();

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar || !bg) {
      return;
    }

    const oldScale = layer.scaleX();

    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - layer.x()) / oldScale,
      y: (pointer.y - layer.y()) / oldScale,
    };

    const newScale = dy < 0 ? oldScale * SCROLL_RATIO : oldScale / SCROLL_RATIO;

    layer.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    layer.position(newPos);

    this.scrollbarService.updateScrollbars();

    const bgSize = getBgRect({ contentRect, stageSize, scaleX: layer.scaleX() });

    bg.x(bgSize.x);
    bg.y(bgSize.y);
    bg.width(bgSize.width);
    bg.height(bgSize.height);

    stage.batchDraw();
  }
}
