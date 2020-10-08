import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';

import { useOnClickOutside } from './use-on-click-outside';

const defaultEventListener = document.addEventListener;

type Props = {
  onClickOutside: (e: MouseEvent | TouchEvent) => void;
};

const HookedComponent: React.FC<Props> = ({ onClickOutside }) => {
  const ref = useRef(null);

  useOnClickOutside({ ref, handler: onClickOutside });

  return (
    <>
      <div ref={ref} data-testid="div-test-id">
        test-div
      </div>
      <button type="button" data-testid="button-test-id">
        test-button
      </button>
    </>
  );
};

afterEach(() => {
  document.addEventListener = defaultEventListener;
});

const handleClickOutside = jest.fn();

beforeEach(() => {
  handleClickOutside.mockReset();
});

describe('useOnClickOutside', () => {
  test('коллбек не вызывается, если кликнули на элемент, который обернут в хук', () => {
    const eventsMap: Record<string, EventListener> = {};

    document.addEventListener = jest.fn((event, cb: EventListener) => {
      eventsMap[event] = cb;
    });

    render(<HookedComponent onClickOutside={handleClickOutside} />);

    const div = screen.getByTestId('div-test-id');

    const event: MouseEvent = new MouseEvent('click');

    eventsMap.click({ ...event, target: div });

    expect(handleClickOutside).not.toBeCalled();
  });

  test('коллбек вызывается, если кликнули вне обернутого элемента', () => {
    const eventsMap: Record<string, EventListener> = {};

    document.addEventListener = jest.fn((event, cb: EventListener) => {
      eventsMap[event] = cb;
    });

    render(<HookedComponent onClickOutside={handleClickOutside} />);

    const button = screen.getByTestId('button-test-id');

    const event: MouseEvent = new MouseEvent('click');

    eventsMap.click({ ...event, target: button });

    expect(handleClickOutside).toBeCalled();
  });
});
