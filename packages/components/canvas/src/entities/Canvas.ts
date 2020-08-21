import { Position } from '../types';

import { Listener, Notifier } from './Notifier';
import { Tree } from './Tree';

export type Connection = 'children' | 'parent';

export type Context = {
  title: string;
  type: 'step' | 'root' | 'end';
  position: Position;
};

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Partial<Context> }
  | { type: 'remove-tree'; id: string }
  | { type: 'disconnect-tree'; id: string; oldParentId: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' };

export type FlatTree = {
  data: Context;
  parentId: string | null;
  children: string[];
  id: string;
};

export type CanvasTree = Tree<Context>;

export type CanvasSet = Set<CanvasTree>;

export class Canvas {
  private trees: CanvasSet;

  private notifier: Notifier<CanvasUpdate> = new Notifier();

  private constructor(trees: CanvasTree[]) {
    this.trees = new Set(trees);
  }

  static flat(tree: CanvasTree): FlatTree {
    const parent = tree.getParent();
    return {
      id: tree.getId(),
      children: tree.getChildren().map((child) => child.getId()),
      parentId: parent ? parent.getId() : null,
      data: tree.getData(),
    };
  }

  static flatArray(trees: CanvasTree[]): FlatTree[] {
    const flattenTree = (root: CanvasTree): CanvasTree[] => {
      const flatten = [root];

      return flatten.concat(root.getChildren().flatMap((child) => flattenTree(child)));
    };

    const flatTrees = trees.reduce<CanvasTree[]>(
      (prev, next) => prev.concat(flattenTree(next)),
      [],
    );

    return flatTrees.map((tree) => Canvas.flat(tree));
  }

  public extractTrees(): CanvasTree[] {
    return Array.from(this.trees);
  }

  static deep(flatTrees: FlatTree[]): CanvasTree[] {
    const trees: [CanvasTree, FlatTree][] = flatTrees.map((item) => {
      return [Tree.of({ data: item.data, id: item.id }), item];
    });

    const nest = (items: [CanvasTree, FlatTree][], id: string | null = null): CanvasTree[] => {
      return items
        .filter(([, flatTree]) => {
          return flatTree.parentId === id;
        })
        .map(([tree, flatTree]) => {
          const children = nest(items, flatTree.id);
          tree.setChildren(children);
          return tree;
        });
    };

    return nest(trees);
  }

  static of(trees: FlatTree[]): Canvas {
    return new Canvas(Canvas.deep(trees));
  }

  static from(trees: CanvasTree[]): Canvas {
    return new Canvas(trees);
  }

  public extract(): FlatTree[] {
    return Canvas.flatArray(Array.from(this.trees));
  }

  public addListener(listener: Listener<CanvasUpdate>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }

  public get(): CanvasSet {
    return this.trees;
  }

  public remove(tree: CanvasTree): void {
    this.trees.delete(tree);
    this.notifier.notify({
      type: 'remove-tree',
      id: tree.getId(),
    });
  }

  public add(tree: CanvasTree): void {
    this.trees.add(tree);
    this.notifier.notify({
      id: tree.getId(),
      type: 'add-tree',
    });
  }

  public connect(parentTree: CanvasTree, childTree: CanvasTree): void {
    parentTree.addChild(childTree);
    if (this.trees.has(childTree)) {
      this.remove(childTree);
    }
    this.notifier.notify({
      type: 'connect-tree',
      childId: childTree.getId(),
      parentId: parentTree.getId(),
    });
  }

  public disconnect(childTree: CanvasTree): void {
    const parent = childTree.getParent();

    if (parent) {
      parent.removeChild(childTree);
      childTree.setParent(null);

      this.add(childTree);
      this.notifier.notify({
        type: 'disconnect-tree',
        id: childTree.getId(),
        oldParentId: parent.getId(),
      });
    }
  }

  public setData(tree: CanvasTree, data: Partial<Context>): void {
    tree.setData(data);
    this.notifier.notify({
      type: 'change',
      id: tree.getId(),
      changes: data,
    });
  }
}
