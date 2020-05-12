export class AppContainerManager {
  public portalRootId = 'portalRootSelector';

  public rootId = 'rootSelector';

  constructor(rootId: string, portalRootId: string) {
    this.portalRootId = portalRootId;
    this.rootId = rootId;
  }

  public createPortalRoot(params?: { className?: string }): Element {
    if (this.getPortalRoot() === null) {
      const portalRoot = document.createElement('div');
      portalRoot.id = this.portalRootId;
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
    return document.querySelector(`#${this.portalRootId}`);
  }

  public getRoot(): Element | null {
    return document.querySelector(`#${this.rootId}`);
  }

  updatePortalRootClassName(className: string): void {
    const portalRoot = this.getPortalRoot();
    if (portalRoot) {
      portalRoot.className = className;
    }
  }
}
