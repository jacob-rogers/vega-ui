import React from 'react';

import { Button } from '../../button';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconClose,
  IconProps,
} from '../../icons';
import { NavigationList } from '../../navigation-list';
import { cnLayout } from '../cn-layout';
import { SplitDirection } from '../grid';

export type ChangeAction = SplitDirection | 'close';

type LayoutOptionsListProps = {
  onClick: (action: ChangeAction) => void;
  canClose: boolean;
};

type LayoutOption = {
  action: ChangeAction;
  title: string;
  icon: React.FC<IconProps>;
};

const LayoutOptionItem: React.FC<{
  option: LayoutOption;
  onClick: LayoutOptionsListProps['onClick'];
}> = ({ option, onClick }) => {
  return (
    <NavigationList.Item>
      {(props): React.ReactNode => (
        <Button
          label={option.title}
          aria-label={option.title}
          onClick={(): void => onClick(option.action)}
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
  const { onClick, canClose } = props;

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
          <LayoutOptionItem onClick={onClick} option={option} key={option.action} />
        ))}
        {canClose && (
          <>
            <NavigationList.Delimiter className={cnLayout('Delimiter').toString()} />
            <LayoutOptionItem onClick={onClick} option={closeOption} />
          </>
        )}
      </NavigationList>
    </>
  );
};
