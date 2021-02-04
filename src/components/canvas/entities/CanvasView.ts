import Konva from 'konva';

import { ActiveOption } from '../components/OptionsPanel/types';
import { ActiveData, Coordinates, RectParams, SelectedData, Size } from '../types';
import { getContentRect } from '../utils';

import { Canvas } from './Canvas';
import { CanvasServiceData } from './CanvasService';
import { Notifier } from './Notifier';
import { ScrollbarService } from './ScrollbarService';
import { ScrollService } from './ScrollService';
import { ZoomProps, ZoomService } from './ZoomService';

type Optional<T> = T | null;

export type State = {
  activeOption: ActiveOption;
  stageSize: Size;
  linePoints: Optional<Coordinates>;
  activeData: Optional<ActiveData>;
  selectedData: Optional<SelectedData>;
  cursor: string;
  contentRect: RectParams;
  overlay: boolean;
  mode?: ActiveOption;
  scale: number;
};

export type ViewUpdate = { type: 'update-state'; changes: Partial<State>; newState: State };

type Stage = Optional<Konva.Stage>;
type Layer = Optional<Konva.Layer>;

type CanvasViewData = Omit<CanvasServiceData, 'contentRect' | 'stageSize'> & {
  state: State;
  canvas: Canvas;
};

export class CanvasView extends Notifier<ViewUpdate> {
  private state: State;

  private stage: Stage;

  private canvas: Canvas;

  private layer: Layer;

  private zoomService: ZoomService;

  private scrollService: ScrollService;

  private scrollbarService: ScrollbarService;

  private constructor(data: CanvasViewData) {
    const { canvas, state, ...rest } = data;
    super();
    const serviceData = {
      ...rest,
      contentRect: state.contentRect,
      stageSize: state.stageSize,
    };
    this.stage = data.stage;
    this.state = state;
    this.canvas = canvas;
    this.layer = data.layer;
    this.zoomService = new ZoomService(serviceData);
    this.scrollService = new ScrollService(serviceData);
    this.scrollbarService = new ScrollbarService(serviceData);
  }

  static of(canvasData: CanvasViewData): CanvasView {
    return new CanvasView(canvasData);
  }

  public getState(): State {
    return this.state;
  }

  public getStage(): Stage {
    return this.stage;
  }

  public getLayer(): Layer {
    return this.layer;
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  public setStage(stage: Stage): void {
    this.stage = stage;
  }

  public setCanvas(canvas: Canvas): void {
    this.canvas = canvas;
  }

  public updateState(changes: Partial<State>): void {
    this.state = { ...this.state, ...changes };
    this.notify({
      type: 'update-state',
      changes,
      newState: this.state,
    });
  }

  public drawConnectingLine(): void {
    const { state, stage, layer } = this;
    if (state.linePoints !== null && stage !== null && layer !== null) {
      const position = stage.getPointerPosition();
      if (position) {
        this.updateState({
          linePoints: {
            ...state.linePoints,
            child: {
              x: (position.x - layer.x()) * (1 / layer.scaleX()),
              y: (position.y - layer.y()) * (1 / layer.scaleY()),
            },
          },
        });
      }
    }
  }

  public changeActiveData(newActiveData: Optional<ActiveData>): void {
    const updates: Partial<State> = {};
    updates.activeData = newActiveData;
    if (newActiveData) {
      updates.cursor = 'pointer';
      const { connector } = newActiveData;

      if (this.stage && this.layer) {
        const { position } = connector;
        const pointerPosition = this.stage.getPointerPosition();
        if (pointerPosition) {
          updates.linePoints = {
            parent: position,
            child: {
              x: (pointerPosition.x - this.layer.x()) * (1 / this.layer.scaleX()),
              y: (pointerPosition.y - this.layer.y()) * (1 / this.layer.scaleY()),
            },
          };
        }
      }
    }
    this.updateState(updates);
  }

  public updateContentRect(): void {
    const { stage } = this;
    const { stageSize } = this.state;

    if (stage === null || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    const collection = stage.find('.StepItem, .ExtremePointItem, .EventItem');
    const elements = collection.toArray();

    const rect = getContentRect(elements, stageSize.width, stageSize.height);

    this.updateState({ contentRect: rect });
  }

  public removeSelectedItem(): void {
    const { selectedData } = this.getState();
    const { canvas } = this;

    if (selectedData === null) {
      return;
    }

    if (selectedData.type === 'line') {
      const { parentId, childId } = selectedData;
      const parent = canvas.searchTree(parentId);
      const child = canvas.searchTree(childId);

      if (child && parent) {
        canvas.disconnect(parent, child);
      }
    }

    if (selectedData.type === 'item') {
      const { ids } = selectedData;

      const trees = [];

      for (let i = 0; i < ids.length; i += 1) {
        const tree = canvas.searchTree(ids[i]);
        if (tree) {
          trees.push(tree);
        }
      }

      canvas.remove(trees);
    }

    this.updateContentRect();
    this.updateState({ selectedData: null });
  }

  public zoom(props: ZoomProps): void {
    const scale = this.zoomService.zoom(props);

    this.updateState({ scale });
  }

  public updateScrollbars(): void {
    this.scrollbarService.updateScrollbars();
  }

  public scroll(dx: number, dy: number): void {
    this.scrollService.scroll(dx, dy);
  }

  public scrollHorizontal(): void {
    this.scrollService.scrollHorizontal();
  }

  public scrollVertical(): void {
    this.scrollService.scrollVertical();
  }

  public changeActiveOption(activeOption: ActiveOption): void {
    const updates: Partial<State> = { activeOption, mode: activeOption };

    updates.cursor = activeOption === 'dragging' ? 'grab' : 'default';

    updates.overlay = activeOption === 'dragging';

    this.updateState(updates);
  }
}
