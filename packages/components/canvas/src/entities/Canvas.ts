import { Position } from '../types';

import { Listener, Notifier } from './Notifier';
import { Tree, TreeData } from './Tree';

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
  | { type: 'clear' }
  | { type: 'update' };

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
    if (!id) {
      return undefined;
    }
    return Array.from(this.trees).find((tree) => tree.getId() === id);
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
    const parent = this.searchTree(childTree.getParent());

    if (parent) {
      parent.removeChild(childTree);
      childTree.setParent(null);
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

  public onTreePositionChange(tree: CanvasTree, position: Position): void {
    this.setData(tree, { position });
  }

  public onUpdate(): void {
    this.notifier.notify({ type: 'update' });
  }
}
