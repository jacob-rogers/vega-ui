import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Root, RootProps, useTheme } from './Root';

const TestComponent = (): React.ReactElement => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span aria-label="Current theme">{theme}</span>
      <button aria-label="Set gpn-dark theme" type="button" onClick={(): void => setTheme('dark')}>
        Установить другую тему
      </button>
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
  test.skip('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('Theme', () => {
    const defaultTheme = 'default';

    test.skip('прокидывается тема', () => {
      renderComponent({ defaultTheme });

      expect(findThemeName().innerHTML).toBe(defaultTheme);
    });

    test('обновляется тема', () => {
      renderComponent({ defaultTheme });

      fireEvent.click(findUpdateThemeButton());

      expect(findThemeName().innerHTML).toBe('dark');
    });
  });
});
