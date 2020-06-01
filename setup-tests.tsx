import React from 'react';

import '@testing-library/jest-dom';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null,
  );
  const FakeTransitionGroup = jest.fn(({ children }) => <div>{children}</div>);

  return {
    Transition: FakeTransition,
    CSSTransition: FakeCSSTransition,
    TransitionGroup: FakeTransitionGroup,
  };
});
