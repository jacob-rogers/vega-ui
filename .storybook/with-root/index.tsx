import React from 'react';

import { Root } from '../../packages/components/root/src';

type ThemeName = 'gpnDefault' | 'gpnDark' | 'gpnDisplay';

type VegaThemeDecoratorProps = {
  themeName: ThemeName;
  className: string;
};

export const VegaRootDecorator: React.FC<VegaThemeDecoratorProps> = (props) => {
  const { children, themeName } = props;

  return (
    <Root rootId="root" initialPortals={[{ id: 'modalRoot' }]} initialTheme={themeName}>
      {children}
    </Root>
  );
};
