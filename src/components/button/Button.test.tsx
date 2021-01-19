import React from 'react';
import { render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('рендерит label', () => {
    const { getByText } = render(<Button label="Test label" />);

    expect(getByText('Test label')).toBeInTheDocument();
  });
});
