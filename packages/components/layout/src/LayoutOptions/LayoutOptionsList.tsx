import React, { createContext, useContext } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconClose,
  IIcon,
} from '@gpn-prototypes/vega-icons';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';

import { cnLayout } from '../cn-layout';

type ChangeAction = 'left' | 'right' | 'bottom' | 'top' | 'close';

type LayoutOptionsListProps = {
  onLayoutChange: (action: ChangeAction) => void;
};

type LayoutOption = {
  action: ChangeAction;
  title: string;
  icon: React.FC<IIcon>;
};

const LayoutOptionContext = createContext<LayoutOptionsListProps>({ onLayoutChange: () => {} });

const LayoutOptionItem: React.FC<{ option: LayoutOption }> = ({ option }) => {
  const { onLayoutChange } = useContext(LayoutOptionContext);

  return (
    <NavigationList.Item>
      {(props): React.ReactNode => (
        <Button
          label={option.title}
          aria-label={option.title}
          onClick={(): void => onLayoutChange(option.action)}
          view="clear"
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
  const { onLayoutChange } = props;

  const cn = cnLayout('Options');

  const options: LayoutOption[] = [
    { action: 'right', icon: IconArrowRight, title: 'Добавить панель справа' },
    { action: 'left', icon: IconArrowLeft, title: 'Добавить панель слева' },
    { action: 'top', icon: IconArrowUp, title: 'Добавить панель сверху' },
    { action: 'bottom', icon: IconArrowDown, title: 'Добавить панель снизу' },
  ];

  const closeOption: LayoutOption = { action: 'close', icon: IconClose, title: 'Закрыть панель' };

  return (
    <LayoutOptionContext.Provider value={{ onLayoutChange }}>
      <NavigationList className={cn}>
        {options.map((option) => (
          <LayoutOptionItem option={option} key={option.action} />
        ))}
        <NavigationList.Delimiter className={cnLayout('Delimiter').toString()} />
        <LayoutOptionItem option={closeOption} />
      </NavigationList>
    </LayoutOptionContext.Provider>
  );
};
