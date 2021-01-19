import React from 'react';

import { cnForm } from '../cn-form';

type DivProps = JSX.IntrinsicElements['div'];
export interface FormRowProps extends DivProps {
  col?: '1' | '2' | '3' | '4';
  space?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'none';
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'none';
  className?: string;
}

export const FormRow: React.FC<FormRowProps> = ({
  col = '1',
  space = 'l',
  gap = 'l',
  className,
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
