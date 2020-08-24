import { Tree } from './Tree';

const leaf = { data: {} };

type Data = { title: string };

describe('Tree', () => {
  describe('создание', () => {
    test('of', () => {
      const tree = Tree.of(leaf);
      expect(tree).toBeInstanceOf(Tree);
    });
  });

  test('addChild', () => {
    const tree = Tree.of(leaf);

    tree.addChild(Tree.of({ data: {} }));

    expect(tree.getChildren().length).toBe(1);
  });

  test('removeChild', () => {
    const root = Tree.of<Data>({ data: { title: 'title' } });
    const child = Tree.of<Data>({ data: { title: 'child' } });
    root.addChild(child);

    root.removeChild(child);

    expect(root.getChildren().length).toBe(0);
  });

  test('setParent', () => {
    const root = Tree.of({ data: null });
    const child = Tree.of({ data: null });
    const secondChild = Tree.of({ data: null });

    child.setParent(root);
    secondChild.setParent(root);

    secondChild.setParent(child);

    expect(secondChild.getParent()).toBe(child.getId());
  });
});
