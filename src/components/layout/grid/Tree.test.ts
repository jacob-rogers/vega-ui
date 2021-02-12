import { Node } from './Node';
import { Tree } from './Tree';

describe('Tree', () => {
  describe('creation', () => {
    test('of', () => {
      const leaf = Node.createLeaf();
      const state = { 0: leaf };

      const tree = Tree.of(state);
      expect(tree).toBeInstanceOf(Tree);
      // не должен мутировать стейт
      state[0] = Node.createLeaf();
      expect(tree.root()).toBe(leaf);
    });
    test('from', () => {
      expect(Tree.from([])).toBeInstanceOf(Tree);
    });
    test('create', () => {
      expect(Tree.create()).toBeInstanceOf(Tree);
    });
  });

  test('nth', () => {
    const leaf = Node.createLeaf();
    const tree = Tree.from([leaf]);
    expect(tree.nth(0)).toBe(leaf);
    expect(tree.nth(1)).toBe(undefined);
    expect(tree.nth(-1)).toBe(undefined);
  });

  test('root', () => {
    const node = Node.createLeaf();
    const tree = Tree.from([node]);
    expect(tree.root()).toBe(node);
  });

  test('root возвращает ошибку', () => {
    const tree = Tree.from([]);
    expect(() => tree.root()).toThrow('Отсутствует корневой элемент');
  });

  test('indexOf', () => {
    const branch = Node.createBranch('up');
    const left = Node.createLeaf();
    const right = Node.createLeaf();
    const tree = Tree.from([branch, left, right]);

    expect(tree.indexOf(left)).toBe(1);
  });

  test('max', () => {
    const branch = Node.createBranch('up');
    const left = Node.createLeaf();
    const right = Node.createLeaf();
    const tree = Tree.from([branch, left, right]);
    const [idx, node] = tree.max();

    expect(idx).toBe(2);
    expect(node).toBe(right);
  });

  test('toBranch', () => {
    const leaf = Node.createLeaf();
    const tree = Tree.from([leaf]);
    let [max, node] = tree.max();

    expect(max).toBe(0);
    expect(tree.indexOf(node)).toBe(max);

    tree.toBranch(max, 'up');
    [max, node] = tree.max();

    expect(max).toBe(2);
    expect(tree.indexOf(node)).toBe(max);

    tree.toBranch(max, 'left');
    [max, node] = tree.max();

    expect(max).toBe(6);
    expect(tree.indexOf(node)).toBe(max);
  });

  test('toBranch не выполняется если узел branch', () => {
    const leaf = Node.createLeaf();
    const tree = Tree.from([leaf]);
    let [max] = tree.max();

    expect(max).toBe(0);

    tree.toBranch(max, 'up');
    [max] = tree.max();

    expect(max).toBe(2);

    tree.toBranch(0, 'left');

    [max] = tree.max();
    expect(max).toBe(2);
  });

  describe('remove', () => {
    test('замена родителя соседом удаленного узла', () => {
      const state = {
        0: Node.createBranch('up'),
        1: Node.createLeaf(),
        2: Node.createLeaf(),
      };

      // правый узел
      let tree = Tree.of(state);
      tree.remove(1);
      expect(tree.nth(0)).toBe(state[2]);

      // левый узел
      tree = Tree.of(state);
      tree.remove(2);
      expect(tree.nth(0)).toBe(state[1]);
    });

    test('нет ошибки при попытке удалении несуществующего узла', () => {
      const state = {
        0: Node.createBranch('up'),
        1: Node.createLeaf(),
      };

      const tree = Tree.of(state);

      expect(() => tree.remove(1)).not.toThrow();
    });

    test('поднятие левого идеального поддерева на место родителя', () => {
      const state = {
        0: Node.createBranch('left'),
        1: Node.createBranch('right'),
        2: Node.createLeaf(),
        3: Node.createBranch('up'),
        4: Node.createBranch('down'),
        7: Node.createLeaf(),
        8: Node.createLeaf(),
        9: Node.createLeaf(),
        10: Node.createLeaf(),
      };

      const tree = Tree.of(state);

      tree.remove(2);

      expect(tree.nth(0)).toBe(state[1]);
      expect(tree.nth(2)).toBe(state[4]);
      expect(tree.nth(5)).toBe(state[9]);
      expect(tree.nth(6)).toBe(state[10]);
      expect(tree.nth(1)).toBe(state[3]);
      expect(tree.nth(4)).toBe(state[8]);
      expect(tree.nth(3)).toBe(state[7]);
    });

    test('поднятие правого идеального поддерева на место родителя', () => {
      const state = {
        0: Node.createBranch('left'),
        1: Node.createLeaf(),
        2: Node.createBranch('right'),
        5: Node.createBranch('up'),
        6: Node.createBranch('down'),
        11: Node.createLeaf(),
        12: Node.createLeaf(),
        13: Node.createLeaf(),
        14: Node.createLeaf(),
      };

      const tree = Tree.of(state);

      tree.remove(1);

      expect(tree.nth(0)).toBe(state[2]);
      expect(tree.nth(1)).toBe(state[5]);
      expect(tree.nth(4)).toBe(state[12]);
      expect(tree.nth(3)).toBe(state[11]);
      expect(tree.nth(2)).toBe(state[6]);
      expect(tree.nth(5)).toBe(state[13]);
      expect(tree.nth(6)).toBe(state[14]);
    });
  });

  test('восстановление и извлечение состояния', () => {
    const branch = Node.createBranch('down');
    const left = Node.createLeaf();
    const right = Node.createLeaf();

    const state = {
      0: branch,
      1: left,
      2: right,
    };

    const tree = Tree.create(state);

    expect(tree.extract()).toEqual(state);
  });
});
