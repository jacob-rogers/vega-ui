import { v4 as uuid } from 'uuid';

import { Node } from './Node';

export type TreeData<T> = {
  id?: string;
  parentId?: string | null;
  children?: string[];
  data: T;
  node?: { data: T };
};

export class Tree<T = unknown> {
  private node: Node<T>;

  private children: string[];

  private parentId: string | null;

  private id: string;

  private constructor(node: Node<T>, children: string[], parent: string | null, id: string) {
    this.node = node;
    this.children = children;
    this.parentId = parent;
    this.id = id;
  }

  public isRoot(): boolean {
    return this.parentId === null;
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }

  static of<T = unknown>(treeData: TreeData<T>): Tree<T> {
    const { data, id = uuid(), children = [], parentId = null, node } = treeData;
    return new Tree(new Node(node?.data ?? data), children, parentId, id);
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

  public getChildren(): string[] {
    return this.children;
  }

  public getParent(): string | null {
    return this.parentId;
  }

  public addChild(tree: Tree<T>): Tree<T> {
    tree.setParent(this);
    this.children.push(tree.getId());
    return this;
  }

  public setParent(tree: Tree<T> | null): Tree<T> {
    this.parentId = tree instanceof Tree ? tree.getId() : tree;
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
    const idx = this.children.findIndex((child) => child === tree.getId());
    if (idx !== undefined) {
      this.children.splice(idx, 1);
    }
    return this;
  }
}
