import React from 'react';
import { FileField as BaseFileField } from '@consta/uikit/FileField';

export type FileInputProps = React.ComponentProps<typeof BaseFileField>;

export const FileInput: React.FC<FileInputProps> = (props) => {
  return <BaseFileField {...props} />;
};
