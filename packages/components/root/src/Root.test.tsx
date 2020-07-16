import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Root, RootProps, usePortal, useTheme } from './Root';

const TestComponent = (): React.ReactElement => {
  const { theme, setTheme } = useTheme();

  const { portal } = usePortal({ name: 'default' });
  usePortal({ name: 'second' });

  return (
    <div>
      <span aria-label="Portal id">{portal?.id}</span>
      <span aria-label="Current theme">{theme}</span>
      <button aria-label="Set gpn-dark theme" type="button" onClick={(): void => setTheme('dark')}>
        Установить другую тему
      </button>
      <div id="portalContainer" />
    </div>
  );
};

function findThemeName(): HTMLElement {
  return screen.getByLabelText('Current theme');
}

function findUpdateThemeButton(): HTMLElement {
  return screen.getByLabelText('Set gpn-dark theme');
}

function renderComponent(props: Omit<RootProps, 'children'>): RenderResult {
  return render(
    <Root {...props}>
      <TestComponent />
    </Root>,
  );
}

describe('Root', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('Theme', () => {
    const defaultTheme = 'default';

    test('прокидывается тема', () => {
      renderComponent({ defaultTheme });

      expect(findThemeName().innerHTML).toBe(defaultTheme);
    });

    test('обновляется тема', () => {
      renderComponent({ defaultTheme });

      fireEvent.click(findUpdateThemeButton());

      expect(findThemeName().innerHTML).toBe('dark');
    });
  });

  describe('Portals', () => {
    test('создает порталы', () => {
      renderComponent({
        initialPortals: [{ name: 'default' }, { name: 'second' }],
      });

      const portals = ['default', 'second'];

      portals.forEach((portal) => {
        expect(document.body).toContainElement(document.getElementById(portal));
      });
    });

    test('хук usePortal получает созданные порталы', async () => {
      renderComponent({
        initialPortals: [{ name: 'default' }],
      });

      expect(await screen.getByLabelText('Portal id').innerHTML).toBe('default');
    });

    test('хук usePortal создает порталы, если они не были созданы', () => {
      renderComponent({
        initialPortals: [{ name: 'default' }],
      });

      expect(document.body).toContainElement(document.getElementById('second'));
    });

    test('порталы удаляются при анмаунте компонента', () => {
      const { unmount } = renderComponent({
        initialPortals: [{ name: 'default' }, { name: 'second' }],
      });

      const portals = ['default', 'second'];

      unmount();

      portals.forEach((portal) => {
        expect(document.body).not.toContainElement(document.getElementById(portal));
      });
    });

    test('на порталы прокидывается className', () => {
      renderComponent({
        initialPortals: [{ name: 'default', className: 'defaultClassName' }],
      });

      expect(document.getElementById('default')?.className).toBe('defaultClassName');
    });

    test('портал рендерится в корректной ноде', async () => {
      const { container } = renderComponent({
        initialPortals: [{ name: 'default', parentSelector: '#portalContainer' }],
      });

      expect(container.querySelector('#portalContainer')).toContainElement(
        container.querySelector('#default'),
      );
    });
  });
});
