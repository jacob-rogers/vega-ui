import React from 'react';
import { render } from '@testing-library/react';

import { AppContainer } from './AppContainer';
import { AppContainerManager } from './AppContainerManager';

const containerId = 'root';
const portalcontainerId = 'portalRoot';

export const appContainerManager = new AppContainerManager(containerId, portalcontainerId);

afterEach(() => {
  appContainerManager.removePortalRoot();
});

describe('AppContainerManager', () => {
  describe('createPortalRoot', () => {
    test('возвращает корректный элемент', () => {
      const portalRoot = appContainerManager.createPortalRoot();

      expect(portalRoot.id).toBe(portalcontainerId);
    });

    test('прокидывается className', () => {
      const portalRoot = appContainerManager.createPortalRoot({ className: 'test-class' });

      expect(portalRoot.className).toBe('test-class');
    });
  });

  describe('updatePortalRootClassName', () => {
    test('обновляется className', () => {
      const portalRoot = appContainerManager.createPortalRoot();
      appContainerManager.updatePortalRootClassName('new-class-name');
      expect(portalRoot.className).toBe('new-class-name');
    });
  });

  describe('updateRootClassName', () => {
    test('обновляется className', () => {
      render(
        <AppContainer appContainerManager={appContainerManager} className="test-classname">
          test
        </AppContainer>,
      );

      const root = appContainerManager.getContainer();
      appContainerManager.updateRootClassName('new-class-name');
      expect(root?.className).toBe('new-class-name');
    });
  });

  describe('getContainer', () => {
    test('возвращает корректный root selector', () => {
      render(<AppContainer appContainerManager={appContainerManager}>test</AppContainer>);
      const root = appContainerManager.getContainer();
      expect(root?.id).toBe(containerId);
    });
  });

  describe('removePortalRoot', () => {
    test('удаляет portalNode', () => {
      appContainerManager.createPortalRoot();
      appContainerManager.removePortalRoot();

      expect(appContainerManager.getPortalRoot()).toBe(null);
    });

    test('удаляется portalRoot при анмаунте', () => {
      const { unmount } = render(
        <AppContainer appContainerManager={appContainerManager}>test</AppContainer>,
      );

      unmount();
      expect(appContainerManager.getPortalRoot()).toBe(null);
    });
  });
});
