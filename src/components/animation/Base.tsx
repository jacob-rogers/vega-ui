import React from 'react';
import { CSSTransition } from 'react-transition-group';

type CSSTransitionProps = React.ComponentProps<typeof CSSTransition>;
type CSSTransitionClassNames = Exclude<CSSTransitionProps['classNames'], string | undefined>;
type Timeout = Exclude<CSSTransitionProps['timeout'], undefined>;

export type BaseProps = {
  timeout?: Timeout;
  cssTransitionClassNames: CSSTransitionClassNames;
} & Partial<React.ComponentProps<typeof CSSTransition>>;

export const Base: React.FC<BaseProps> = ({ cssTransitionClassNames, children, ...rest }) => {
  const timeout = rest.timeout ?? /* istanbul ignore next: стили в тестах не прокидываются */ 300;
  let appearTimeout;
  let enterTimeout;
  let exitTimeout;

  if (typeof timeout === 'number') {
    appearTimeout = timeout;
    enterTimeout = timeout;
    exitTimeout = timeout;
  } /* istanbul ignore next: стили в тестах не прокидываются */ else {
    appearTimeout = timeout.appear;
    enterTimeout = timeout.enter;
    exitTimeout = timeout.exit;
  }

  return (
    <CSSTransition
      style={{
        '--transition-duration-appear': `${appearTimeout}ms`,
        '--transition-duration-enter': `${enterTimeout}ms`,
        '--transition-duration-exit': `${exitTimeout}ms`,
      }}
      timeout={timeout}
      classNames={cssTransitionClassNames}
      {...rest}
    >
      {children}
    </CSSTransition>
  );
};
