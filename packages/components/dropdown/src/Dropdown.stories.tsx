import React from 'react';
import styled from '@emotion/styled';
import { array, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Dropdown, DropdownProps } from './Dropdown';

const KNOB_GROUPS = {
  dropdown: 'Dropdown',
};

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 200px;
  left: 50%;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  background-color: red;
`;

const dropdownKnobs = (): Partial<DropdownProps> => ({
  placement: select(
    'placement',
    {
      'top': 'top',
      'top-start': 'top-start',
      'top-end': 'top-end',
      'bottom': 'bottom',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'left': 'left',
      'left-start': 'left-start',
      'left-end': 'left-end',
      'right': 'right',
      'right-start': 'right-start',
      'right-end': 'right-end',
    },
    'top',
    KNOB_GROUPS.dropdown,
  ),
  offset: array('offset[x, y]', ['0', '0'], ',', KNOB_GROUPS.dropdown).map((o) => Number(o)),
});

storiesOf('ui/Dropdown', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('базовый', () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Container>
        <Dropdown
          {...dropdownKnobs()}
          isOpen={isOpen}
          onToggle={(nextState): void => {
            setIsOpen(nextState);
          }}
        >
          <Dropdown.Trigger>
            {({ toggle, props }): React.ReactNode => (
              <button type="button" onClick={toggle} {...props}>
                Клик
              </button>
            )}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {({ props }): React.ReactNode => isOpen && <Menu {...props}>Выпадашка</Menu>}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  })
  .add('с закрытием при клике вне', () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Container>
        <Dropdown
          {...dropdownKnobs()}
          isOpen={isOpen}
          onToggle={(nextState): void => {
            setIsOpen(nextState);
          }}
          onClickOutside={(): void => {
            setIsOpen(false);
          }}
        >
          <Dropdown.Trigger>
            {({ toggle, props }): React.ReactNode => (
              <button type="button" onClick={toggle} {...props}>
                Клик
              </button>
            )}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {({ props }): React.ReactNode => isOpen && <Menu {...props}>Выпадашка</Menu>}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  })
  .add('рендер в портале', () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Container>
        <Dropdown
          {...dropdownKnobs()}
          isOpen={isOpen}
          onToggle={(nextState): void => {
            setIsOpen(nextState);
          }}
          portalId="test-1"
        >
          <Dropdown.Trigger>
            {({ toggle, props }): React.ReactNode => (
              <button type="button" onClick={toggle} {...props}>
                Клик
              </button>
            )}
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {({ props }): React.ReactNode => isOpen && <Menu {...props}>Выпадашка</Menu>}
          </Dropdown.Menu>
        </Dropdown>
        <div id="test-1">Фактически я рендерюсь здесь</div>
      </Container>
    );
  });
