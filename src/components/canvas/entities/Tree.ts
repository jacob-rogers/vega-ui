import { v4 as uuid } from 'uuid';

export type TreeData<T> = {
  id?: string;
  parentIds?: string[];
  childrenIds?: string[];
  data: T;
};

export class Tree<T = unknown> {
  private id: string;

  private parentIds: string[];

  private childrenIds: string[];

  private data: T;

  private constructor(id: string, parentIds: string[], childrenIds: string[], data: T) {
    this.id = id;
    this.parentIds = parentIds;
    this.childrenIds = childrenIds;
    this.data = data;
  }

  static of<D = unknown>(treeData: TreeData<D>): Tree<D> {
    const { id = uuid(), parentIds = [], childrenIds = [], data } = treeData;
    return new Tree(id, parentIds, childrenIds, data);
  }

  public canConnectedWith(tree: Tree<T>): boolean {
    const treeId = tree.getId();
    return !(
      this.childrenIds.includes(treeId) ||
      this.parentIds.includes(treeId) ||
      this.id === treeId
    );
  }

  public getId(): string {
    return this.id;
  }

  public getData(): T {
    return this.data;
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

  private addConnection(tree: Tree<T>, type: 'parent' | 'child'): Tree<T> {
    const targetConnections = type === 'parent' ? this.parentIds : this.childrenIds;
    if (!targetConnections.includes(tree.getId())) {
      targetConnections.push(tree.getId());
    }
    return tree;
  }

  private removeConnection(tree: Tree<T>, type: 'parent' | 'child'): Tree<T> {
    const targetConnections = type === 'parent' ? this.parentIds : this.childrenIds;
    const idx = targetConnections.findIndex((connection) => connection === tree.getId());
    if (idx > -1) {
      targetConnections.splice(idx, 1);
    }
    return this;
  }

  public connect(tree: Tree<T>): boolean {
    if (this.canConnectedWith(tree)) {
      this.addChild(tree);
      tree.addParent(this);
      return true;
    }
    return false;
  }

  public disconnect(tree: Tree<T>): Tree<T> {
    this.removeChild(tree);
    tree.removeParent(this);
    return this;
  }
}
