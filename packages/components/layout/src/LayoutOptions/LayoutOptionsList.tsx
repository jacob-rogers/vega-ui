import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconClose,
  IconProps,
} from '@gpn-prototypes/vega-icons';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';

import { cnLayout } from '../cn-layout';
import { DataView, Direction } from '../grid';

type ChangeAction = Direction | 'close';

type LayoutOptionsListProps = {
  view: DataView;
};

type LayoutOption = {
  action: ChangeAction;
  title: string;
  icon: React.FC<IconProps>;
};

const LayoutOptionItem: React.FC<{ option: LayoutOption; view: DataView }> = ({ option, view }) => {
  const handleOptionClick = (action: ChangeAction): void => {
    if (action === 'close') {
      view.close();
    } else {
      view.split(action);
    }
  };

  return (
    <NavigationList.Item>
      {(props): React.ReactNode => (
        <Button
          label={option.title}
          aria-label={option.title}
          onClick={(): void => handleOptionClick(option.action)}
          view="clear"
          form="brick"
          size="m"
          iconSize="s"
          iconLeft={option.icon}
          className={cnLayout('Option').mix(props.className).toString()}
        />
      )}
    </NavigationList.Item>
  );
};

export const LayoutOptionsList: React.FC<LayoutOptionsListProps> = (props) => {
  const { view } = props;

  const cn = cnLayout('List');

  const options: LayoutOption[] = [
    { action: 'right', icon: IconArrowRight, title: 'Добавить панель справа' },
    { action: 'left', icon: IconArrowLeft, title: 'Добавить панель слева' },
    { action: 'up', icon: IconArrowUp, title: 'Добавить панель сверху' },
    { action: 'down', icon: IconArrowDown, title: 'Добавить панель снизу' },
  ];

  const closeOption: LayoutOption = { action: 'close', icon: IconClose, title: 'Закрыть панель' };

  return (
    <>
      <NavigationList className={cn}>
        {options.map((option) => (
          <LayoutOptionItem view={view} option={option} key={option.action} />
        ))}
        {view.canClose() && (
          <>
            <NavigationList.Delimiter className={cnLayout('Delimiter').toString()} />
            <LayoutOptionItem view={view} option={closeOption} />
          </>
        )}
      </NavigationList>
    </>
  );
};
