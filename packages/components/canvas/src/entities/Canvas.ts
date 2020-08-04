import { Node } from './Node';
import { Listener, Notifier } from './Notifier';
import { Tree, TreeState } from './Tree';
import { TreeItem, TreeItemUpdate } from './TreeItem';

type Context = {
  title: string;
  type: 'root' | 'item';
};

export class Canvas {
  private tree: Tree;

  private notifier: Notifier<TreeItemUpdate<Context>> = new Notifier();

  private constructor(tree: Tree) {
    this.tree = tree;
  }

  static create(state?: TreeState): Canvas {
    const treeState = state ?? {
      0: Node.createLeaf<Context>({
        context: {
          title: 'Начало',
          type: 'root',
        },
      }),
    };

    return new Canvas(Tree.create(treeState));
  }

  public extract(): TreeState {
    return this.tree.extract();
  }

  public addListener(listener: Listener<TreeItemUpdate<Context>>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }

  public get(idx: number): TreeItem<Context> {
    const node = this.tree.nth(idx);

    if (node === undefined) {
      throw new Error(`Элемента с индексом "${idx}" не существует`);
    }

    return new TreeItem(idx, this.tree, this.notifier);
  }
}
