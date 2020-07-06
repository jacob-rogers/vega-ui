import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconClose, IconRemove } from '@gpn-prototypes/vega-icons';

import { cnSidebar } from './cn-sidebar';
import { useSidebarContext } from './use-sidebar-context';

import './Sidebar.css';

export type SidebarHeaderProps = {
  hasMinimizeButton?: boolean;
  className?: string;
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  hasMinimizeButton = true,
  className,
  children,
  ...rest
}) => {
  const { onMinimize, onClose } = useSidebarContext();

  const handleMinimize = (event: React.MouseEvent): void => {
    if (onMinimize) {
      onMinimize(event);
    }
  };

  const handleClose = (event: React.MouseEvent): void => {
    if (onClose) {
      onClose(event);
    }
  };

  return (
    <header className={cnSidebar('Header')}>
      <div className={cnSidebar('Header-title').mix(className)} {...rest}>
        {children}
      </div>
      <div className={cnSidebar('Header-buttons')}>
        {hasMinimizeButton && (
          <Button
            type="button"
            aria-label="Свернуть"
            size="xs"
            view="clear"
            form="brick"
            onlyIcon
            iconRight={IconRemove}
            onClick={handleMinimize}
          />
        )}
        <Button
          type="button"
          aria-label="Закрыть"
          size="xs"
          view="clear"
          form="brick"
          onlyIcon
          iconRight={IconClose}
          onClick={handleClose}
        />
      </div>
    </header>
  );
};
