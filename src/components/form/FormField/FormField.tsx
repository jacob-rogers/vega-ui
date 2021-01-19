import React from 'react';

import { cnForm } from '../cn-form';

type DivProps = JSX.IntrinsicElements['div'];
export interface FormFieldProps extends DivProps {
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ className, children, ...props }) => {
  const cn = cnForm('Field').mix(className);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
