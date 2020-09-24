import React from 'react';
import { render } from '@testing-library/react';

import { Fn } from '../use-mount/use-mount';

import { useUnmount } from './use-unmount';

const TestComponent: React.FC<{ onUnmount: Fn }> = ({ onUnmount }) => {
  useUnmount(() => {
    onUnmount();
  });

  return <div>test component</div>;
};

describe('useUnmount', () => {
  test('вызывает функцию при анмаунте', () => {
    const handleUnmount = jest.fn();
    const { unmount } = render(<TestComponent onUnmount={handleUnmount} />);

    expect(handleUnmount).toBeCalledTimes(0);

    unmount();

    expect(handleUnmount).toBeCalledTimes(1);
  });
});
