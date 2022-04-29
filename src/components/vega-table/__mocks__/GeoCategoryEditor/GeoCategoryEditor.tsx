import React, {
  ChangeEvent,
  ComponentType,
  FocusEvent,
  useRef,
  useState,
} from 'react';
import { ContextMenu } from '@consta/uikit/ContextMenu';
import { getOr } from 'lodash/fp';

import { RowTypes } from '../../enums';
import { EditorProps } from '../../types';

type EditorChangeEvent<T> = ChangeEvent<T> | FocusEvent<T>;

export const GeoCategoryEditor: ComponentType<EditorProps> = ({

  row,
  column,
  onRowChange,
}) => {
  /** Variables */
  const value = getOr('', [column.key, 'value'], row);

  /** State */
  const [isOpenedSuggestionsList, setIsOpenedSuggestionsList] =
    useState<boolean>(true);

  /** Refs */
  const cellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = ({
    target,
  }: EditorChangeEvent<HTMLInputElement>): void => {
    const { value: inputValue } = target;
    const columnKey = column.key;

    onRowChange({
      ...row,
      type: RowTypes.Default,
      [columnKey]: inputValue,
    });
  };

  const onInputDoubleClick = (): void => {
    const currentCellValue = row?.[column.key] as never;

    if (!currentCellValue) {
      setIsOpenedSuggestionsList(() => true);
    }
  };

  return (
    <div ref={cellRef}>
      <input
        className="rdg-text-editor"
        data-testid="cell-editor"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleChange}
        onDoubleClick={onInputDoubleClick}
      />
        {isOpenedSuggestionsList && (
          <ContextMenu
            size='s'
            style={{
              maxWidth: 125,
            }}
            getLabel={(item) => item}
            items={['Нефть', 'Газ', 'Нефть И/ИЛИ Газ']}
            anchorRef={inputRef}
          />
        )}
    </div>
  );
};
