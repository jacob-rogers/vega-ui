import Konva from 'konva';

import { ContentRect, Size } from '../types';

export type CanvasServiceData = {
  stage: Konva.Stage | null;
  layer: Konva.Layer | null;
  horizontalScrollbar: Konva.Rect | null;
  verticalScrollbar: Konva.Rect | null;
  background: Konva.Rect | null;
  contentRect: ContentRect;
  stageSize: Size;
};

export class CanvasService {
  protected stage: Konva.Stage | null;

  protected layer: Konva.Layer | null;

  protected horizontalScrollbar: Konva.Rect | null;

  protected verticalScrollbar: Konva.Rect | null;

  protected background: Konva.Rect | null;

  protected contentRect: ContentRect;

  protected stageSize: Size;

  protected readonly PADDING_HORIZONTAL: number;

  protected readonly PADDING_VERTICAL: number;

  public constructor(data: CanvasServiceData) {
    const {
      stage,
      layer,
      horizontalScrollbar,
      verticalScrollbar,
      background,
      contentRect,
      stageSize,
    } = data;
    this.stage = stage;
    this.layer = layer;
    this.horizontalScrollbar = horizontalScrollbar;
    this.verticalScrollbar = verticalScrollbar;
    this.background = background;
    this.contentRect = contentRect;
    this.stageSize = stageSize;
    this.PADDING_HORIZONTAL = stageSize.width;
    this.PADDING_VERTICAL = stageSize.height;
  }
}
