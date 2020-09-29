import { CanvasData, CanvasSet, CanvasTree, CanvasUpdate, Position } from '../types';

import { Notifier } from './Notifier';
import { Tree, TreeData } from './Tree';

export class Canvas extends Notifier<CanvasUpdate> {
  private trees: CanvasSet;

  private constructor(trees: CanvasTree[]) {
    super();
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
    this.notify({
      type: 'update-trees',
      newTrees: Array.from(trees),
    });
  }

  public searchTree(id: string): CanvasTree | undefined {
    return Array.from(this.trees).find((tree) => tree.getId() === id);
  }

  public findRoot(): CanvasTree | undefined {
    return Array.from(this.trees).find((tree) => tree.getData().type === 'root');
  }

  public hasRoot(): boolean {
    return this.findRoot() !== undefined;
  }

  public extract(): CanvasTree[] {
    return Array.from(this.trees);
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
    this.notify({
      type: 'remove-tree',
      id: tree.getId(),
    });
  }

  public add(tree: CanvasTree): void {
    this.trees.add(tree);
    this.notify({
      id: tree.getId(),
      type: 'add-tree',
    });
  }

  public connect(parentTree: CanvasTree, childTree: CanvasTree): void {
    const success = parentTree.connect(childTree);
    if (success) {
      this.notify({
        type: 'connect-tree',
        childId: childTree.getId(),
        parentId: parentTree.getId(),
      });
    }
  }

  public disconnect(childTree: CanvasTree, parentTree: CanvasTree): void {
    parentTree.disconnect(childTree);
    this.notify({
      type: 'disconnect-tree',
      id: childTree.getId(),
    });
  }

  public setData(tree: CanvasTree, data: Partial<CanvasData>): void {
    tree.setData(data);
    this.notify({
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
    this.notify({
      type: 'update-children',
      id: tree.getId(),
      newChildren: childrenIds,
    });
  }

  public getChildren(tree: CanvasTree): CanvasTree[] {
    return tree
      .getChildren()
      .map((child) => this.searchTree(child))
      .filter((child) => child !== undefined) as CanvasTree[];
  }

  public getParents(tree: CanvasTree): CanvasTree[] {
    return tree
      .getParents()
      .map((parent) => this.searchTree(parent))
      .filter((parent) => parent !== undefined) as CanvasTree[];
  }

  public clear(): void {
    this.notify({
      type: 'clear',
    });
  }
}
