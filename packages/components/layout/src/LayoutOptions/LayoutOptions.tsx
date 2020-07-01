import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { IconKebab } from '@gpn-prototypes/vega-icons';

import { LayoutOptionsList } from './LayoutOptionsList';

export type LayoutOptionsProps = React.ComponentProps<typeof LayoutOptionsList>;

export const LayoutOptions: React.FC<LayoutOptionsProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { onLayoutChange } = props;

  return (
    <Dropdown
      placement="bottom-end"
      isOpen={isOpen}
      onClickOutside={(): void => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}
      onToggle={(nextState): void => {
        setIsOpen(nextState);
      }}
    >
      <Dropdown.Trigger>
        {({ toggle, props: { ref, ...triggerProps } }): React.ReactNode => (
          <Button
            innerRef={ref}
            onClick={toggle}
            onlyIcon
            iconSize="s"
            aria-label="Открыть dropdown"
            size="xs"
            form="brick"
            view="clear"
            iconLeft={IconKebab}
            type="button"
            {...triggerProps}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => (
          <div {...menuProps}>
            <LayoutOptionsList onLayoutChange={onLayoutChange} />
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
