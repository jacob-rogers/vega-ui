import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { cnCanvas } from '../../cn-canvas';

import { hotkeys } from './constants';
import { HotkeyPrompt } from './HotkeyPrompt';

function renderComponent(): RenderResult {
  return render(<HotkeyPrompt />);
}

const openPrompt = () => {
  const promptButton = screen.getByRole('button', { name: 'Подсказка по сокращениям клавиш' });
  userEvent.click(promptButton);
};

describe('HotkeyPrompt', () => {
  test('отображается без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('открывается модальное окно', () => {
    renderComponent();

    let promptHeader = screen.queryByText('Горячие клавиши');
    expect(promptHeader).toBeNull();

    openPrompt();

    promptHeader = screen.queryByText('Горячие клавиши');
    expect(promptHeader).toBeVisible();
  });

  test('отображается весь список горячих клавиш', () => {
    const { baseElement } = renderComponent();
    openPrompt();

    const hotkeyPromptItems = baseElement.querySelectorAll(`.${cnCanvas('HotkeyPromptItem')}`);

    expect(hotkeyPromptItems.length).toBe(hotkeys.length);
  });
});
