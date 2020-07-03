import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { useClose } from '@gpn-prototypes/vega-hooks';
import { IconKebab } from '@gpn-prototypes/vega-icons';
import { usePortal } from '@gpn-prototypes/vega-root';

import { cnLayout } from '../cn-layout';

import { LayoutOptionsList } from './LayoutOptionsList';

export type LayoutOptionsProps = React.ComponentProps<typeof LayoutOptionsList>;

export const LayoutOptions: React.FC<LayoutOptionsProps> = (props) => {
  const { onLayoutChange } = props;

  const portal = usePortal();

  const { isOpen, setIsOpen, close: closeDropdown } = useClose();

  return (
    <Dropdown
      placement="bottom-end"
      portalId={portal.current?.default?.id}
      isOpen={isOpen}
      onClickOutside={closeDropdown}
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
          <div aria-label="Меню с опциями для Layout" className={cnLayout('Menu')} {...menuProps}>
            <LayoutOptionsList
              onLayoutChange={(action): void => {
                onLayoutChange(action);
                closeDropdown();
              }}
            />
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
