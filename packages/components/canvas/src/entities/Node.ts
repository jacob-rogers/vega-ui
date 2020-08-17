import { v4 as uuid } from 'uuid';

export type NodeData<T> = {
  id?: string;
  parent?: Node<T> | null;
  children?: Node<T>[];
  data: T;
};

export class Node<T = unknown> {
  private data: T;

  private parent: Node<T> | null;

  private children: Node<T>[];

  private id: string;

  constructor(nodeData: NodeData<T>) {
    const { id = uuid(), parent = null, data, children = [] } = nodeData;
    this.id = id;
    this.parent = parent;
    this.data = data;
    this.children = children;
  }

  public isRoot(): boolean {
    return this.parent === null;
  }

  public isLeaf(): boolean {
    return this.children.length === 0;
  }

  public getId(): string {
    return this.id;
  }

  public addChild(node: Node<T>): Node<T> {
    node.setParent(this);
    this.children.push(node);
    return this;
  }

  public removeChild(node: Node<T>): void {
    const idx = this.children.findIndex((child) => child.id === node.id);
    if (idx !== undefined) {
      this.children.splice(idx, 1);
    }
  }

  public getChildren(): Node<T>[] {
    return this.children;
  }

  public setParent(node: Node<T> | null): void {
    this.parent = node;
  }

  public getParent(): Node<T> | null {
    return this.parent;
  }

  public remove(): void {
    if (this.parent instanceof Node) {
      this.parent.removeChild(this);
    }
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T): void {
    this.data = { ...this.data, ...data };
  }
}
