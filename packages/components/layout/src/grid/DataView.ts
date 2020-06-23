import { Leaf, Node } from './Node';
import { Notifiable } from './Notifier';
import { SplitDirection } from './Split';
import { Tree } from './Tree';

type Context = any; // eslint-disable-line @typescript-eslint/no-explicit-any

type DataViewChange = { widget: string } | { context: Context };

export type DataViewUpdate =
  | { type: 'split'; idx: number }
  | { type: 'close'; idx: number }
  | { type: 'change'; idx: number; changes: DataViewChange };

export class DataView {
  readonly idx: number;

  private leaf: Leaf;

  private tree: Tree;

  private notifier: Notifiable<DataViewUpdate>;

  constructor(idx: number, tree: Tree, notifier: Notifiable<DataViewUpdate>) {
    const node = tree.nth(idx);

    if (node === undefined || Node.isBranch(node)) {
      throw new Error(
        `Невозможно создать DataView. По индексу "${idx}" получено несовместимое значение`,
      );
    }

    this.idx = idx;
    this.leaf = node;
    this.tree = tree;
    this.notifier = notifier;
  }

  getWidgetName(): string | undefined {
    return this.leaf.data.widget;
  }

  getContext<T>(defaults: T): T {
    return this.leaf.data.context ?? defaults;
  }

  setWidgetName(name: string): void {
    this.leaf.data.widget = name;
    this.notifier.notify({
      idx: this.idx,
      type: 'change',
      changes: { widget: name },
    });
  }

  setContext(context: Context): void {
    this.leaf.data.context = context;
    this.notifier.notify({
      idx: this.idx,
      type: 'change',
      changes: { context },
    });
  }

  split(direction: SplitDirection): void {
    this.tree.toBranch(this.idx, direction);
    this.notifier.notify({
      idx: this.idx,
      type: 'split',
    });
  }

  close(): void {
    this.tree.remove(this.idx);
    this.notifier.notify({
      idx: this.idx,
      type: 'close',
    });
  }

  canClose(): boolean {
    return this.tree.root() !== this.leaf;
  }
}
