import React from 'react';
import { createPortal } from 'react-dom';
import { render, screen } from '@testing-library/react';

import { usePortals } from './use-portals';

type Props = {
  rootSelector: string;
};

const SomeComponent: React.FC<Props> = ({ rootSelector }) => {
  const { ref } = usePortals([{ name: 'rootSelector', parentSelector: rootSelector }]);

  const rootPortal = ref.current.rootSelector;

  if (!rootPortal) {
    return null;
  }

  return createPortal(<div data-testid="portal-component">test component</div>, rootPortal);
};

describe('usePortals', () => {
  test('компонент рендерится', () => {
    render(<SomeComponent rootSelector="body" />);
    expect(screen.getByTestId('portal-component')).toBeInTheDocument();
  });
});
