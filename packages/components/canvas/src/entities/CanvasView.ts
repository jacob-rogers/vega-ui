import Konva from 'konva';

import { ActiveOption } from '../components';
import {
  ActiveData,
  CanvasTree,
  Connection,
  ContentRect,
  Coordinates,
  SelectedData,
  Size,
} from '../types';
import { getContentRect } from '../utils';

import { Canvas } from './Canvas';
import { CanvasServiceData } from './CanvasService';
import { Notifier } from './Notifier';
import { ScrollService } from './ScrollService';
import { ZoomService } from './ZoomService';

type Optional<T> = T | null;

export type State = {
  activeOption: ActiveOption;
  stageSize: Size;
  linePoints: Optional<Coordinates>;
  activeData: Optional<ActiveData>;
  selectedData: Optional<SelectedData>;
  cursor: string;
  contentRect: ContentRect;
  overlay: boolean;
  mode?: ActiveOption;
};

export type ViewUpdate = { type: 'update-state'; changes: Partial<State>; newState: State };

type Stage = Optional<Konva.Stage>;
type Container = Optional<HTMLDivElement>;
type Layer = Optional<Konva.Layer>;

type CanvasViewData = Omit<CanvasServiceData, 'contentRect' | 'stageSize'> & {
  container: Container;
  state: State;
  canvas: Canvas;
};

export class CanvasView extends Notifier<ViewUpdate> {
  private state: State;

  private stage: Stage;

  private canvas: Canvas;

  private container: Container;

  private layer: Layer;

  private zoomService: ZoomService;

  private scrollService: ScrollService;

  private constructor(data: CanvasViewData) {
    const { container, canvas, state, ...rest } = data;
    super();
    const serviceData = {
      ...rest,
      contentRect: state.contentRect,
      stageSize: state.stageSize,
    };
    this.stage = data.stage;
    this.state = state;
    this.canvas = canvas;
    this.container = container;
    this.layer = data.layer;
    this.zoomService = new ZoomService(serviceData);
    this.scrollService = new ScrollService(serviceData);
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

      if (this.stage) {
        const { position } = connector;
        const pointerPosition = this.stage.getPointerPosition();
        if (pointerPosition) {
          updates.linePoints = { parent: position, child: pointerPosition };
        }
      }
    }
    this.updateState(updates);
  }

  public connectActiveItem(id: string, connectionType: Connection): void {
    const { activeData } = this.state;
    if (activeData !== null) {
      const targetItem = this.canvas.searchTree(id);
      if (targetItem && connectionType !== activeData.connector?.type) {
        const trees: [CanvasTree, CanvasTree] =
          connectionType === 'parent'
            ? [activeData.item, targetItem]
            : [targetItem, activeData.item];

        this.canvas.connect(...trees);
      }
    }
  }

  public updateContentRect(): void {
    const { container, stage } = this;
    const { stageSize } = this.state;

    if (container === null || stage === null || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    const collection = stage.find('.List');
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
      const { childId, parentId } = selectedData;
      const child = canvas.searchTree(childId);
      const parent = canvas.searchTree(parentId);

      if (child && parent) {
        canvas.disconnect(child, parent);
      }
    }

    if (selectedData.type === 'item') {
      const { id } = selectedData;
      const tree = canvas.searchTree(id);
      if (tree) {
        canvas.remove(tree);
      }
    }

    this.updateState({ selectedData: null });
  }

  public zoom(dy: number): void {
    this.zoomService.zoom(dy);
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
