import {
  CanvasData,
  CanvasSet,
  CanvasTree,
  CanvasUpdate,
  Position,
  RemovedTrees,
  SelectedData,
} from '../types';

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

  public remove(trees: CanvasTree | CanvasTree[]): void {
    const removingTrees = Array.isArray(trees) ? trees : [trees];

    const removedTrees: RemovedTrees[] = [];

    for (let i = 0; i < removingTrees.length; i += 1) {
      const tree = removingTrees[i];

      this.trees.delete(tree);

      tree
        .getParents()
        .map((parent) => this.searchTree(parent))
        .forEach((parent) => {
          if (parent) {
            parent.removeChild(tree);
          }
        });
      tree
        .getChildren()
        .map((child) => this.searchTree(child))
        .forEach((child) => {
          if (child) {
            child.removeParent(tree);
          }
        });

      removedTrees.push({
        treeId: tree.getId(),
        stepDataId: tree.getData().stepData?.id,
      });
    }

    this.notify({
      type: 'remove-trees',
      removedTrees,
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

  public disconnect(parentTree: CanvasTree, childTree: CanvasTree): void {
    parentTree.disconnect(childTree);
    this.notify({
      type: 'disconnect-tree',
      childId: childTree.getId(),
      parentId: parentTree.getId(),
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

  public setDataM(trees: { tree: CanvasTree; data: Partial<CanvasData> }[]): void {
    const ids = [];
    const changes = [];

    for (let i = 0; i < trees.length; i += 1) {
      const { tree, data } = trees[i];

      ids.push(tree.getId());
      changes.push(data);

      tree.setData(data);
    }

    this.notify({
      type: 'change-multiple',
      ids,
      changes,
    });
  }

  public onTreePositionChange(tree: CanvasTree, position: Position): void {
    this.setData(tree, { position });
  }

  public onTreePositionChangeM(trees: { tree: CanvasTree; position: Position }[]): void {
    this.setDataM(
      trees.map(({ tree, position }) => ({
        tree,
        data: { position },
      })),
    );
  }

  public setChildrenIds(tree: CanvasTree, childrenIds: string[]): void {
    tree.setChildrenIds(childrenIds);
    this.notify({
      type: 'update-children',
      id: tree.getId(),
      newChildrenIds: childrenIds,
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

  public itemsSelectionNotification(selected: SelectedData | null): void {
    const evtObject: CanvasUpdate = selected
      ? {
          type: 'select',
          selected,
        }
      : { type: 'unselect' };

    this.notify(evtObject);
  }

  public dropEventNotification({
    intersectionId,
    position,
  }: {
    intersectionId?: string;
    position?: { x: number; y: number };
  }): void {
    this.notify({
      type: 'drop-event',
      intersectionId,
      position,
    });
  }

  public clear(): void {
    this.notify({
      type: 'clear',
    });
  }
}
