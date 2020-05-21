export class AppContainerManager {
  public readonly portalcontainerId?: string;

  public readonly containerId: string;

  constructor(containerId: string, portalcontainerId?: string) {
    if (portalcontainerId) {
      this.portalcontainerId = portalcontainerId;
    }
    this.containerId = containerId;
  }

  public createPortalRoot(params?: { className?: string }): Element {
    if (this.getPortalRoot() === null && this.portalcontainerId) {
      const portalRoot = document.createElement('div');
      portalRoot.id = this.portalcontainerId;
      if (params && params.className) {
        portalRoot.className = params.className;
      }
      document.body.appendChild(portalRoot);
    }

    return this.getPortalRoot() as Element;
  }

  public removePortalRoot(): void {
    const portalRoot = this.getPortalRoot();

    if (portalRoot) {
      document.body.removeChild(portalRoot);
    }
  }

  public getPortalRoot(): Element | null {
    return document.querySelector(`#${this.portalcontainerId}`);
  }

  public getContainer(): Element | null {
    return document.querySelector(`#${this.containerId}`);
  }

  updatePortalRootClassName(className: string): void {
    const portalRoot = this.getPortalRoot();
    if (portalRoot) {
      portalRoot.className = className;
    }
  }

  updateRootClassName(className: string): void {
    const root = this.getContainer();
    if (root) {
      root.className = className;
    }
  }
}
