export type SplitDirection = 'up' | 'down' | 'left' | 'right';
export type SplitOrientation = 'vertical' | 'horizontal';

export class Split {
  private readonly direction: SplitDirection;

  static readonly HORIZONTAL = 'horizontal';

  static readonly VERTICAL = 'vertical';

  static of(direction: SplitDirection): Split {
    return new Split(direction);
  }

  private constructor(direction: SplitDirection) {
    this.direction = direction;
  }

  public getOrientation(): SplitOrientation {
    return this.direction === 'up' || this.direction === 'down' ? Split.VERTICAL : Split.HORIZONTAL;
  }

  public getDirection(): SplitDirection {
    return this.direction;
  }

  public isVertical(): boolean {
    return this.getOrientation() === 'vertical';
  }

  public isHorizontal(): boolean {
    return !this.isVertical();
  }

  public isBefore(): boolean {
    return this.direction === 'up' || this.direction === 'left';
  }

  public isAfter(): boolean {
    return !this.isBefore();
  }
}
