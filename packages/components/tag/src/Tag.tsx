import * as React from 'react';
import { Tag as BaseTag } from '@gpn-design/uikit/Tag';

export type TagProps = React.ComponentProps<typeof BaseTag>;

export const Tag: React.FC<TagProps> = (props) => {
  return <BaseTag {...props} />;
};
