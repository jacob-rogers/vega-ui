import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconKebab } from '@gpn-prototypes/vega-icons';

import { LayoutDropdown } from '../LayoutDropdown';

import { LayoutOptionsList } from './LayoutOptionsList';

export type LayoutOptionsProps = React.ComponentProps<typeof LayoutOptionsList>;

export const LayoutOptions: React.FC<LayoutOptionsProps> = (props) => {
  return (
    <LayoutDropdown
      placement="bottom-end"
      trigger={({ toggle, props: { ref, ...triggerProps } }): React.ReactNode => {
        return (
          <Button
            innerRef={ref}
            onClick={toggle}
            onlyIcon
            iconSize="s"
            aria-label="Открыть опции панели"
            size="xs"
            form="brick"
            view="clear"
            iconLeft={IconKebab}
            type="button"
            {...triggerProps}
          />
        );
      }}
      menu={({ closeDropdown }): React.ReactNode => {
        return (
          <LayoutOptionsList
            {...props}
            onClick={(action): void => {
              closeDropdown();
              props.onClick(action);
            }}
          />
        );
      }}
    />
  );
};
