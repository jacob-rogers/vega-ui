import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { Base } from './Base';

import './Appearance.css';

export type AppearanceProps = {
  side: 'left' | 'right' | 'top' | 'bottom';
} & Partial<React.ComponentProps<typeof CSSTransition>>;

export const Appearance: React.FC<AppearanceProps> = ({
  side,
  timeout = 300,
  appear,
  children,
  ...rest
}) => {
  const appearClassNames = {
    appear: `is-appear-${side}-enter`,
    appearActive: `is-appear-${side}-enter-active`,
  };

  const cssTransitionClassNames = {
    enter: `is-${side}-enter`,
    enterActive: `is-${side}-enter-active`,
    exit: `is-${side}-exit`,
    exitActive: `is-${side}-exit-active`,

    ...(appear
      ? /* istanbul ignore next: классы в тестах не прокидываются */ appearClassNames
      : {}),
  };

  return (
    <Base
      timeout={timeout}
      appear={appear}
      cssTransitionClassNames={cssTransitionClassNames}
      {...rest}
    >
      {children}
    </Base>
  );
};
