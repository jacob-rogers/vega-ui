import React from 'react';
import { IconTrash } from '@gpn-prototypes/vega-icons';

import { cnCanvas } from '../../cn-canvas';

import { CreateOption, Option } from './components';
import * as Icons from './Icons';
import { ActiveOption, Changes, Option as OptionType, OptionView } from './types';

type OptionsPanelProps = {
  activeValue?: ActiveOption;
  onChange: (change: Changes) => void;
  disabledOptions?: OptionType[];
  className?: string;
};

export const OptionsPanel: React.FC<OptionsPanelProps> = (props) => {
  const { activeValue, onChange, disabledOptions = [], className } = props;

  const options: OptionView[] = [
    { type: 'selection', icon: Icons.IconCursor },
    { type: 'dragging', icon: Icons.IconHand },
    { type: 'create', icon: Icons.IconNodes },
    { type: 'grouping', icon: Icons.IconGrouping },
    { type: 'ordering', icon: Icons.IconOrdering },
    { type: 'remove', icon: IconTrash },
  ];

  return (
    <div className={cnCanvas('OptionsPanel').mix(className)}>
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
