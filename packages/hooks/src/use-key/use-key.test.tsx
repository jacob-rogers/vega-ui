import React from 'react';
import { render } from '@testing-library/react';

import { useKey } from './use-key';

const defaultEventListener = document.addEventListener;

type Props = {
  onKeyClick: (e: KeyboardEvent) => void;
  keyevent: 'keyup' | 'keydown' | 'keypress';
};

afterEach(() => {
  document.addEventListener = defaultEventListener;
});

const SomeComponent: React.FC<Props> = ({ onKeyClick, keyevent = 'keyup' }) => {
  useKey('Enter', onKeyClick, { keyevent });
  return <div>test component</div>;
};

describe('useKey', () => {
  test('callback вызывается, если кликнули на Enter', () => {
    const eventsMap: Record<string, EventListener> = {};
    const onKeyClick = jest.fn();

    document.addEventListener = jest.fn((event, cb: EventListener) => {
      eventsMap[event] = cb;
    });

    const { rerender } = render(<SomeComponent keyevent="keydown" onKeyClick={onKeyClick} />);

    const enterEvent = new KeyboardEvent('keydown', {
      bubbles: true,
      key: 'Enter',
      code: 'Enter',
    });

    eventsMap.keydown(enterEvent);

    expect(onKeyClick).toBeCalled();

    onKeyClick.mockReset();

    rerender(<SomeComponent keyevent="keyup" onKeyClick={onKeyClick} />);

    eventsMap.keyup(
      new KeyboardEvent('keyup', {
        bubbles: true,
        key: 'Enter',
        code: 'Enter',
      }),
    );

    expect(onKeyClick).toBeCalled();
  });
});
