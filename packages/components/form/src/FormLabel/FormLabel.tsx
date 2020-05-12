import React from 'react';

import { cnForm } from '../cn-form';

type FormLabelProps = {
  className?: string;
  space?: '2xs' | 'xs' | 's' | 'none';
  size?: 's' | 'l';
  htmlFor?: string;
  children?: React.ReactNode;
} & JSX.IntrinsicElements['label'];

export const FormLabel: React.FC<FormLabelProps> = ({
  className,
  size = 's',
  children,
  htmlFor,
  space = 's',
  ...props
}) => {
  const cn = cnForm('Label', { space, size }).mix(className);

  return (
    <label htmlFor={htmlFor} className={cn} {...props}>
      {children}
    </label>
  );
};
