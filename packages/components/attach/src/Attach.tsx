import React from 'react';
import { Attach as BaseAttach } from '@gpn-design/uikit/Attach';

export type AttachProps = React.ComponentProps<typeof BaseAttach>;

export const Attach: React.FC<AttachProps> = (props) => {
  return <BaseAttach {...props} />;
};
