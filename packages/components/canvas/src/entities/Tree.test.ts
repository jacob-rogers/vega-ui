import { v4 } from 'uuid';

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

  describe('addChild', () => {
    const root = Tree.of({ data: null });
    const child = Tree.of({ data: null });

    afterEach(() => {
      root.removeChild(child);
    });

    test('добавляет ребенка, если такого еще нет', () => {
      expect(root.getChildren().length).toBe(0);
      root.addChild(root);
      expect(root.getChildren().length).toBe(1);
    });

    test('не добавляет ребенка, если тот уже существует', () => {
      root.addChild(root);
      expect(root.getChildren().length).toBe(1);
      root.addChild(root);

      expect(root.getChildren().length).toBe(1);
    });
  });

  test('removeChild', () => {
    const root = Tree.of<Data>({ data: { title: 'title' } });
    const child = Tree.of<Data>({ data: { title: 'child' } });
    root.addChild(child);

    root.removeChild(child);

    expect(root.getChildren().length).toBe(0);
  });

  describe('addParent', () => {
    const root = Tree.of({ data: null });
    const child = Tree.of({ data: null });

    afterEach(() => {
      child.removeParent(root);
    });

    test('добавляет родителя, если такого еще нет', () => {
      expect(child.getParents().length).toBe(0);
      child.addParent(root);
      expect(child.getParents().length).toBe(1);
    });

    test('не добавляет родителя, если тот уже существует', () => {
      child.addParent(root);
      expect(child.getParents().length).toBe(1);
      child.addParent(root);

      expect(child.getParents().length).toBe(1);
    });
  });

  test('removeParent', () => {
    const root = Tree.of({ data: null });
    const child = Tree.of({ data: null });

    child.addParent(root);
    expect(child.getParents().length).toBe(1);

    child.removeParent(root);

    expect(child.getParents().length).toBe(0);
  });

  test('setChildren', () => {
    const root = Tree.of({ data: null });

    const children = [Tree.of({ data: null }), Tree.of({ data: null }), Tree.of({ data: null })];

    const childrenIds = children.map((child) => child.getId());

    root.setChildren(children);

    expect(root.getChildren()).toEqual(childrenIds);
  });

  test('setChildrenIds', () => {
    const root = Tree.of({ data: null });

    const children = [v4(), v4(), v4()];

    root.setChildrenIds(children);

    expect(root.getChildren()).toEqual(children);
  });

  describe('canConnectedWith', () => {
    const tree = Tree.of({ data: null });
    const child = Tree.of({ data: null });

    afterEach(() => {
      tree.removeChild(child);
      child.removeParent(tree);
    });

    test('возвращает false, если передать самого себе', () => {
      expect(tree.canConnectedWith(tree)).toBe(false);
    });

    test('возвращает false, если вызвать с существующим ребенком', () => {
      tree.addChild(child);
      expect(tree.canConnectedWith(child)).toBe(false);
    });

    test('возвращает false, если вызвать с существующим родителем', () => {
      child.addParent(tree);
      expect(child.canConnectedWith(tree)).toBe(false);
    });

    test('возвращает true, если попытаться вызвать с еще несуществующей связью', () => {
      expect(tree.canConnectedWith(child)).toBe(true);
      expect(child.canConnectedWith(tree)).toBe(true);
    });
  });
});
