import React from 'react';

import { cnForm } from './cn-form';
import { FormField } from './FormField';
import { FormFieldset } from './FormFieldset';
import { FormLabel } from './FormLabel';
import { FormLegend } from './FormLegend';
import { FormRow } from './FormRow';

import './Form.css';

export type FormProps = {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
} & JSX.IntrinsicElements['form'];

type FormType = React.FC<FormProps> & {
  Row: typeof FormRow;
  Label: typeof FormLabel;
  Fieldset: typeof FormFieldset;
  Field: typeof FormField;
  Legend: typeof FormLegend;
};

export const Form: FormType = ({ children, className, onSubmit, ...props }) => {
  const cn = cnForm.mix(className);

  return (
    <form className={cn} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

Form.Row = FormRow;
Form.Label = FormLabel;
Form.Fieldset = FormFieldset;
Form.Field = FormField;
Form.Legend = FormLegend;
