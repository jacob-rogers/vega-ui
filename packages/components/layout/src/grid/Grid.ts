import { DataView, DataViewUpdate } from './DataView';
import { Node } from './Node';
import { Listener, Notifier } from './Notifier';
import { SplitView, SplitViewUpdate } from './SplitView';
import { Tree, TreeState } from './Tree';

export type GridView = DataView | SplitView;
export type GridUpdate = DataViewUpdate | SplitViewUpdate;
export type GridState = TreeState;

export class Grid {
  private tree: Tree;

  private notifier: Notifier<GridUpdate>;

  static create(state?: GridState): Grid {
    return new Grid(Tree.create(state));
  }

  static isDataView(view: GridView): view is DataView {
    return view instanceof DataView;
  }

  static isSplitView(view: GridView): view is SplitView {
    return view instanceof SplitView;
  }

  private constructor(tree: Tree) {
    this.tree = tree;
    this.notifier = new Notifier();
  }

  public extract(): GridState {
    return this.tree.extract();
  }

  public addListener(listener: Listener<GridUpdate>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }

  public get(idx: number): GridView {
    const node = this.tree.nth(idx);

    if (node === undefined) {
      throw new Error(`Элемента с индексом "${idx}" не существует`);
    }

    if (Node.isLeaf(node)) {
      return new DataView(idx, this.tree, this.notifier);
    }

    return new SplitView(idx, this.tree, this.notifier);
  }
}
