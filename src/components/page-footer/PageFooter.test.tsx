import React from 'react';
import { render } from '@testing-library/react';

import { PageFooter } from './PageFooter';

describe('PageFooter', () => {
  test('рендерится без ошибок', () => {
    render(
      <PageFooter data-testid="footerTestId">
        <button type="button">Кнопка</button>
      </PageFooter>,
    );
  });
});
