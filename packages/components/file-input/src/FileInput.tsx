import React, { ChangeEvent } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { block } from 'bem-cn';

import './FileInput.css';

type ButtonProps = React.ComponentProps<typeof Button>;

export type FileInputProps = JSX.IntrinsicElements['input'] & {
  className?: string;
  id: string;
  onChange?: (e: DragEvent | ChangeEvent) => void;
  children?: (props: ButtonProps) => React.ReactNode | React.ReactNode;
};

const cnFileInput = block('VegaFileInput');

export const FileInput: React.FC<FileInputProps> = (props) => {
  const { className, id, onChange, children, ...inputProps } = props;

  const content =
    typeof children === 'function' ? children({ role: 'button', as: 'span' }) : children;

  return (
    <label htmlFor={id} className={cnFileInput.mix(className)}>
      <input
        {...inputProps}
        className={cnFileInput('Input')}
        type="file"
        id={id}
        onChange={onChange}
        aria-label="File input"
      />
      {content}
    </label>
  );
};
