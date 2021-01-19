import React from 'react';

import { cnModal } from './cn-modal';

import './Modal.css';

type ModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className, ...rest }) => (
  <header {...rest} className={cnModal('Header').mix(className)}>
    {children}
  </header>
);
