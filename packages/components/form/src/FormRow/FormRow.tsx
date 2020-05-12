import React from 'react';

import { cnForm } from '../cn-form';

type FormRowProps = {
  className?: string;
  col?: '1' | '2' | '3' | '4';
  as?: keyof JSX.IntrinsicElements;
  space?: 'm' | 'l' | 'xl' | 'none';
  gap?: 'm' | 'l' | 'xl' | 'none';
  children?: React.ReactNode;
};

export const FormRow: React.FC<FormRowProps> = ({
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
