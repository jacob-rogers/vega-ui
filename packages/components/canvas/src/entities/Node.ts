export interface NodeData {
  parentIdx: number;
}

export interface BranchData extends NodeData {
  children: number[];
}

export interface Branch {
  type: 'branch';
  data: BranchData;
}

export interface LeafData extends NodeData {
  title?: string;
}

export interface Leaf {
  type: 'leaf';
  data: LeafData;
}

export type AnyNode = Branch | Leaf;
export type AnyData = LeafData | BranchData;

export class Node<T extends AnyData = LeafData> {
  public type: 'leaf' | 'branch';

  private data: T;

  private constructor(type: 'leaf' | 'branch', data: T) {
    this.type = type;
    this.data = data;
  }

  static createLeaf(data: LeafData): Node {
    return new Node('leaf', data);
  }

  static createBranch(data: BranchData): Node<BranchData> {
    return new Node('branch', data);
  }

  static cloneLeaf(leaf: Leaf): Node {
    return new Node('leaf', leaf.data);
  }

  public isLeaf(): this is Node {
    return this.type === 'leaf';
  }

  public isBranch(): this is Node<BranchData> {
    return this.type === 'branch';
  }

  public addChild(idx: number): void {
    if (this.isBranch()) {
      this.data.children.push(idx);
    }
  }

  public parent(): number {
    return this.data.parentIdx;
  }

  public getChildren(): number[] {
    if (this.isBranch()) {
      return this.data.children;
    }

    return [];
  }

  public isChild(): boolean {
    return this.data.parentIdx !== -1;
  }

  public removeChild(idx: number): void {
    if (this.isBranch()) {
      this.data.children = this.data.children.filter((childIdx) => childIdx !== idx);
    }
  }
}
