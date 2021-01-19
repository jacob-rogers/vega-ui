import * as React from 'react';
import { Badge as BaseBadge } from '@consta/uikit/Badge';

type BadgeProps = React.ComponentProps<typeof BaseBadge>;

export const Badge: React.FC<BadgeProps> = (props) => {
  return <BaseBadge {...props} />;
};
