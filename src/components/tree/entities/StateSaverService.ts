export type StorageNames = {
  hiddenElements: string;
};

export class StateSaverService {
  private readonly storageNames: StorageNames = {
    hiddenElements: 'hiddenElements',
  };

  private projectId?: string;

  setProjectId(projectId: string): void {
    this.projectId = projectId;
  }

  private getStorageNames(): StorageNames {
    if (this.projectId) {
      return {
        hiddenElements: `${this.storageNames.hiddenElements}-${this.projectId}`,
      };
    }

    return this.storageNames;
  }

  setHiddenElements(hiddenElementsIds: string[]): void {
    const { hiddenElements } = this.getStorageNames();

    sessionStorage.setItem(hiddenElements, JSON.stringify(hiddenElementsIds));
  }

  getHiddenElements(): string[] {
    const { hiddenElements } = this.getStorageNames();

    const elements = sessionStorage.getItem(hiddenElements);
    if (elements) {
      return JSON.parse(elements);
    }

    return [];
  }
}

export const stateSaverService = new StateSaverService();
