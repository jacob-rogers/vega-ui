import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { LayoutMenu, LayoutMenuProps } from './LayoutMenu';

const items = [
  { label: 'test', value: 'test' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
];

function renderComponent(
  props: Omit<LayoutMenuProps, 'items'> = { activeValue: '', onChange: jest.fn() },
): RenderResult {
  return render(<LayoutMenu {...props} items={items} />);
}

describe('LayoutMenu', () => {
  it('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('рендерится дропдаун', async () => {});
});
