import React from 'react';
import { render } from '@testing-library/react';

import { AppContainer } from './AppContainer';
import { AppContainerManager } from './AppContainerManager';

const rootId = 'root';
const portalRootId = 'portalRoot';

export const appContainerManager = new AppContainerManager(rootId, portalRootId);

afterEach(() => {
  appContainerManager.removePortalRoot();
});

describe('AppContainerManager', () => {
  describe('createPortalRoot', () => {
    test('возвращает корректный элемент', () => {
      const portalRoot = appContainerManager.createPortalRoot();

      expect(portalRoot.id).toBe(portalRootId);
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

  describe('getRoot', () => {
    test('возвращает корректный root selector', () => {
      render(<AppContainer appContainerManager={appContainerManager}>test</AppContainer>);
      const root = appContainerManager.getRoot();
      expect(root?.id).toBe(rootId);
    });
  });

  describe('removePortalRoot', () => {
    test('удаляет portalNode', () => {
      appContainerManager.createPortalRoot();
      appContainerManager.removePortalRoot();

      expect(appContainerManager.getPortalRoot()).toBe(null);
    });
  });
});
