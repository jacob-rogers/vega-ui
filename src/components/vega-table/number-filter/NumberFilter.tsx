import React, { useRef, useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { block } from 'bem-cn';

import { TableFilterContainer } from '../filter-container/TableFilterContainer';
import { FilterNumberRange } from '../types';

import './NumberFilter.css';

const cnNumberFilter = block('TableNumberFilter');

export type Props = {
  onConfirm: (value: FilterNumberRange) => void;
  onCancel: () => void;
  filterValue: FilterNumberRange;
};

export const TableNumberFilter: React.FC<Props> = ({
  onConfirm,
  filterValue,
  onCancel,
}) => {
  const [minValue, setMinValue] = useState<string | undefined | null>(
    (filterValue as FilterNumberRange)?.start,
  );
  const [maxValue, setMaxValue] = useState<string | undefined | null>(
    (filterValue as FilterNumberRange)?.end,
  );

  const textFieldRef = useRef<HTMLInputElement>(null);

  const confirmHandler = () => {
    onConfirm({
      start: minValue,
      end: maxValue,
    } as FilterNumberRange);
  };

  return (
    <TableFilterContainer
      onCancel={onCancel}
      onConfirm={confirmHandler}
      disabled={!minValue && !maxValue}
    >
      <div className={cnNumberFilter('Inputs')}>
        <TextField
          id="от"
          leftSide="от"
          value={minValue}
          onChange={(e) => setMinValue(e.value)}
          form="defaultBrick"
          size="m"
          inputRef={textFieldRef}
          type="number"
        />
        <TextField
          leftSide="до"
          id="до"
          value={maxValue}
          onChange={(e) => setMaxValue(e.value)}
          form="clearDefault"
          size="m"
          type="number"
        />
      </div>
    </TableFilterContainer>
  );
};
