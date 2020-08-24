import { Canvas, Context } from './Canvas';
import { Tree } from './Tree';

const createCanvas = (): Canvas => {
  const data: Context = { title: 'Шаг 1', position: {}, type: 'root' };

  const tree = Tree.of<Context>({ data });
  const secondTree = Tree.of<Context>({ data: { ...data, type: 'step' } });
  const thirdTree = Tree.of<Context>({ data });
  const fouthTree = Tree.of<Context>({ data: secondTree.getData() });
  const fifthTree = Tree.of<Context>({ data: secondTree.getData() });

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
