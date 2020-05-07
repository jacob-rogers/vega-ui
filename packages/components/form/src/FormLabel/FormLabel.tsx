import React from 'react';

import { cnForm } from '../FormCn';

type Props = {
  space?: '2xs' | 'xs' | 's';
  size?: 's' | 'l';
  inline?: boolean;
} & JSX.IntrinsicElements['label'];

export const FormLabel: React.FC<Props> = ({
  className,
  size = 's',
  children,
  htmlFor,
  space = 's',
  inline,
  ...props
}) => {
  const cn = cnForm('Label', { inline, space, size }).mix(className);

  return (
    <label htmlFor={htmlFor} className={cn} {...props}>
      {children}
    </label>
  );
};
