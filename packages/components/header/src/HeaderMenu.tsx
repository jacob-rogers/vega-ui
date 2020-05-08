import React from 'react';
import { Button } from '@vega-ui/button';
import { Dropdown, useDropdown } from '@vega-ui/dropdown';
import { IconHamburger } from '@vega-ui/icons';
import { Text } from '@vega-ui/text';

import { cnHeader } from './helpers/cn-header';

export const HeaderMenu = (): React.ReactElement => {
  const { isOpen, toggle: handleToggle, close: handleClose } = useDropdown();

  const [activeItemName, setActiveItemName] = useState('')

  const activeName = 'Очень длинное название проекта';

  const trigger = (
    <div className={cnHeader('MenuTrigger')}>
      <Button view="clear" type="button" onlyIcon onClick={handleToggle} iconLeft={IconHamburger} />
      <Text>{activeName.slice(0, 27)}...</Text>
    </div>
  );

  return (
    <Dropdown className={cnHeader('Menu')} isOpen={isOpen} trigger={trigger} onClose={handleClose}>
      <Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};
