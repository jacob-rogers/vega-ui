import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { PortalParams } from './components';
import { Root, RootProps, usePortals, useRoot, useTheme } from './Root';

const TestComponent = (): React.ReactElement => {
  const { rootId } = useRoot();

  const { portalsState, updatePortals } = usePortals();

  const { theme, setTheme } = useTheme();

  const addPortal = (): void => {
    updatePortals({
      type: 'add',
      params: { 'id': 'random-id', 'className': 'randomClassName', 'aria-label': 'Random label' },
    });
  };

  const removePortal = (): void => {
    updatePortals({ type: 'remove', params: { id: portalsState.portals[0].id } });
  };

  return (
    <div>
      <span aria-label="Root id">{rootId}</span>
      <span aria-label="Current theme">{theme}</span>
      <span aria-label="Portals length">{portalsState.portals.length}</span>
      <button type="button" aria-label="Add portal" onClick={addPortal}>
        Добавить портал
      </button>
      <button type="button" aria-label="Remove portal" onClick={removePortal}>
        Удалить портал
      </button>
      <button
        aria-label="Set gpn-dark theme"
        type="button"
        onClick={(): void => setTheme('gpnDark')}
      >
        Установить другую тему
      </button>
    </div>
  );
};

function findRootId(): HTMLElement {
  return screen.getByLabelText('Root id');
}

function findPortalsCount(): HTMLElement {
  return screen.getByLabelText('Portals length');
}

function findAddPortalButton(): HTMLElement {
  return screen.getByLabelText('Add portal');
}

function findRemovePortalButton(): HTMLElement {
  return screen.getByLabelText('Remove portal');
}

function findThemeName(): HTMLElement {
  return screen.getByLabelText('Current theme');
}

function findUpdateThemeButton(): HTMLElement {
  return screen.getByLabelText('Set gpn-dark theme');
}

function renderComponent(props?: Omit<RootProps, 'children' | 'rootId'>): RenderResult {
  return render(
    <Root {...props} rootId="rootId">
      <TestComponent />
    </Root>,
  );
}

describe('Root', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('прокидывается корректный rootId', () => {
    renderComponent();

    const rootIdSpan = findRootId();

    expect(rootIdSpan.innerHTML).toBe('rootId');
  });

  describe('Portals', () => {
    const initialPortals: PortalParams[] = [
      { id: 'firstParam' },
      { id: 'secondParam' },
      { id: 'thirdParam' },
    ];

    test('корректно прокидывает порталы', () => {
      renderComponent({ initialPortals });

      expect(findPortalsCount().innerHTML).toBe(initialPortals.length.toString());
    });

    test('добавляются новые порталы', async () => {
      renderComponent({ initialPortals });

      fireEvent.click(findAddPortalButton());

      expect(findPortalsCount().innerHTML).toBe((initialPortals.length + 1).toString());

      const newPortal = await screen.findByLabelText('Random label');

      expect(newPortal.className).toBe('randomClassName');
    });

    test('удаляются порталы', async () => {
      renderComponent({ initialPortals });

      fireEvent.click(findRemovePortalButton());

      expect(findPortalsCount().innerHTML).toBe((initialPortals.length - 1).toString());
    });
  });

  describe('Theme', () => {
    const initialTheme = 'gpnDefault';

    test('прокидывается тема', () => {
      renderComponent({ initialTheme });

      expect(findThemeName().innerHTML).toBe(initialTheme);
    });

    test('обновляется тема', () => {
      renderComponent({ initialTheme });

      fireEvent.click(findUpdateThemeButton());

      expect(findThemeName().innerHTML).toBe('gpnDark');
    });
  });
});
