import { Node } from './Node';

export class Tree<T = unknown> {
  private node: Node<T>;

  private constructor(node: Node<T>) {
    this.node = node;
  }

  public extract(): Node<T> {
    return this.node;
  }

  static of<T = unknown>(node: Node<T>): Tree<T> {
    return new Tree(node);
  }

  public getData(): T {
    return this.node.getData();
  }

  public getId(): string {
    return this.node.getId();
  }

  public setData(data: T): void {
    this.node.setData(data);
  }

  public iterate(fn: (node: Node<T>) => void): void {
    const iterator = (node: Node<T>): void => {
      fn(node);
      const children = node.getChildren();
      children.forEach(iterator);
    };

    iterator(this.node);
  }

  public getChildren(): Tree<T>[] {
    return this.node.getChildren().map((node) => new Tree(node));
  }

  public getParent(): Tree<T> | null {
    const parent = this.node.getParent();
    if (parent) {
      return new Tree(parent);
    }
    return null;
  }

  public addChild(tree: Tree<T>): void {
    this.node.addChild(tree.extract());
  }

  public setParent(tree: Tree<T> | null): void {
    const currentParent = this.getParent();
    if (currentParent instanceof Tree) {
      currentParent.removeChild(this);
    }
    if (tree) {
      tree.addChild(this);
    }
    this.node.setParent(tree ? tree.extract() : tree);
  }

  public removeChild(tree: Tree<T>): void {
    this.node.removeChild(tree.extract());
  }

  public remove(): void {
    this.node.remove();
  }
}
