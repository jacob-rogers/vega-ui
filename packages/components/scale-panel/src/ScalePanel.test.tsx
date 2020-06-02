import React from 'react';
import { render } from '@testing-library/react';

import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  test('рендерится без ошибок', () => {
    render(
      <ScalePanel data-testid="scalePanelTestId">
        <button type="button">Кнопка</button>
      </ScalePanel>,
    );
  });
});
