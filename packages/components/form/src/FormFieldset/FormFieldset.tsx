import React from 'react';

import { cnForm } from '../FormCn';

type Props = JSX.IntrinsicElements['fieldset'];

export const FormFieldset: React.FC<Props> = ({ className, children, ...props }) => {
  const cn = cnForm('Fieldset').mix(className);

  return (
    <fieldset className={cn} {...props}>
      {children}
    </fieldset>
  );
};
