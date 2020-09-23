import * as React from 'react';
import { File as BaseFile } from '@consta/uikit/File';

type FileProps = React.ComponentProps<typeof BaseFile>;

export const File: React.FC<FileProps> = (props) => {
  return <BaseFile {...props} />;
};
