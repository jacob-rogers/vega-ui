import { Listener, Notifier } from './Notifier';

export class Notifiable<T> {
  protected notifier = new Notifier<T>();

  public addListener(listener: Listener<T>): VoidFunction {
    return this.notifier.addListener(listener);
  }

  public removeAllListeners(): void {
    this.notifier.removeAllListeners();
  }
}
