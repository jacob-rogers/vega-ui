import React, { useContext } from 'react';

import { Checkbox } from '../checkbox';

import TreeContext from './context';

type CheckedElementIdentifierAPI = {
  renderCheckedSwitcher: () => React.ReactElement;
  isChecked: boolean;
};

type UseCheckedIdentifier = {
  item: { id: string };
  handleCheck: (event: React.MouseEvent | React.KeyboardEvent) => void;
};

export const useCheckedElementIdentifier = ({
  item,
  handleCheck,
}: UseCheckedIdentifier): CheckedElementIdentifierAPI => {
  const { checkedItems, intermediateItems } = useContext(TreeContext);
  const renderCheckedSwitcher = (): React.ReactElement => {
    return (
      <Checkbox
        onClick={handleCheck}
        checked={checkedItems.some((elem) => elem.id === item.id)}
        intermediate={intermediateItems.includes(item.id)}
      />
    );
  };

  return {
    renderCheckedSwitcher,
    isChecked: checkedItems.some((elem) => elem.id === item.id),
  };
};
