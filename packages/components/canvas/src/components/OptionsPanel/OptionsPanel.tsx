import React from 'react';
import { IconTrash } from '@gpn-prototypes/vega-icons';

import { cnCanvas } from '../../cn-canvas';

import { CreateOption, Option } from './components';
import * as Icons from './Icons';
import { ActiveOption, Changes, Option as OptionType, OptionView } from './types';

export type OptionsPanelProps = {
  activeValue?: ActiveOption;
  onChange: (change: Changes) => void;
  disabledOptions?: OptionType[];
  className?: string;
};

export const options: OptionView[] = [
  { type: 'selection', icon: Icons.IconCursor, label: 'Выбор элементов' },
  { type: 'dragging', icon: Icons.IconHand, label: 'Перемещение по полотну' },
  { type: 'create', icon: Icons.IconNodes, label: 'Создание элементов' },
  { type: 'grouping', icon: Icons.IconGrouping, label: 'Группировка элементов' },
  { type: 'ordering', icon: Icons.IconOrdering, label: 'Упорядочивание элементов' },
  { type: 'remove', icon: IconTrash, label: 'Удаление элементов' },
];

export const OptionsPanel: React.FC<OptionsPanelProps> = (props) => {
  const { activeValue, onChange, disabledOptions = [], className } = props;
  return (
    <div role="menu" aria-label="Опции полотна" className={cnCanvas('OptionsPanel').mix(className)}>
      {options.map((option) => {
        const disabled = disabledOptions.includes(option.type);
        if (option.type === 'create') {
          return (
            <CreateOption
              disabled={disabled}
              key={option.type}
              option={option}
              onCreate={(type): void => onChange({ type: 'create', itemType: type })}
            />
          );
        }

        return (
          <Option
            role="menuitem"
            option={option}
            key={option.type}
            onClick={(): void => onChange({ type: option.type })}
            isActive={activeValue === option.type}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
