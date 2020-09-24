import Konva from 'konva';
import { StageConfig } from 'konva/types/Stage';

import { defaultState } from '../CanvasView';
import { ActiveData, CanvasData } from '../types';

import { Canvas } from './Canvas';
import { CanvasView } from './CanvasView';
import { Tree } from './Tree';

type StageMockConfig = StageConfig & {
  pointerPosition?: Konva.Vector2d;
};

const pointerPosition = { x: 50, y: 100 };
const linePoints = {
  parent: { x: 10, y: 20 },
  child: { x: 10, y: 20 },
};

const tree = Tree.of<CanvasData>({
  data: {
    position: { x: 10, y: 10 },
    type: 'root',
    title: 'test',
  },
});

const canvas = Canvas.of([tree]);

const activeData: ActiveData = {
  item: tree,
  connector: { position: { x: 10, y: 22 }, type: 'parent' },
};

class StageMock extends Konva.Stage {
  private pointerPosition: Konva.Vector2d;

  constructor({ pointerPosition: position, ...rest }: StageMockConfig) {
    super(rest);
    this.pointerPosition = position ?? { x: 0, y: 0 };
  }

  getPointerPosition(): Konva.Vector2d {
    return this.pointerPosition;
  }
}

const div = document.createElement('div');

const mockViewData = {
  state: defaultState,
  stage: new StageMock({ container: div }),
  canvas,
  horizontalScrollbar: null,
  background: null,
  verticalScrollbar: null,
  layer: null,
  container: null,
};

describe('CanvasView', () => {
  describe('of', () => {
    test('создает экземпляр CanvasView', () => {
      const view = CanvasView.of(mockViewData);
      expect(view).toBeInstanceOf(CanvasView);
    });
  });

  describe('getState', () => {
    test('возвращает стейт', () => {
      const view = CanvasView.of(mockViewData);

      expect(view.getState()).toEqual(defaultState);
    });
  });

  describe('updateState', () => {
    test('обновляет стейт', () => {
      const view = CanvasView.of(mockViewData);

      const newStageSize = { width: 100, height: 100 };
      const newCursor = 'pointer';

      view.updateState({ cursor: newCursor, stageSize: newStageSize });
      const state = view.getState();

      expect(state.cursor).toBe(newCursor);
      expect(state.stageSize).toEqual(newStageSize);
    });
  });

  describe('drawConnectionLine', () => {
    const view = CanvasView.of({ ...mockViewData, stage: null });

    test('не вызывает обновление стейта, если в стейте нет linePoints', () => {
      view.drawConnectingLine();
      expect(view.getState()).toEqual(defaultState);
    });

    test('не обновляет linePoints, если stage равен null', () => {
      view.updateState({ linePoints });
      view.drawConnectingLine();
      expect(view.getState().linePoints).toEqual(linePoints);
    });

    test('обновляет linePoints', () => {
      view.updateState({ linePoints });
      view.setStage(new StageMock({ container: document.createElement('div'), pointerPosition }));

      view.drawConnectingLine();

      expect(view.getState().linePoints?.parent).toEqual(linePoints.parent);
      expect(view.getState().linePoints?.child).toEqual({
        x: 10,
        y: 20,
      });
    });
  });

  describe('changeActiveData', () => {
    const view = CanvasView.of({ ...mockViewData, stage: null });

    afterEach(() => {
      view.updateState(defaultState);
    });

    test('обновляет activeData в стейте', () => {
      view.changeActiveData(activeData);
      expect(view.getState().activeData).toEqual(activeData);
    });

    test('обновляет cursor, если переданный аргумент не равен null', () => {
      view.changeActiveData(activeData);
      expect(view.getState().cursor).toBe('pointer');
    });

    test('не обновляет cursor, если переданный аргумент равен null', () => {
      view.changeActiveData(null);
      expect(view.getState().cursor).toBe(defaultState.cursor);
    });

    test('не обновляет linePoints, если не передан stage', () => {
      view.changeActiveData(activeData);
      expect(view.getState().linePoints).toEqual(defaultState.linePoints);
    });

    test('обновляет linePoints, если задан stage', () => {
      view.setStage(new StageMock({ pointerPosition, container: document.createElement('div') }));

      view.changeActiveData(activeData);

      expect(view.getState().linePoints?.child).toEqual(pointerPosition);
    });
  });

  describe('connectActiveItem', () => {
    const view = CanvasView.of(mockViewData);

    const secondTree = Tree.of({ data: tree.getData() });
    canvas.add(secondTree);

    view.updateState({ activeData });

    afterEach(() => {
      canvas.disconnect(activeData.item, secondTree);
    });

    test('элемент соединяется с активным элементом', () => {
      view.connectActiveItem(secondTree.getId(), 'children');

      expect(secondTree.getChildren().includes(activeData.item.getId())).toBe(true);
      expect(activeData.item.getParents().includes(secondTree.getId())).toBe(true);
    });

    test('элемент не соединяется с другим, если connectionType равен активному коннектору', () => {
      view.connectActiveItem(secondTree.getId(), 'parent');
      expect(secondTree.getChildren().includes(activeData.item.getId())).toBe(false);
      expect(secondTree.getParents().includes(activeData.item.getId())).toBe(false);
      expect(activeData.item.getParents().includes(secondTree.getId())).toBe(false);
      expect(activeData.item.getChildren().includes(secondTree.getId())).toBe(false);
    });
  });

  describe('removeSelectedItem', () => {
    const view = CanvasView.of(mockViewData);

    const secondTree = Tree.of({ data: tree.getData() });
    const thirdTree = Tree.of({ data: tree.getData() });
    canvas.add(secondTree);
    canvas.add(thirdTree);

    afterEach(() => {
      view.updateState({ selectedData: null });
    });

    test('дисконнектит элементы при удалении активной линии', () => {
      canvas.connect(tree, secondTree);
      view.updateState({
        selectedData: {
          type: 'line',
          parentId: tree.getId(),
          childId: secondTree.getId(),
        },
      });

      view.removeSelectedItem();

      expect(tree.getChildren().includes(secondTree.getId())).toBe(false);
      expect(secondTree.getParents().includes(tree.getId())).toBe(false);
    });

    test('удаляет элемент и его связи при удалении активного элемента', () => {
      canvas.connect(tree, secondTree);
      canvas.connect(secondTree, thirdTree);

      view.updateState({
        selectedData: {
          type: 'item',
          id: secondTree.getId(),
        },
      });

      view.removeSelectedItem();

      expect(canvas.extract().includes(secondTree)).toBe(false);
      expect(tree.getChildren().includes(secondTree.getId())).toBe(false);
      expect(thirdTree.getChildren().includes(secondTree.getId())).toBe(false);
    });
  });
});
