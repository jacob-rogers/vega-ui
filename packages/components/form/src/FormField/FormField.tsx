import React from 'react';

import { cnForm } from '../cn-form';

type FormFieldProps = JSX.IntrinsicElements['div'];

export const FormField: React.FC<FormFieldProps> = ({ className, children, ...props }) => {
  const cn = cnForm('Field').mix(className);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
