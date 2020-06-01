import React from 'react';
import { render } from '@testing-library/react';

import { PortalsRoot } from './PortalsRoot';

describe('PortalsRoot', () => {
  render(<PortalsRoot containerId="container-id" className="test-classname" />);

  test('создает контейнер', () => {
    expect(document.getElementById('container-id')).toBeInTheDocument();
  });

  test('прокидывает className', () => {
    expect(document.getElementById('container-id')?.className).toBe('test-classname');
  });
});
