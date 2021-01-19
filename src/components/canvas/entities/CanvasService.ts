import Konva from 'konva';

import { RectParams, Size } from '../types';

export type CanvasServiceData = {
  stage: Konva.Stage | null;
  layer: Konva.Layer | null;
  horizontalScrollbar: Konva.Rect | null;
  verticalScrollbar: Konva.Rect | null;
  background: Konva.Rect | null;
  stageSize: Size;
  contentRect: RectParams;
};

// TODO: проверить, можно удалить класс

export class CanvasService {
  private data: CanvasServiceData;

  public constructor(data: CanvasServiceData) {
    this.data = data;
  }

  public getData(): CanvasServiceData {
    return this.data;
  }
}
