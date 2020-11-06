import React from 'react';
import { IconCursorMouse, IconHand, IconNodes, IconTrash } from '@gpn-prototypes/vega-icons';

import { cnCanvas } from '../../cn-canvas';

import { CreateOption, Option } from './components';
import { ActiveOption, Changes, Option as OptionType, OptionView } from './types';

export type OptionsPanelProps = {
  activeValue?: ActiveOption;
  onChange: (change: Changes) => void;
  disabledOptions?: OptionType[];
  className?: string;
};

export const options: OptionView[] = [
  { type: 'selection', icon: IconCursorMouse, label: 'Выбор элементов' },
  { type: 'dragging', icon: IconHand, label: 'Перемещение по полотну' },
  { type: 'create', icon: IconNodes, label: 'Создание элементов' },
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
              className={cnCanvas('CreateOptionWrapper')}
              option={option}
              key={option.type}
              onCreate={(type): void => onChange({ itemType: type, type: option.type })}
              disabledOptions={disabledOptions}
            />
          );
        }

        return (
          <Option
            role="menuitem"
            option={option}
            onlyIcon
            key={option.type}
            onClick={(): void => onChange({ type: option.type } as Changes)}
            isActive={activeValue === option.type}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
