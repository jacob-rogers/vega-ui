import React from 'react';

import { cnForm } from '../FormCn';

type Props = {
  className?: string;
  col?: '1' | '2' | '3' | '4';
  as?: React.ElementType;
  space?: 'm' | 'l' | 'xl' | 'none';
  gap?: 'm' | 'l' | 'xl' | 'none';
};

export const FormRow: React.FC<Props> = ({
  className,
  col = '1',
  as = 'div',
  gap = 'l',
  space = 'l',
  children,
  ...props
}) => {
  const Component = as;
  const cn = cnForm('Row', { col, space, gap }).mix(className);

  return (
    <Component className={cn} {...props}>
      {children}
    </Component>
  );
};
