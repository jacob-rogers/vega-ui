import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Logo, LogoProps } from './Logo';

type renderProps = Partial<LogoProps>;

function renderComponent(props: renderProps = {}): RenderResult {
  return render(<Logo {...props} />);
}

describe('Logo', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
