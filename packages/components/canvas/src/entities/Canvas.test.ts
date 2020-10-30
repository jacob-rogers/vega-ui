import { CanvasData } from '../types';

import { Canvas } from './Canvas';
import { Tree } from './Tree';

const data: CanvasData = { title: 'Шаг 1', position: { x: 0, y: 0 }, type: 'root' };

const createCanvas = (): Canvas => {
  const tree = Tree.of<CanvasData>({ data });
  const secondTree = Tree.of<CanvasData>({ data: { ...data, type: 'step' } });
  const thirdTree = Tree.of<CanvasData>({ data });
  const fouthTree = Tree.of<CanvasData>({ data: secondTree.getData() });
  const fifthTree = Tree.of<CanvasData>({ data: secondTree.getData() });

  tree.addChild(secondTree);

  fouthTree.addChild(fifthTree);
  thirdTree.addChild(fouthTree);

  return Canvas.of([tree, secondTree, thirdTree, fouthTree, fifthTree]);
};

describe('Canvas', () => {
  test('of', () => {
    expect(Canvas.of([])).toBeInstanceOf(Canvas);
  });

  describe('connect', () => {
    const testCanvas = createCanvas();

    const firstTree = testCanvas.extract()[0];
    const thirdTree = testCanvas.extract()[2];

    testCanvas.connect(firstTree, thirdTree);
    test('добавляет ребенка в дерево', () => {
      expect(firstTree.getChildren().includes(thirdTree.getId())).toBe(true);
    });

    test('добавляет родителя в дерево', () => {
      expect(thirdTree.getParents().includes(firstTree.getId())).toBe(true);
    });

    test('не добавляет ребенка, если родитель и ребенок это один и тот же элемент', () => {
      const tree = Tree.of({ data });
      const canvas = Canvas.of([tree]);

      canvas.connect(tree, tree);

      expect(tree.getChildren().length).toBe(0);
    });

    test('не создает циклические зависимости у элементов', () => {
      const tree = Tree.of({ data });
      const secondTree = Tree.of({ data });

      const canvas = Canvas.of([tree, secondTree]);

      canvas.connect(tree, secondTree);

      expect(tree.getChildren().length).toBe(1);

      canvas.connect(secondTree, tree);

      expect(secondTree.getChildren().length).toBe(0);
    });
  });

  describe('remove', () => {
    const tree = Tree.of({ data });
    const secondTree = Tree.of({ data });
    const thirdTree = Tree.of({ data });
    const fourthTree = Tree.of({ data });
    const fifthTree = Tree.of({ data });

    const canvas = Canvas.of([tree, secondTree, thirdTree, fourthTree, fifthTree]);

    canvas.connect(tree, secondTree);
    canvas.connect(fourthTree, secondTree);
    canvas.connect(secondTree, thirdTree);
    canvas.connect(secondTree, fifthTree);

    canvas.remove(secondTree);

    test('удаляет элемент из канваса', () => {
      expect(canvas.searchTree(secondTree.getId())).toEqual(undefined);
    });

    test('удаляет связь с родительским элементом', () => {
      expect(tree.getChildren().length).toBe(0);
      expect(fourthTree.getChildren().length).toBe(0);
    });

    test('удаляет связи с дочерними элементами', () => {
      expect(thirdTree.getParents().length).toBe(0);
      expect(fifthTree.getParents().length).toBe(0);
    });
  });

  test('disconnect', () => {
    const canvas = createCanvas();

    const rootTree = canvas.extract()[0];

    const secondTree = canvas.searchTree(rootTree.getChildren()[0]);

    if (secondTree) {
      canvas.disconnect(rootTree, secondTree);
    }

    expect(rootTree.getChildren().length).toBe(0);

    if (secondTree) {
      expect(secondTree.getParents().length).toBe(0);
    }
  });

  test('extract', () => {
    const canvas = createCanvas();
    expect(canvas.extract().length).toBe(5);
  });

  test('moveToTop', () => {
    const canvas = createCanvas();
    const canvasPenultElement = canvas.extract()[canvas.extract().length - 2];

    canvas.setTrees(new Set(Canvas.moveToTop(canvasPenultElement, canvas.extract())));

    expect(canvas.extract()[canvas.extract().length - 1]).toEqual(canvasPenultElement);
  });
});
