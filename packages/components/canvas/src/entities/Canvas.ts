import { Position } from '../types';

import { Listener, Notifier } from './Notifier';
import { Tree, TreeData } from './Tree';

export type Connection = 'children' | 'parent';

export type Context = {
  title: string;
  type: 'step' | 'root' | 'end';
  position: Position;
  width?: number;
};

export type CanvasUpdate =
  | { type: 'add-tree'; id: string }
  | { type: 'change'; id: string; changes: Partial<Context> }
  | { type: 'remove-tree'; id: string }
  | { type: 'disconnect-tree'; id: string }
  | { type: 'connect-tree'; parentId: string; childId: string }
  | { type: 'clear' };

export type CanvasTree = Tree<Context>;

export type CanvasSet = Set<CanvasTree>;

export type CanvasNotifier = Notifier<CanvasUpdate>;

export class Canvas {
  private trees: CanvasSet;

  private notifier: CanvasNotifier = new Notifier();

  private constructor(trees: CanvasTree[]) {
    this.trees = new Set(trees);
  }

  static prepareTrees(trees: Array<CanvasTree | TreeData<Context>>): CanvasTree[] {
    return trees.map((tree) => {
      if (tree instanceof Tree) {
        return tree;
      }

      return Tree.of(tree);
    });
  }

  static of(trees: Array<CanvasTree | TreeData<Context>>): Canvas {
    return new Canvas(Canvas.prepareTrees(trees));
  }

  static from(trees: CanvasTree[]): Canvas {
    return new Canvas(trees);
  }

  public setTrees(trees: CanvasSet): void {
    this.trees = trees;
  }

  public searchTree(id: string | null): CanvasTree | undefined {
    if (id === null) {
      return undefined;
    }
    const targetTree = Array.from(this.trees).find((tree) => tree.getId() === id);
    return targetTree;
  }

  public extract(): CanvasTree[] {
    return Array.from(this.trees);
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
    if (tree.getParent()) {
      this.disconnect(tree);
    }
    if (tree.getChildren().length) {
      tree.getChildren().forEach((child) => {
        const childTree = this.searchTree(child);
        if (childTree) {
          this.disconnect(childTree);
        }
      });
    }
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
    if (childTree.isRoot()) {
      parentTree.addChild(childTree);
      this.notifier.notify({
        type: 'connect-tree',
        childId: childTree.getId(),
        parentId: parentTree.getId(),
      });
    }
  }

  public disconnect(childTree: CanvasTree): void {
    const parentId = childTree.getParent();
    if (parentId === null) {
      return;
    }

    const parent = this.searchTree(parentId);

    if (parent) {
      parent.removeChild(childTree);
    }
    childTree.setParent(null);
    this.notifier.notify({
      type: 'disconnect-tree',
      id: childTree.getId(),
    });
  }

  public setData(tree: CanvasTree, data: Partial<Context>): void {
    tree.setData(data);
    this.notifier.notify({
      type: 'change',
      id: tree.getId(),
      changes: data,
    });
  }

  public onTreePositionChange(tree: CanvasTree, position: Position): void {
    this.setData(tree, { position });
  }
}
