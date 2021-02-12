import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { LayoutMenuList, LayoutMenuListProps } from './LayoutMenuList';

function renderComponent(props: LayoutMenuListProps = {}): RenderResult {
  return render(<LayoutMenuList {...props} />);
}

describe('LayoutMenuList', () => {
  it('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
