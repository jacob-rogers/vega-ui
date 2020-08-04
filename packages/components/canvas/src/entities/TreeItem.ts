import { BranchData, LeafData, Node } from './Node';
import { Notifiable } from './Notifier';
import { Tree } from './Tree';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Context = any;

type TreeItemChange<C = Context> = { context?: C };

export type TreeItemUpdate<C> =
  | { type: 'add-child'; idx: number; newChildIdx: number }
  | { type: 'remove'; idx: number }
  | { type: 'change'; idx: number; changes: TreeItemChange<C> }
  | { type: 'remove-child'; idx: number; removeChildIdx: number }
  | { type: 'set-parent'; idx: number; parentIdx: number }
  | { type: 'disconnect-parent'; idx: number };

export class TreeItem<C = Context> {
  readonly idx: number;

  private leaf: Node<C, LeafData<C>>;

  private tree: Tree;

  private notifier: Notifiable<TreeItemUpdate<C>>;

  constructor(idx: number, tree: Tree, notifier: Notifiable<TreeItemUpdate<C>>) {
    const node = tree.nth(idx);

    if (node === undefined || node.isBranch()) {
      throw new Error(
        `Невозможно создать DataView. По индексу "${idx}" получено несовместимое значение`,
      );
    }

    this.idx = idx;
    this.leaf = node as Node<C, LeafData<C>>;
    this.tree = tree;
    this.notifier = notifier;
  }

  public getChildren(): number[] {
    return this.leaf.getChildren();
  }

  public getParent(): number | undefined {
    return this.leaf.parent();
  }

  public getContext(): C {
    return this.leaf.getData().context;
  }

  public addChild(data: LeafData<C>): void {
    if (!this.leaf.isBranch()) {
      this.tree.toBranch(this.leaf);
    }

    const node = this.tree.nth(this.idx) as Node<C, BranchData<C>>;

    if (node) {
      this.tree.addChildToBranch<C>(node, data);

      const [index] = this.tree.max();
      this.notifier.notify({
        idx: this.idx,
        type: 'add-child',
        newChildIdx: index,
      });
    }
  }

  public remove(): void {
    const leafIdx = this.tree.indexOf(this.leaf);
    this.tree.remove(leafIdx);
  }

  public removeChild(idx: number): void {
    this.leaf.removeChild(idx);
    this.notifier.notify({
      type: 'remove-child',
      idx: this.idx,
      removeChildIdx: idx,
    });
  }

  public setContext(context: C): void {
    this.leaf.setData({ context });
    this.notifier.notify({
      type: 'change',
      idx: this.idx,
      changes: { context },
    });
  }

  public setParent(parentIdx: number): void {
    this.tree.connectToParent(this.idx, parentIdx);
    this.notifier.notify({
      type: 'set-parent',
      idx: this.idx,
      parentIdx,
    });
  }

  public disconnectParrent(): void {
    this.tree.disconnectFromParent(this.idx);
    this.notifier.notify({
      type: 'disconnect-parent',
      idx: this.idx,
    });
  }
}
