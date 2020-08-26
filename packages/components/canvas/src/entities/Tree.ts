import { v4 as uuid } from 'uuid';

export type TreeData<T> = {
  id?: string;
  parentId?: string | null;
  childrenIds?: string[];
  data: T;
};

export class Tree<T = unknown> {
  private data: T;

  private childrenIds: string[];

  private parentId: string | null;

  private id: string;

  private constructor(data: T, childrenIds: string[], parentId: string | null, id: string) {
    this.data = data;
    this.childrenIds = childrenIds;
    this.parentId = parentId;
    this.id = id;
  }

  public isRoot(): boolean {
    return this.parentId === null;
  }

  public isLeaf(): boolean {
    return this.childrenIds.length === 0;
  }

  static of<T = unknown>(treeData: TreeData<T>): Tree<T> {
    const { data, id = uuid(), childrenIds = [], parentId = null } = treeData;
    return new Tree(data, childrenIds, parentId, id);
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

  public getParent(): string | null {
    return this.parentId;
  }

  public addChild(tree: Tree<T>): Tree<T> {
    tree.setParent(this);
    this.childrenIds.push(tree.getId());
    return this;
  }

  public setParent(tree: Tree<T> | null): Tree<T> {
    this.parentId = tree instanceof Tree ? tree.getId() : tree;
    return this;
  }

  public setChildren(trees: Tree<T>[]): Tree<T> {
    this.childrenIds = [];
    trees.forEach((tree) => {
      this.addChild(tree);
    });
    return this;
  }

  public removeChild(tree: Tree<T>): Tree<T> {
    const idx = this.childrenIds.findIndex((child) => child === tree.getId());
    if (idx !== -1) {
      this.childrenIds.splice(idx, 1);
    }
    return this;
  }
}
