import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import { Hotkey } from './Hotkey';
import { HotkeyData } from './types';

function renderComponent(data: HotkeyData): RenderResult {
  return render(<Hotkey hotkey={data} />);
}

describe('Hotkey', () => {
  test('отображается без ошибок', () => {
    const hotkeyData = {
      keys: [['ЛКМ']],
      description: 'Выделение области',
    };

    renderComponent(hotkeyData);

    const key = screen.getByText('ЛКМ');
    expect(key).toBeVisible();

    const description = screen.getByText('Выделение области');
    expect(description).toBeVisible();
  });

  test('отображаются несколько горячих клавиш', () => {
    const hotkeyData = {
      keys: [['ЛКМ'], ['ПКМ'], ['Ctrl']],
      description: 'Выделение области',
    };

    renderComponent(hotkeyData);

    hotkeyData.keys.forEach((key) => {
      const keyElement = screen.getByText(key[0]);
      expect(keyElement).toBeVisible();
    });

    const dividers = screen.getAllByText('или');
    expect(dividers.length).toBe(hotkeyData.keys.length - 1);
  });

  test('отображается комбинация горячих клавиш', () => {
    const hotkeyData = {
      keys: [
        ['ЛКМ', 'ПКМ'],
        ['Ctrl', 'Alt'],
      ],
      description: 'Выделение области',
    };

    renderComponent(hotkeyData);

    hotkeyData.keys.forEach((key) => {
      const firstElement = screen.getByText(key[0]);
      expect(firstElement).toBeVisible();

      const secondElement = screen.getByText(key[1]);
      expect(secondElement).toBeVisible();
    });

    const dividers = screen.getAllByText('+');
    expect(dividers.length).toBe(2);
  });
});
