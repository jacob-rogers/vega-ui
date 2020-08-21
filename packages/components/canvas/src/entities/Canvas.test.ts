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

  return Canvas.from([tree, thirdTree]);
};

describe('Canvas', () => {
  test('of', () => {
    expect(Canvas.from([])).toBeInstanceOf(Canvas);
  });

  test('connect', () => {
    const canvas = createCanvas();

    expect(canvas.get().size).toBe(2);

    const firstTree = canvas.extractTrees()[0];
    const secondTree = canvas.extractTrees()[1];

    canvas.connect(firstTree, secondTree);

    expect(firstTree.getChildren().length).toBe(2);
    expect(secondTree.getParent()).toStrictEqual(firstTree);

    expect(canvas.extractTrees().length).toBe(1);
  });

  test('disconnect', () => {
    const canvas = createCanvas();

    const rootTree = canvas.extractTrees()[0];

    const secondTree = rootTree.getChildren()[0];

    canvas.disconnect(secondTree);

    expect(rootTree.getChildren().length).toBe(0);
    expect(secondTree.getParent()).toBe(null);

    expect(canvas.get().size).toBe(3);
  });

  test('extract', () => {
    const canvas = createCanvas();
    expect(canvas.extract().length).toBe(5);
  });

  test('deep', () => {
    const canvas = createCanvas();

    const trees = canvas.extractTrees();
    const flat = canvas.extract();

    expect(Canvas.deep(flat)).toEqual(trees);
  });
});
