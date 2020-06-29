import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Sidebar, SidebarProps } from './Sidebar';

type RenderComponentProps = {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
} & Partial<SidebarProps>;

const sidebarTestId = 'SidebarTestId';
const overlayAriaLabel = 'Оверлей';

const querySidebar = (): HTMLElement | null => {
  return screen.queryByTestId(sidebarTestId);
};

const queryOverlay = (): HTMLElement | null => {
  return screen.queryByLabelText(overlayAriaLabel);
};

function renderComponent(props: RenderComponentProps): RenderResult {
  const {
    headerContent = 'Header',
    bodyContent = 'Body',
    footerContent = 'Footer',
    ...rest
  } = props;

  return render(
    <Sidebar data-testid={sidebarTestId} {...rest}>
      <Sidebar.Header>{headerContent}</Sidebar.Header>
      <Sidebar.Body>{bodyContent}</Sidebar.Body>
      <Sidebar.Footer>{footerContent}</Sidebar.Footer>
    </Sidebar>,
  );
}

describe('Sidebar', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ isOpen: true });
  });

  describe('проверка props', () => {
    describe('isOpen', () => {
      test('Сайдбар рендерится открытым с isOpen = true', () => {
        renderComponent({ isOpen: true });

        const element = querySidebar();

        expect(element).toBeInTheDocument();
      });

      test('Сайдбар рендерится закрытым с isOpen = false', () => {
        renderComponent({ isOpen: false });

        const element = querySidebar();

        expect(element).not.toBeInTheDocument();
      });
    });

    describe('hasOverlay', () => {
      test('Оверлей рендерится с hasOverlay = true', () => {
        renderComponent({ isOpen: true, hasOverlay: true });

        const element = queryOverlay();

        expect(element).toBeInTheDocument();
      });

      test('Оверлей не рендерится с hasOverlay = false', () => {
        renderComponent({ isOpen: true, hasOverlay: false });

        const element = queryOverlay();

        expect(element).not.toBeInTheDocument();
      });

      test('Оверлей не рендерится с закрытым Сайдбаром', () => {
        renderComponent({ isOpen: false, hasOverlay: true });

        const element = queryOverlay();

        expect(element).not.toBeInTheDocument();
      });
    });

    describe('onOverlayClick', () => {
      test('Срабатывает обработчик при клике на Оверлей', () => {
        const onOverlayClick = jest.fn();

        renderComponent({ isOpen: true, onOverlayClick });

        const element = queryOverlay();

        if (element) {
          fireEvent.click(element);
        }

        expect(onOverlayClick).toBeCalled();
      });
    });
  });
});
