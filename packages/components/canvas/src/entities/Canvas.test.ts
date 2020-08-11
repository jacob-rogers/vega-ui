import { Canvas, Context } from './Canvas';
import { Node } from './Node';
import { Tree } from './Tree';

const simpleCanvas = [Tree.of<Context>(new Node({ title: 'Шаг 1', type: 'root' }))];

describe('Canvas', () => {
  test('of', () => {
    expect(Canvas.of(simpleCanvas)).toBeInstanceOf(Canvas);
  });

  test('connectTrees', () => {
    const rootTree = Tree.of<Context>(new Node({ title: 'Шаг 1', type: 'root' }));
    const secondTree = Tree.of<Context>(new Node({ title: 'Шаг 2', type: 'root' }));
    const canvas = Canvas.of([rootTree, secondTree]);

    expect(canvas.getTrees().length).toBe(2);

    canvas.connectTrees(rootTree, secondTree);

    expect(rootTree.getChildren().length).toBe(1);
    expect(secondTree.getParent()).toStrictEqual(rootTree);

    expect(canvas.getTrees().length).toBe(1);
  });

  test('disconnectTree', () => {
    const rootTree = Tree.of<Context>(new Node({ title: 'Шаг 1', type: 'root' }));
    const secondTree = Tree.of<Context>(new Node({ title: 'Шаг 2', type: 'root' }));

    rootTree.addChild(secondTree);
    const canvas = Canvas.of([rootTree]);

    canvas.disconnectTree(secondTree);

    expect(rootTree.getChildren().length).toBe(0);
    expect(secondTree.getParent()).toBe(null);

    expect(canvas.getTrees().length).toBe(2);
  });
});
