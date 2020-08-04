export interface NodeData<T> {
  parentIdx?: number;
  context: T;
}

export interface BranchData<T = {}> extends LeafData<T> {
  children: number[];
}

export interface Branch {
  type: 'branch';
  data: BranchData;
}

export type LeafData<T = {}> = NodeData<T>;

export interface Leaf {
  type: 'leaf';
  data: LeafData;
}

export type AnyNode = Branch | Leaf;
export type AnyData<C> = LeafData<C> | BranchData<C>;

export class Node<C = {}, T extends AnyData<C> = LeafData<C>> {
  public type: 'leaf' | 'branch';

  private data: T;

  public constructor(type: 'leaf' | 'branch', data: T) {
    this.type = type;
    this.data = data;
  }

  public clone(): Node<C, T> {
    return new Node(this.type, this.data);
  }

  public isLeaf(): this is Node<C, T> {
    return this.type === 'leaf';
  }

  public isBranch(): this is Node<C, BranchData<C>> {
    return this.type === 'branch';
  }

  public addChild(idx: number): void {
    if (this.isBranch() && this.data.children.indexOf(idx) === -1) {
      this.data.children.push(idx);
    }
  }

  public parent(): number | undefined {
    return this.data.parentIdx;
  }

  public setParent(parent: number | undefined): void {
    this.data.parentIdx = parent;
  }

  public getChildren(): number[] {
    if (this.isBranch()) {
      return this.data.children;
    }

    return [];
  }

  public getData(): AnyData<C> {
    return this.data;
  }

  public isChild(): boolean {
    return this.data.parentIdx !== -1;
  }

  public removeChild(idx: number): void {
    if (this.isBranch()) {
      this.data.children = this.data.children.filter((childIdx) => childIdx !== idx);
    }
  }

  public setData(data: Partial<T>): void {
    this.data = { ...this.data, data };
  }
}
