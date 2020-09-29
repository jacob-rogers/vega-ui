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
  private data: CanvasServiceData;

  public getPadding(): { vertical: number; horizonal: number } {
    return {
      vertical: this.data.stageSize.height,
      horizonal: this.data.stageSize.width,
    };
  }

  public getData(): CanvasServiceData {
    return this.data;
  }

  public constructor(data: CanvasServiceData) {
    this.data = data;
  }
}
