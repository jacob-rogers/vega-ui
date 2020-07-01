import React from 'react';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';

const DropdownComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onToggle={(nextState): void => {
        setIsOpen(nextState);
      }}
    >
      <Dropdown.Trigger>
        {({ toggle, props }): React.ReactNode => (
          <button type="button" onClick={toggle} {...props}>
            Кнопка
          </button>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>{({ props }): React.ReactNode => <span {...props}>BLOCK</span>}</Dropdown.Menu>
    </Dropdown>
  );
  // return <button type="button">Кнопка</button>;
};

describe('Dropdown', () => {
  test('default', async () => {
    await renderPage({ component: <DropdownComponent /> });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
