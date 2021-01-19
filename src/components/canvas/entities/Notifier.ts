export type Listener<T> = (update: T) => void;

export interface Notifiable<T> {
  notify(update: T): void;
}

export class Notifier<T> implements Notifiable<T> {
  private listeners: Listener<T>[] = [];

  public addListener(listener: Listener<T>): VoidFunction {
    this.listeners.push(listener);

    return (): void => {
      this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
  }

  public removeAllListeners(): void {
    this.listeners = [];
  }

  public notify(update: T): void {
    this.listeners.forEach((listener) => {
      listener(update);
    });
  }
}
