import * as React from 'react';
import { Avatar as BaseAvatar } from '@consta/uikit/Avatar';

type AvatarProps = React.ComponentProps<typeof BaseAvatar>;

export const Avatar: React.FC<AvatarProps> = (props) => {
  return <BaseAvatar {...props} />;
};
