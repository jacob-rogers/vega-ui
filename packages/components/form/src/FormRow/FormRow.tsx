import React from 'react';

import { cnForm } from '../cn-form';

export type FormRowProps = {
  className?: string;
  col?: '1' | '2' | '3' | '4';
  space?: 'm' | 'l' | 'xl' | 'none';
  gap?: 'm' | 'l' | 'xl' | 'none';
  children?: React.ReactNode;
};

export const FormRow: React.FC<FormRowProps> = ({
  className,
  col = '1',
  gap = 'l',
  space = 'l',
  children,
  ...props
}) => {
  const cn = cnForm('Row', { col, space, gap }).mix(className);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
