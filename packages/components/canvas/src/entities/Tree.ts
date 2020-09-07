import { v4 as uuid } from 'uuid';

export type TreeData<T> = {
  id?: string;
  parentIds?: string[];
  childrenIds?: string[];
  data: T;
};

export class Tree<T = unknown> {
  private data: T;

  private childrenIds: string[];

  private parentIds: string[];

  private id: string;

  private constructor(data: T, childrenIds: string[], parentIds: string[], id: string) {
    this.data = data;
    this.childrenIds = childrenIds;
    this.parentIds = parentIds;
    this.id = id;
  }

  public isRoot(): boolean {
    return this.parentIds.length === 0;
  }

  public isLeaf(): boolean {
    return this.childrenIds.length === 0;
  }

  static of<T = unknown>(treeData: TreeData<T>): Tree<T> {
    const { data, id = uuid(), childrenIds = [], parentIds = [] } = treeData;
    return new Tree(data, childrenIds, parentIds, id);
  }

  public getData(): T {
    return this.data;
  }

  public getId(): string {
    return this.id;
  }

  public setData(data: Partial<T>): Tree<T> {
    this.data = { ...this.data, ...data };
    return this;
  }

  public getChildren(): string[] {
    return this.childrenIds;
  }

  public getParents(): string[] {
    return this.parentIds;
  }

  public addChild(tree: Tree<T>): Tree<T> {
    return this.addConnection(tree, 'child');
  }

  public addParent(tree: Tree<T>): Tree<T> {
    return this.addConnection(tree, 'parent');
  }

  public setChildren(trees: Tree<T>[]): Tree<T> {
    this.childrenIds = [];
    trees.forEach((tree) => {
      this.addChild(tree);
    });
    return this;
  }

  public setChildrenIds(ids: string[]): Tree<T> {
    this.childrenIds = ids;
    return this;
  }

  public removeChild(tree: Tree<T>): Tree<T> {
    return this.removeConnection(tree, 'child');
  }

  public removeParent(tree: Tree<T>): Tree<T> {
    return this.removeConnection(tree, 'parent');
  }

  private removeConnection(tree: Tree<T>, type: 'parent' | 'child'): Tree<T> {
    const targetConnections = type === 'parent' ? this.parentIds : this.childrenIds;
    const idx = targetConnections.findIndex((connection) => connection === tree.getId());
    if (idx !== -1) {
      targetConnections.splice(idx, 1);
    }
    return this;
  }

  private addConnection(tree: Tree<T>, type: 'parent' | 'child'): Tree<T> {
    const targetConnections = type === 'parent' ? this.parentIds : this.childrenIds;
    if (!targetConnections.includes(tree.getId())) {
      targetConnections.push(tree.getId());
    }
    return tree;
  }
}
