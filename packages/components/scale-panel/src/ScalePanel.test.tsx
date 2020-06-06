import React from 'react';
import { render } from '@testing-library/react';

import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  let onChange = jest.fn();

  beforeEach(() => {
    onChange = jest.fn();
  });

  test('рендерится без ошибок', () => {
    render(<ScalePanel currentScale={100} onChange={onChange} data-testid="scalePanelTestId" />);
  });
});
