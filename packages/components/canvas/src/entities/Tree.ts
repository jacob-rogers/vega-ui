import { v4 as uuid } from 'uuid';

import { Node } from './Node';

type TreeData<T> = {
  id?: string;
  parent?: Tree<T> | null;
  children?: Tree<T>[];
  data: T;
};

export class Tree<T = unknown> {
  private node: Node<T>;

  private children: Tree<T>[];

  private parent: Tree<T> | null;

  private id: string;

  private constructor(node: Node<T>, children: Tree<T>[], parent: Tree<T> | null, id: string) {
    this.node = node;
    this.children = children;
    this.parent = parent;
    this.id = id;
  }

  public isRoot(): boolean {
    return this.parent === null;
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }

  static of<T = unknown>(treeData: TreeData<T>): Tree<T> {
    const { data, id = uuid(), children = [], parent = null } = treeData;
    return new Tree(new Node(data), children, parent, id);
  }

  public getData(): T {
    return this.node.getData();
  }

  public getId(): string {
    return this.id;
  }

  public setData(data: Partial<T>): Tree<T> {
    this.node.setData(data);
    return this;
  }

  public iterate(fn: (tree: Tree<T>) => void): void {
    const iterator = (tree: Tree<T>): void => {
      fn(tree);
      const children = tree.getChildren();
      children.forEach(iterator);
    };

    iterator(this);
  }

  public getChildren(): Tree<T>[] {
    return this.children;
  }

  public getParent(): Tree<T> | null {
    return this.parent;
  }

  public addChild(tree: Tree<T>): Tree<T> {
    const currentParent = tree.getParent();
    if (currentParent instanceof Tree) {
      currentParent.removeChild(tree);
    }
    tree.setParent(this);
    this.children.push(tree);
    return this;
  }

  public setParent(tree: Tree<T> | null): Tree<T> {
    this.parent = tree;
    return this;
  }

  public setChildren(trees: Tree<T>[]): Tree<T> {
    this.children = [];
    trees.forEach((tree) => {
      this.addChild(tree);
    });
    return this;
  }

  public removeChild(tree: Tree<T>): Tree<T> {
    const idx = this.children.findIndex((child) => child.getId() === tree.getId());
    if (idx !== undefined) {
      this.children.splice(idx, 1);
    }
    return this;
  }

  public remove(): void {
    if (this.parent instanceof Tree) {
      this.parent.removeChild(this);
    }
  }
}
