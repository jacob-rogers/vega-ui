import { Position } from '../types';

export type StorageNames = {
  canvasScale: string;
  canvasScrollPosition: string;
};

export class ScreenSaverService {
  private readonly storageNames: StorageNames = {
    canvasScale: 'canvas-scale',
    canvasScrollPosition: 'canvas-scroll-position',
  };

  public savedScreenId?: string;

  private getStorageNames(): StorageNames {
    if (this.savedScreenId) {
      return {
        canvasScale: `${this.storageNames.canvasScale}-${this.savedScreenId}`,
        canvasScrollPosition: `${this.storageNames.canvasScrollPosition}-${this.savedScreenId}`,
      };
    }

    return this.storageNames;
  }

  public setSavedScreenId(id: string | undefined): void {
    if (id === this.savedScreenId) {
      return;
    }

    this.savedScreenId = id;
  }

  public setCanvasScale(scale: number): void {
    const { canvasScale } = this.getStorageNames();

    sessionStorage.setItem(canvasScale, String(scale));
  }

  public setCanvasScrollPosition(position: Position): void {
    const { canvasScrollPosition } = this.getStorageNames();

    sessionStorage.setItem(canvasScrollPosition, JSON.stringify(position));
  }

  public getCanvasScale(): string | null {
    const { canvasScale } = this.getStorageNames();

    return sessionStorage.getItem(canvasScale);
  }

  public getCanvasScrollPosition(): string | null {
    const { canvasScrollPosition } = this.getStorageNames();

    return sessionStorage.getItem(canvasScrollPosition);
  }
}

export const screenSaverService = new ScreenSaverService();
