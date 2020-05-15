import React from 'react';
import { render } from '@testing-library/react';

import { useMount } from './use-mount';

const TestComponent: React.FC<{ onMount: Function }> = ({ onMount }) => {
  useMount(() => {
    onMount();
  });

  return <div>test component</div>;
};

describe('useMount', () => {
  test('вызывает функцию при маунте', () => {
    const handleMount = jest.fn();

    render(<TestComponent onMount={handleMount} />);

    expect(handleMount).toBeCalled();
  });
});
