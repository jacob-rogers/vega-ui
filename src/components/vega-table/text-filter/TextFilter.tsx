import React, { useMemo, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { CheckboxGroup } from '@consta/uikit/CheckboxGroup';
import { IconSearch } from '@consta/uikit/IconSearch';
import { cnMixSpace } from '@consta/uikit/MixSpace';
import { Switch } from '@consta/uikit/Switch';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { block } from 'bem-cn';

import { TableFilterContainer } from '../filter-container/TableFilterContainer';
import { OptionItem } from '../types';

import './TextFilter.css';

const cnTextFilter = block('TableTextFilter');

type Props = {
  onConfirm: (value: OptionItem[]) => void;
  onCancel: () => void;
  filterValue: OptionItem[];
  items?: OptionItem[];
  searchable: boolean;
};

export const TableTextFilter: React.FC<Props> = ({
  items = [],
  onConfirm,
  onCancel,
  filterValue,
  searchable,
}) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<
    OptionItem[] | null
  >(filterValue.length > 0 ? filterValue : items);

  const confirmHandler = () => {
    setSearchValue(null);
    onConfirm(checkboxGroupValue === null ? [] : checkboxGroupValue);
  };

  const resetHandler = () => {
    setCheckboxGroupValue(null);
  };

  const filteredItems = useMemo(() => {
    if (!searchValue) {
      return items;
    }

    return items.filter(({ displayName }) => {
      return displayName.match(new RegExp(`${searchValue}`, 'i'));
    });
  }, [searchValue, items]);

  const setAll = () => {
    setCheckboxGroupValue(filteredItems);
  };

  const isAllSelected = useMemo(
    () => filteredItems.length === checkboxGroupValue?.length,
    [filteredItems, checkboxGroupValue],
  );

  const filteredItemsToRender = useMemo(() => {
    return switchValue
      ? filteredItems.filter(
          (item) =>
            (checkboxGroupValue || []).find(
              (valueItem) => valueItem.displayName === item.displayName,
            ) === undefined,
        )
      : filteredItems;
  }, [checkboxGroupValue, filteredItems, switchValue]);

  const isSelected = useMemo(
    () => checkboxGroupValue?.length,
    [checkboxGroupValue],
  );

  return (
    <TableFilterContainer onCancel={onCancel} onConfirm={confirmHandler}>
      {searchable && (
        <div className={cnTextFilter('Searchbar')}>
          <TextField
            value={searchValue}
            onChange={({ value }) => setSearchValue(value)}
            leftSide={IconSearch}
            size="s"
            placeholder="Найти в списке"
            width="full"
            className={cnTextFilter('Searchbar')}
          />
        </div>
      )}
      <div className={cnTextFilter('Controls')}>
        <Button
          size="m"
          form="brick"
          label="Выбрать все"
          view="clear"
          onClick={setAll}
          disabled={!filteredItems.length || isAllSelected}
        />
        <Button
          size="m"
          form="brick"
          label="Сбросить"
          view="clear"
          onClick={resetHandler}
          disabled={!filteredItems.length || !isSelected}
        />
      </div>
      <div className={cnTextFilter('Checkboxes')}>
        {filteredItemsToRender.length ? (
          <CheckboxGroup
            items={filteredItemsToRender}
            value={checkboxGroupValue}
            getLabel={(item) => item.text || item.displayName}
            onChange={({ value }) => {
              setCheckboxGroupValue(value);
            }}
            name="checkboxGroup"
          />
        ) : (
          <Text lineHeight="2xs">Ничего не найдено</Text>
        )}
      </div>
      <div className={cnMixSpace({ mT: 'm' })}>
        <Switch
          size="m"
          label="Только незаполненные"
          checked={switchValue}
          onChange={() => setSwitchValue(!switchValue)}
        />
      </div>
    </TableFilterContainer>
  );
};
