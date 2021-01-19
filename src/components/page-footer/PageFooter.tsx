import React from 'react';
import { block } from 'bem-cn';

import './PageFooter.css';

export const cnPageFooter = block('VegaPageFooter');

export type PageFooterProps = {
  className?: string;
};

export const PageFooter: React.FC<PageFooterProps> = ({ className, children, ...rest }) => {
  return (
    <footer className={cnPageFooter.mix(className)} {...rest}>
      {children}
    </footer>
  );
};
