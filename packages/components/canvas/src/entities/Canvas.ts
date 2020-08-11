import { Position } from '../types';

import { Node } from './Node';
import { Listener, Notifier } from './Notifier';
import { Tree } from './Tree';

export type Context = {
  title: string;
  type: 'step' | 'root' | 'end';
  position: Position;
};

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Context }
  | { type: 'remove-tree'; id: string }
  | { type: 'disconnect-tree'; id: string; oldParentId: string }
  | { type: 'connect-tree'; parentId: string; childId: string };

export class Canvas {
  private trees: Tree<Context>[];

  private notifier: Notifier<CanvasUpdate> = new Notifier();

  private constructor(trees: Tree<Context>[]) {
    this.trees = trees;
  }

  static create(rootNode: Node<Context>): Canvas {
    return new Canvas([Tree.of<Context>(rootNode)]);
  }

  static of(trees: Tree<Context>[]): Canvas {
    return new Canvas(trees);
  }

  public addListener(listener: Listener<CanvasUpdate>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }

  public getTrees(): Tree<Context>[] {
    return this.trees;
  }

  public iterate(fn: (node: Node) => void): void {
    this.trees.forEach((tree) => {
      tree.iterate(fn);
    });
  }

  public removeTree(tree: Tree<Context>): void {
    const treeIndex = this.trees.findIndex((child) => child.getId() === tree.getId());
    if (treeIndex !== undefined) {
      this.trees.splice(treeIndex, 1);
      this.notifier.notify({
        type: 'remove-tree',
        id: tree.getId(),
      });
    }
  }

  public addTree(tree: Tree<Context>): void {
    this.trees.push(tree);
    this.notifier.notify({
      id: tree.getId(),
      type: 'add-tree',
    });
  }

  public connectTrees(parentTree: Tree<Context>, childTree: Tree<Context>): void {
    childTree.setParent(parentTree);
    this.removeTree(childTree);
    this.notifier.notify({
      type: 'connect-tree',
      childId: childTree.getId(),
      parentId: parentTree.getId(),
    });
  }

  public disconnectTree(childTree: Tree<Context>): void {
    const treeNode = childTree.extract();
    const parent = treeNode.getParent();

    if (parent) {
      parent.removeChild(treeNode);
      childTree.setParent(null);

      this.addTree(childTree);
      this.notifier.notify({
        type: 'disconnect-tree',
        id: childTree.getId(),
        oldParentId: parent.getId(),
      });
    }
  }

  public getTree(id: string): Tree<Context> | undefined {
    return this.trees.find((tree) => tree.getId() === id);
  }

  public setTreeData(tree: Tree<Context>, data: Context): void {
    tree.setData(data);
    this.notifier.notify({
      type: 'change',
      id: tree.getId(),
      changes: data,
    });
  }
}
