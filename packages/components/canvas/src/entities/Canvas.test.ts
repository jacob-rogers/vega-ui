import { CanvasData } from '../types';

import { Canvas } from './Canvas';
import { Tree } from './Tree';

const createCanvas = (): Canvas => {
  const data: CanvasData = { title: 'Шаг 1', position: { x: 0, y: 0 }, type: 'root' };

  const tree = Tree.of<CanvasData>({ data });
  const secondTree = Tree.of<CanvasData>({ data: { ...data, type: 'step' } });
  const thirdTree = Tree.of<CanvasData>({ data });
  const fouthTree = Tree.of<CanvasData>({ data: secondTree.getData() });
  const fifthTree = Tree.of<CanvasData>({ data: secondTree.getData() });

  tree.addChild(secondTree);

  fouthTree.addChild(fifthTree);
  thirdTree.addChild(fouthTree);

  return Canvas.from([tree, secondTree, thirdTree, fouthTree, fifthTree]);
};

describe('Canvas', () => {
  test('of', () => {
    expect(Canvas.from([])).toBeInstanceOf(Canvas);
  });

  test('connect', () => {
    const canvas = createCanvas();

    const firstTree = canvas.extract()[0];
    const thirdTree = canvas.extract()[2];

    canvas.connect(firstTree, thirdTree);

    expect(firstTree.getChildren().length).toBe(2);
    expect(thirdTree.getParent()).toBe(firstTree.getId());
  });

  test('disconnect', () => {
    const canvas = createCanvas();

    const rootTree = canvas.extract()[0];

    const secondTree = canvas.searchTree(rootTree.getChildren()[0]);

    if (secondTree) {
      canvas.disconnect(secondTree);
    }

    expect(rootTree.getChildren().length).toBe(0);

    if (secondTree) {
      expect(secondTree.getParent()).toBe(null);
    }
  });

  test('extract', () => {
    const canvas = createCanvas();
    expect(canvas.extract().length).toBe(5);
  });
});
