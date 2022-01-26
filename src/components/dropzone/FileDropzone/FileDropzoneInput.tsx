import React from 'react';
import { Button } from '@consta/uikit/Button';
import { FileField } from '@consta/uikit/FileField';

import { IconAttach } from '../../icons';

import { cnFileDropzone } from './cn-file-dropzone';
import { useFileDropzoneProvider } from './FileDropzoneContext';

import './FileDropzone.css';

type FileDropzoneInputProps = React.ComponentProps<typeof FileField> & { label?: string };

export const FileDropzoneInput: React.FC<FileDropzoneInputProps> = ({
  className,
  label = 'Добавьте файл',
  id,
  ...rest
}) => {
  const { handleDrop } = useFileDropzoneProvider();
  return (
    <FileField {...rest} id={id} onChange={handleDrop} className={className}>
      {(buttonProps): React.ReactNode => (
        <Button
          size="s"
          iconSize="xs"
          label={label}
          iconLeft={IconAttach}
          view="ghost"
          className={cnFileDropzone('InputButton')}
          {...buttonProps}
        />
      )}
    </FileField>
  );
};
