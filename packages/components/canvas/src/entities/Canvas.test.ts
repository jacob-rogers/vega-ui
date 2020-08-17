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
  // test('of', () => {
  //   expect(Canvas.of(simpleCanvas)).toBeInstanceOf(Canvas);
  // });

  // test('connectTrees', () => {
  //   const rootTree = Tree.of<Context>(new Node({ title: 'Шаг 1', type: 'root' }));
  //   const secondTree = Tree.of<Context>(new Node({ title: 'Шаг 2', type: 'root' }));
  //   const canvas = Canvas.of([rootTree, secondTree]);

  //   expect(canvas.getTrees().length).toBe(2);

  //   canvas.connectTrees(rootTree, secondTree);

  //   expect(rootTree.getChildren().length).toBe(1);
  //   expect(secondTree.getParent()).toStrictEqual(rootTree);

  //   expect(canvas.getTrees().length).toBe(1);
  // });

  // test.skip('disconnectTree', () => {
  //   const rootTree = Tree.of<Context>(new Node({ title: 'Шаг 1', type: 'root' }));
  //   const secondTree = Tree.of<Context>(new Node({ title: 'Шаг 2', type: 'root' }));

  //   rootTree.addChild(secondTree);
  //   const canvas = Canvas.of([rootTree]);

  //   canvas.disconnectTree(secondTree);

  //   expect(rootTree.getChildren().length).toBe(0);
  //   expect(secondTree.getParent()).toBe(null);

  //   expect(canvas.getTrees().length).toBe(2);
  // });

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
