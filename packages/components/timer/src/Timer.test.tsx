import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Timer, TimerProps } from './Timer';

function renderComponent(props: TimerProps): RenderResult {
  return render(<Timer {...props} />);
}

describe('Timer', () => {
  test('рендерится без ошибок', () => {
    renderComponent({});
  });
});
