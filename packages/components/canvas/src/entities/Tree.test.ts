import { Node } from './Node';
import { Tree } from './Tree';

const leaf = Node.createLeaf({ context: {} });

describe('Tree', () => {
  describe('создание', () => {
    test('of', () => {
      const state = { 0: leaf };

      const tree = Tree.of(state);

      expect(tree).toBeInstanceOf(Tree);

      state[0] = Node.createLeaf({ context: {} });
      expect(tree.root()).toBe(leaf);
    });
    test('from', () => {
      expect(Tree.from([])).toBeInstanceOf(Tree);
    });
    test('create', () => {
      expect(Tree.create({ 0: leaf })).toBeInstanceOf(Tree);
    });
  });
  test('nth', () => {
    const tree = Tree.from([leaf]);
    expect(tree.nth(0)).toBe(leaf);
    expect(tree.nth(1)).toBe(undefined);
    expect(tree.nth(-1)).toBe(undefined);
  });

  test('root', () => {
    const tree = Tree.from([leaf]);
    expect(tree.root()).toBe(leaf);
  });

  test('max', () => {
    const branch = Node.createBranch({ context: {}, children: [] });
    const right = Node.createLeaf({ context: {} });
    const left = Node.createLeaf({ context: {} });
    const tree = Tree.from([branch, left, right]);
    const [idx, node] = tree.max();

    expect(idx).toBe(2);
    expect(node).toBe(right);
  });

  test('toBranch', () => {
    const tree = Tree.from([leaf]);
    const [max] = tree.max();
    const maxNode = tree.nth(max);
    if (maxNode) {
      tree.toBranch<{}>(maxNode);
    }

    expect(tree.nth(max)?.isBranch()).toBe(true);
  });

  test('remove', () => {
    const branch = Node.createBranch({ context: {}, children: [] });
    const tree = Tree.from([branch, leaf]);

    expect(tree.max()[0]).toBe(1);

    tree.remove(1);

    expect(tree.max()[0]).toBe(0);
  });

  test('addChildToBranch', () => {
    const branch = Node.createBranch({ context: {}, children: [] });

    const tree = Tree.from([branch]);

    tree.addChildToBranch<{}>(branch, { context: {} });

    const [max] = tree.max();

    expect(max).toBe(1);

    expect(branch.getChildren().length).toBe(1);
  });

  test('connectToParent', () => {
    const branch = Node.createBranch({ context: {}, children: [] });

    const tree = Tree.from([branch, leaf]);

    tree.connectToParent(tree.indexOf(leaf), tree.indexOf(branch));

    expect(branch.getChildren().includes(tree.indexOf(leaf))).toBe(true);

    expect(leaf.parent()).toBe(tree.indexOf(branch));
  });

  test('disconnectFromParent', () => {
    const branch = Node.createBranch({ context: {}, children: [] });

    const tree = Tree.from([branch, leaf]);

    tree.connectToParent(tree.indexOf(leaf), tree.indexOf(branch));

    tree.disconnectFromParent(tree.indexOf(leaf));

    expect(branch.getChildren().includes(tree.indexOf(leaf))).toBe(false);

    expect(leaf.parent()).toBe(undefined);
  });
});
