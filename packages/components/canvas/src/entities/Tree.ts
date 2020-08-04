import { Node } from './Node';

export type TreeNode = Node;
type Optional<T> = T | undefined;

type WithRoot<T> = {
  [idx: string]: T;
  '0': T;
};

export type TreeState = WithRoot<TreeNode>;

type TreeEntry = [number, TreeNode];

export class Tree {
  private state: TreeState;

  static create(state?: TreeState): Tree {
    return Tree.of(state ?? { 0: Node.createLeaf({ parentIdx: -1 }) });
  }

  static of(state: TreeState): Tree {
    return new Tree({ ...state });
  }

  static from(nodes: TreeNode[]): Tree {
    const [root] = nodes;
    return Tree.create({
      ...Object.fromEntries(Object.entries(nodes)),
      0: root,
    });
  }

  private constructor(state: TreeState) {
    this.state = state;
  }

  public nth(idx: number): Optional<TreeNode> {
    return this.state[idx];
  }

  public root(): TreeNode {
    const root = this.nth(0);

    if (root === undefined) {
      throw new Error('Отсутствует корневой элемент');
    }

    return root;
  }

  public max(): TreeEntry | [number, null] {
    let index = 0;
    let node = this.root();

    if (node === undefined) {
      return [index, null];
    }

    this.iterate((n, idx) => {
      node = idx > index ? n : node;
      index = Math.max(index, idx);
    });

    return [index, node];
  }

  private iterate(fn: (node: TreeNode, idx: number, done: () => void) => null | void): void {
    let isDone = false;
    const entries = Object.entries(this.state);

    function done(): void {
      isDone = true;
    }

    for (let i = 0; i < entries.length; ) {
      const [idx, node] = entries[i];

      fn(node, Number(idx), done);

      if (isDone) {
        break;
      }

      i += 1;
    }
  }

  public indexOf(node: TreeNode): number {
    let index = -1;

    this.iterate((n, idx, done) => {
      if (n === node) {
        index = idx;
        done();
      }
    });

    return index;
  }

  public insert(idx: number, node: TreeNode): void {
    this.state[idx] = node;
  }

  public remove(idx: number): void {
    const node = this.nth(idx);

    if (!node) {
      return;
    }

    const parent = this.nth(node.parent());

    if (parent !== undefined && parent.isBranch()) {
      delete this.state[idx];
      parent.removeChild(idx);
    }
  }

  public toBranch(idx: number, parentIdx: number, title: string): void {
    const node = this.nth(idx);

    if (node === undefined || node.isBranch()) {
      return;
    }

    const [index] = this.max();

    const branch = Node.createBranch({ parentIdx, children: [index + 1] });

    this.insert(idx, branch);
    this.insert(index + 1, Node.createLeaf({ title, parentIdx: branch.parent() }));
  }

  public extract(): TreeState {
    return this.state;
  }
}
