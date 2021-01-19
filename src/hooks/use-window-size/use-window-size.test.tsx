import React from 'react';
import { render } from '@testing-library/react';

import { useWindowSize } from './use-window-size';

const TestComponent: React.FC = () => {
  const windowSize = useWindowSize();

  const result =
    windowSize.width !== undefined && windowSize.height !== undefined
      ? `${windowSize.width},${windowSize.height}`
      : ``;

  return <div>{result}</div>;
};

describe('useWindowSize', () => {
  test('размер окна отображатеся в компоненте', () => {
    const { baseElement } = render(<TestComponent />);

    global.innerWidth = 10;
    global.innerHeight = 10;

    global.dispatchEvent(new Event('resize'));

    expect(baseElement.textContent).toEqual('10,10');
  });
});
