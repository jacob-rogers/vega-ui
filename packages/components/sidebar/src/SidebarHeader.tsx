import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconClose, IconRemove } from '@gpn-prototypes/vega-icons';

import { cnSidebar } from './cn-sidebar';

import './Sidebar.css';

export type SidebarHeaderProps = {
  hasMinimizeButton?: boolean;
  onMinimize?: (event: React.MouseEvent) => void;
  onClose?: (event: React.MouseEvent) => void;
  className?: string;
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  hasMinimizeButton = true,
  onMinimize,
  onClose,
  className,
  children,
  ...rest
}) => {
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
            iconRight={IconRemove}
            onClick={handleMinimize}
          />
        )}
        <Button
          type="button"
          aria-label="Закрыть"
          size="xs"
          view="clear"
          iconRight={IconClose}
          onClick={handleClose}
        />
      </div>
    </header>
  );
};
