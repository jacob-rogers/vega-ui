import React from 'react';

import '@testing-library/jest-dom';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) => {
    if (props.in === true || props.in === undefined) {
      return <FakeTransition>{props.children}</FakeTransition>;
    }

    return null;
  });

  const FakeTransitionGroup = jest.fn(({ children }) => <div>{children}</div>);

  return {
    Transition: FakeTransition,
    CSSTransition: FakeCSSTransition,
    SwitchTransition: FakeTransition,
    TransitionGroup: FakeTransitionGroup,
  };
});

beforeAll(() => {
  // @ts-expect-error: TODO добавить причину использования исключения
  global.ResizeObserver = class ResizeObserver {
    // eslint-disable-next-line class-methods-use-this
    observe(): void {}

    // eslint-disable-next-line class-methods-use-this
    unobserve(): void {}

    // eslint-disable-next-line class-methods-use-this
    disconnect(): void {}
  };
});

afterAll(() => {
  // @ts-expect-error: TODO добавить причину использования исключения
  delete global.ResizeObserver;
});
