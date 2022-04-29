import React from 'react';
import { Button } from '@consta/uikit/Button';
import { block } from 'bem-cn';

import './TableFilterContainer.css';

const cnTableFilter = block('TableFilterContainer');

export type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
};

export const TableFilterContainer: React.FC<Props> = ({
  onConfirm,
  onCancel,
  disabled = false,
  children,
}) => {
  return (
    <div className={cnTableFilter()}>
      {children}
      <div className={cnTableFilter('Buttons')}>
        <Button label="Сбросить" size="m" view="ghost" onClick={onCancel} />
        <Button
          label="Применить"
          size="m"
          view="primary"
          onClick={onConfirm}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
