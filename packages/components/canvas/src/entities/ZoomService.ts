import { SCROLL_RATIO } from '../constants';
import { getBgSize, getScrollbarPointCurry } from '../utils';

import { CanvasService } from './CanvasService';

export class ZoomService extends CanvasService {
  public zoom(dy: number): void {
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

    const getScrollbarPoint = getScrollbarPointCurry({
      layer: this.layer,
      stageSize,
      contentRect,
    });

    const vy = getScrollbarPoint({ type: 'vertical', scrollbar: verticalScrollbar });
    verticalScrollbar.y(vy);

    const hx = getScrollbarPoint({ type: 'horizontal', scrollbar: horizontalScrollbar });
    horizontalScrollbar.x(hx);

    const bgSize = getBgSize({ contentRect, stageSize, scaleX: layer.scaleX() });

    bg.x(bgSize.x);
    bg.y(bgSize.y);
    bg.width(bgSize.width);
    bg.height(bgSize.height);

    stage.batchDraw();
  }
}
