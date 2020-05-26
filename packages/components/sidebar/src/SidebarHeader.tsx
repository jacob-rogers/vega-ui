import React from 'react';
import { IconClose, IconRemove } from '@gpn-prototypes/vega-icons';

import { cnSidebar } from './helpers/cn-sidebar';

import './Sidebar.css';

export type SidebarHeaderProps = {
  hasMinimizeButton?: boolean;
  onMinimize?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
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
  const handleMinimize = (event: React.SyntheticEvent): void => {
    if (onMinimize) {
      onMinimize(event);
    }
  };

  const handleClose = (event: React.SyntheticEvent): void => {
    if (onClose) {
      onClose(event);
    }
  };

  return (
    <header className={cnSidebar('Header')}>
      <p className={cnSidebar('Header-title').mix(className)} {...rest}>
        {children}
      </p>
      <div className={cnSidebar('Header-buttons')}>
        {hasMinimizeButton && (
          <button
            type="button"
            aria-label=""
            className={cnSidebar('Header-button')}
            onClick={handleMinimize}
          >
            <IconRemove size="xs" view="ghost" />
          </button>
        )}
        <button type="button" className={cnSidebar('Header-button')} onClick={handleClose}>
          <IconClose size="xs" view="ghost" />
        </button>
      </div>
    </header>
  );
};
