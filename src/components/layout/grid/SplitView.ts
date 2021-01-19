import { Cursor } from './Cursor';
import { Branch, Node } from './Node';
import { Notifiable } from './Notifier';
import { Split } from './Split';
import { Tree } from './Tree';

export type SplitViewUpdate = { type: 'change'; idx: number; changes: { breakpoint: number } };

export class SplitView {
  readonly idx: number;

  readonly split: Split;

  private branch: Branch;

  private notifier: Notifiable<SplitViewUpdate>;

  private cursor: Cursor;

  constructor(idx: number, tree: Tree, notifier: Notifiable<SplitViewUpdate>) {
    const node = tree.nth(idx);

    if (node === undefined || Node.isLeaf(node)) {
      throw new Error(
        `Невозможно создать SplitView. По индексу "${idx}" получено несовместимое значение`,
      );
    }

    this.idx = idx;
    this.branch = node;
    this.split = Split.of(node.data.splitDirection);
    this.notifier = notifier;
    this.cursor = Cursor.of(idx);
  }

  getBreakpoint(): number {
    return this.branch.data.breakpoint;
  }

  setBreakpoint(breakpoint: number): void {
    this.branch.data.breakpoint = breakpoint;
    this.notifier.notify({
      idx: this.idx,
      type: 'change',
      changes: { breakpoint },
    });
  }

  firstChildIdx(): number {
    return this.cursor.left();
  }

  secondChildIdx(): number {
    return this.cursor.right();
  }
}
