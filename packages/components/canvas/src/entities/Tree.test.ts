import { Node } from './Node';
import { Tree } from './Tree';

const leaf = new Node({ data: {} });

type Data = { title: string };

describe('Tree', () => {
  describe('создание', () => {
    test('of', () => {
      const tree = Tree.of(leaf);
      expect(tree).toBeInstanceOf(Tree);
    });
  });

  test('iterate', () => {
    const root = new Node<Data>({ data: { title: 'title' } });
    const child = new Node<Data>({ data: { title: 'child' } });

    root.addChild(child);

    const tree = Tree.of(root);

    tree.iterate((node) => {
      node.setData({ title: 'test' });
    });

    expect(tree.extract().getData().title).toBe('test');
    expect(
      tree
        .extract()
        .getChildren()[0]
        .getData().title,
    ).toBe('test');
  });

  test('addChild', () => {
    const tree = Tree.of(leaf);

    tree.addChild(Tree.of(new Node({ data: {} })));

    expect(tree.getChildren().length).toBe(1);
  });

  test('removeChild', () => {
    const root = new Node<Data>({ data: { title: 'title' } });
    const child = new Node<Data>({ data: { title: 'child' } });
    root.addChild(child);

    const tree = Tree.of(root);

    tree.removeChild(Tree.of(child));

    expect(tree.getChildren().length).toBe(0);
  });

  test('setParent', () => {
    const root = new Node({ data: null });
    const child = new Node({ data: null });
    const secondChild = new Node({ data: null });

    root.addChild(child);
    root.addChild(secondChild);

    expect(root.getChildren().length).toBe(2);

    const secondChildTree = Tree.of(secondChild);

    secondChildTree.setParent(Tree.of(child));

    expect(root.getChildren().length).toBe(1);

    expect(child.getChildren().length).toBe(1);
  });
});
