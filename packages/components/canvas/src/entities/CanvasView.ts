import Konva from 'konva';

import { ActiveData, CanvasTree, Connection, Position, SelectedData } from '../types';

import { Canvas } from './Canvas';
import { Notifiable } from './Notifiable';

type Optional<T> = T | null;

type Coordinates = { parent: Position; child: Position };
type Size = { width: number; height: number };

export type State = {
  stageSize: Size;
  linePoints: Optional<Coordinates>;
  activeData: Optional<ActiveData>;
  selectedData: Optional<SelectedData>;
  cursor: string;
};

export type ViewUpdate = { type: 'update-state'; changes: Partial<State>; newState: State };

type Stage = Optional<Konva.Stage>;

export class CanvasView extends Notifiable<ViewUpdate> {
  private state: State;

  private stage: Stage;

  private canvas: Canvas;

  private constructor(state: State, stage: Stage, canvas: Canvas) {
    super();
    this.stage = stage;
    this.state = state;
    this.canvas = canvas;
  }

  static of(state: State, stage: Stage, canvas: Canvas): CanvasView {
    return new CanvasView(state, stage, canvas);
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
    this.notifier.notify({
      type: 'update-state',
      changes,
      newState: this.state,
    });
  }

  public drawConnectingLine(): void {
    const { state, stage } = this;
    if (state.linePoints !== null && stage !== null) {
      const position = stage.getPointerPosition();
      if (position) {
        this.updateState({ linePoints: { ...state.linePoints, child: position } });
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

  public removeSelectedItem(): void {
    const { selectedData } = this.state;
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
}
