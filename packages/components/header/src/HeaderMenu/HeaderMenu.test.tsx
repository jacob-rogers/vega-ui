import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { HeaderMenu } from './HeaderMenu';

type HeaderNavTestProps = React.ComponentProps<typeof HeaderMenu>;

const renderComponent = (props: HeaderNavTestProps = { title: 'Проект' }): RenderResult =>
  render(<HeaderMenu {...props} />);

// const getTriggerButton = (): HTMLElement => ;

describe('Header', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  // test('открывается меню', () => {
  //   const menu = renderComponent();
  //   const menuTrigger = menu.

  //   fireEvent.click();

  //   // expect(menu.getByText('Геологические риски')).toHaveClass('Tabs-Tab_active');
  // });
});
