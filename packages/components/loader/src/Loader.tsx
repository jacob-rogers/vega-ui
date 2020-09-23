import React from 'react';
import { Loader as BaseLoader } from '@consta/uikit/Loader';

export type LoaderProps = React.ComponentProps<typeof BaseLoader>;

export const Loader: React.FC<LoaderProps> = (props) => {
  return <BaseLoader {...props} />;
};
