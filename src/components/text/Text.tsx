import React from 'react';
import { Text as BaseText } from '@consta/uikit/Text';

type TextProps = React.ComponentProps<typeof BaseText>;

export const Text: React.FC<TextProps> = (props) => {
  return <BaseText {...props} />;
};
