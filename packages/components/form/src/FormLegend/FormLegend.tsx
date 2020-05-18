import React from 'react';

import { cnForm } from '../cn-form';

type FormLegendProps = {
  className?: string;
  space?: '2xs' | 'xs' | 's' | 'none';
  size?: 's' | 'l';
  children?: React.ReactNode;
} & JSX.IntrinsicElements['legend'];

export const FormLegend: React.FC<FormLegendProps> = ({
  className,
  size = 's',
  children,
  space = 's',
  ...props
}) => {
  const cn = cnForm('Legend', { space, size }).mix(className);

  return (
    <legend className={cn} {...props}>
      {children}
    </legend>
  );
};
