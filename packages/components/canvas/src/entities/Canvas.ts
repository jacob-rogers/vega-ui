import {
  CanvasData,
  CanvasNotifier,
  CanvasSet,
  CanvasTree,
  CanvasUpdate,
  Position,
} from '../types';

import { Listener, Notifier } from './Notifier';
import { Tree, TreeData } from './Tree';

export class Canvas {
  private trees: CanvasSet;

  private notifier: CanvasNotifier = new Notifier();

  private constructor(trees: CanvasTree[]) {
    this.trees = new Set(trees);
  }

  static moveToTop<T>(element: T, list: T[]): T[] {
    const sliceList = list.slice();
    const elementIndex = sliceList.indexOf(element);
    if (elementIndex > -1) {
      sliceList.splice(elementIndex, 1);
      sliceList.push(element);
    }
    return sliceList;
  }

  static prepareTrees(trees: Array<CanvasTree | TreeData<CanvasData>>): CanvasTree[] {
    return trees.map((tree) => {
      if (tree instanceof Tree) {
        return tree;
      }

      return Tree.of(tree);
    });
  }

  static of(trees: Array<CanvasTree | TreeData<CanvasData>>): Canvas {
    return new Canvas(Canvas.prepareTrees(trees));
  }

  static from(trees: CanvasTree[]): Canvas {
    return new Canvas(trees);
  }

  public setTrees(trees: CanvasSet): void {
    this.trees = trees;
  }

  public searchTree(id: string): CanvasTree {
    const targetTree = Array.from(this.trees).find((tree) => tree.getId() === id);

    if (targetTree === undefined) {
      throw new Error(`Элемент с id ${id} не существует`);
    }
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
    tree
      .getParents()
      .map((parent) => this.searchTree(parent))
      .forEach((parent) => {
        if (parent) {
          this.disconnect(tree, parent);
        }
      });
    tree
      .getChildren()
      .map((child) => this.searchTree(child))
      .forEach((child) => {
        if (child) {
          this.disconnect(child, tree);
        }
      });
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
    if (
      childTree.getChildren().includes(parentTree.getId()) ||
      childTree.getId() === parentTree.getId()
    ) {
      return;
    }
    parentTree.addChild(childTree);
    childTree.addParent(parentTree);
    this.notifier.notify({
      type: 'connect-tree',
      childId: childTree.getId(),
      parentId: parentTree.getId(),
    });
  }

  public disconnect(childTree: CanvasTree, parentTree: CanvasTree): void {
    parentTree.removeChild(childTree);
    childTree.removeParent(parentTree);
    this.notifier.notify({
      type: 'disconnect-tree',
      id: childTree.getId(),
    });
  }

  public setData(tree: CanvasTree, data: Partial<CanvasData>): void {
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

  public setChildrenIds(tree: CanvasTree, childrenIds: string[]): void {
    tree.setChildrenIds(childrenIds);
    this.notifier.notify({
      type: 'update-children',
      id: tree.getId(),
      newChildren: childrenIds,
    });
  }
}
