export class Node<T = unknown> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: Partial<T>): void {
    this.data = { ...this.data, ...data };
  }
}
