import { metrics } from '../metrics';
import { getBgRect, getContentPadding } from '../utils';

import { CanvasService, CanvasServiceData } from './CanvasService';
import { screenSaverService } from './ScreenSaverService';
import { ScrollbarService } from './ScrollbarService';

export type ZoomProps = {
  source: string;
  scale?: number;
  delta?: number;
};

export class ZoomService {
  private service: CanvasService;

  private scrollbarService: ScrollbarService;

  public constructor(data: CanvasServiceData) {
    this.service = new CanvasService(data);
    this.scrollbarService = new ScrollbarService(data);
  }

  public zoom(props: ZoomProps): number {
    const {
      stage,
      layer,
      horizontalScrollbar,
      verticalScrollbar,
      background,
      stageSize,
      contentRect,
    } = this.service.getData();

    const { source, scale, delta } = props;

    if (
      !stage ||
      !layer ||
      !horizontalScrollbar ||
      !verticalScrollbar ||
      !background ||
      delta === 0
    ) {
      return 0;
    }

    const oldScale = layer.scaleX();

    let newScale;
    let pointer;

    if (source === 'event' && delta) {
      const pointerPosition = stage.getPointerPosition();

      if (!pointerPosition) {
        return 0;
      }

      newScale = delta < 0 ? oldScale * metrics.zoom.ratio : oldScale / metrics.zoom.ratio;
      pointer = pointerPosition;
    } else {
      newScale = Number(scale);
      pointer = {
        x: stageSize.width / 2,
        y: stageSize.height / 2,
      };
    }

    newScale = Math.min(metrics.zoom.max, Math.max(metrics.zoom.min, newScale));

    const mousePointTo = {
      x: (pointer.x - layer.x()) / oldScale,
      y: (pointer.y - layer.y()) / oldScale,
    };

    const newPosition = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    layer.scale({ x: newScale, y: newScale });
    layer.position(newPosition);

    this.scrollbarService.updateScrollbars();

    const bgRect = getBgRect({
      contentRect,
      contentPadding: getContentPadding(stageSize),
      scale: newScale,
    });

    background.setAttrs(bgRect);

    screenSaverService.setCanvasScale(newScale);
    screenSaverService.setCanvasScrollPosition(newPosition);

    stage.batchDraw();

    return newScale;
  }
}
