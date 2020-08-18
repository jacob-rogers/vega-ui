import { Canvas, Context } from './Canvas';
import { Node } from './Node';
import { Tree } from './Tree';

// const simpleCanvas = [Tree.of<Context>(new Node({ data: { title: 'Шаг 1', type: 'root' }}))];

const createCanvas = (): Canvas => {
  const data: Context = { title: 'Шаг 1', position: {}, type: 'root' };

  const tree = Tree.of<Context>(new Node({ data }));
  const secondTree = Tree.of<Context>(new Node({ data: { ...data, type: 'step' } }));
  const thirdTree = Tree.of<Context>(new Node({ data }));
  const fouthTree = Tree.of<Context>(new Node({ data: secondTree.getData() }));
  const fifthTree = Tree.of<Context>(new Node({ data: secondTree.getData() }));

  tree.addChild(secondTree);

  fouthTree.addChild(fifthTree);
  thirdTree.addChild(fouthTree);

  return Canvas.from([tree, thirdTree]);
};

describe('Canvas', () => {
  test('of', () => {
    expect(Canvas.from([])).toBeInstanceOf(Canvas);
  });

  test('connectTrees', () => {
    const canvas = createCanvas();

    expect(canvas.getTrees().length).toBe(2);

    const firstTree = canvas.getTrees()[0];
    const secondTree = canvas.getTrees()[1];

    canvas.connectTrees(firstTree, secondTree);

    expect(firstTree.getChildren().length).toBe(2);
    expect(secondTree.getParent()).toStrictEqual(firstTree);

    expect(canvas.getTrees().length).toBe(1);
  });

  test('disconnectTree', () => {
    const canvas = createCanvas();

    const rootTree = canvas.getTrees()[0];

    const secondTree = rootTree.getChildren()[0];

    canvas.disconnectTree(secondTree);

    expect(rootTree.getChildren().length).toBe(0);
    expect(secondTree.getParent()).toBe(null);

    expect(canvas.getTrees().length).toBe(3);
  });

  test('extract', () => {
    const canvas = createCanvas();
    expect(canvas.extract().length).toBe(5);
  });

  test('toTrees', () => {
    const canvas = createCanvas();

    const trees = canvas.getTrees();

    const flat = canvas.extract();

    expect(Canvas.toTrees(flat)).toEqual(trees);
  });
});
