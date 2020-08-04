import { BranchData, LeafData, Node } from './Node';

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

  static create(state: TreeState): Tree {
    return Tree.of(state);
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
    if (idx === 0) {
      throw new Error('Нельзя удалить корневой элемент');
    }

    const node = this.nth(idx);

    const parentIdx = node?.parent();

    if (!node) {
      return;
    }

    if (parentIdx) {
      const parent = this.nth(parentIdx);
      if (parent !== undefined && parent.isBranch()) {
        parent.removeChild(idx);
      }
    }

    delete this.state[idx];
  }

  public toBranch<T>(node: Node<T, LeafData<T>>): void {
    if (node === undefined || node.isBranch()) {
      return;
    }

    const branch = Node.createBranch<T>({
      parentIdx: node.parent(),
      children: [],
      context: node.getData().context,
    });

    this.insert(this.indexOf(node), branch);
  }

  public addChildToBranch<T>(
    branch: Node<T, BranchData<T>>,
    data: Omit<LeafData<T>, 'parentIdx'>,
  ): void {
    const leafIndex = this.insertNewLeaf<T>(Node.createLeaf<T>(data));
    branch.addChild(leafIndex);
  }

  public insertNewLeaf<T>(leaf: Node<T, LeafData<T>>): number {
    const [max] = this.max();
    const leafIndex = max + 1;

    this.insert(max + 1, leaf);

    return leafIndex;
  }

  public connectToParent(childIdx: number, parentIdx: number): void {
    const parent = this.nth(parentIdx);

    const child = this.nth(childIdx);

    if (childIdx === 0) {
      throw new Error('Невозможно добавить родителя к корневому узлу');
    }

    if (!parent || !child) {
      throw new Error('Узлы не найдены');
    }

    if (!parent.isBranch()) {
      return;
    }

    parent.addChild(childIdx);
    child.setParent(parentIdx);
  }

  public disconnectFromParent(childIdx: number): void {
    const child = this.nth(childIdx);

    if (!child) {
      throw new Error(`Элемент с индексом ${childIdx} не найден`);
    }

    const parentIdx = child.parent();

    if (parentIdx === undefined) {
      throw new Error(`Родитель у элемента ${childIdx} не найден`);
    }

    const parent = this.nth(parentIdx);

    if (!parent) {
      throw new Error(`Родитель с индексом ${parentIdx} не найден`);
    }

    parent.removeChild(childIdx);
    child.setParent(undefined);
  }

  public extract(): TreeState {
    return this.state;
  }
}
