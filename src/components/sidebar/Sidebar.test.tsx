import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

function renderComponent(props: RenderComponentProps = {}): RenderResult {
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

  test('вызывается onMinimize по клику на кнопку "Свернуть"', () => {
    const onMinimize = jest.fn();
    renderComponent({ onMinimize, isOpen: true });

    const button = screen.getByRole('button', { name: 'Свернуть' });

    userEvent.click(button);

    expect(onMinimize).toBeCalledTimes(1);
  });

  test('вызывается onClose по клику на кнопку "Закрыть"', () => {
    const onClose = jest.fn();

    renderComponent({ onClose, isOpen: true });

    const button = screen.getByRole('button', { name: 'Закрыть' });

    userEvent.click(button);

    expect(onClose).toBeCalledTimes(1);
  });

  describe('проверка props', () => {
    describe('isOpen', () => {
      test('сайдбар рендерится открытым с isOpen = true', () => {
        renderComponent({ isOpen: true });

        const element = querySidebar();

        expect(element).toBeInTheDocument();
      });

      test('сайдбар рендерится закрытым с isOpen = false', () => {
        renderComponent({ isOpen: false });

        const element = querySidebar();

        expect(element).not.toBeInTheDocument();
      });

      test('сайдбар по умолчанию закрыт', () => {
        renderComponent();

        expect(querySidebar()).not.toBeInTheDocument();
      });
    });

    describe('isMinimized', () => {
      test('если isMinimized = true, то окно всегда находится справа', () => {
        renderComponent({ isMinimized: true, isOpen: true, align: 'left' });

        const sidebar = screen.getByLabelText('Сайдбар');

        expect(sidebar).toHaveClass('VegaSidebar_align_right');
      });

      test('если isMinimized = false, то окно располагается согласно пропу align', () => {
        renderComponent({ isMinimized: false, isOpen: true, align: 'left' });

        const sidebar = screen.getByLabelText('Сайдбар');

        expect(sidebar).toHaveClass('VegaSidebar_align_left');
      });
    });

    describe('portal', () => {
      test('рендерится в портале', () => {
        renderComponent({ isOpen: true, portal: document.body });

        const sidebar = querySidebar();

        expect(document.body).toContainElement(sidebar);
      });
    });

    describe('hasOverlay', () => {
      test('оверлей рендерится с hasOverlay = true', () => {
        renderComponent({ isOpen: true, hasOverlay: true });

        const element = queryOverlay();

        expect(element).toBeInTheDocument();
      });

      test('оверлей не рендерится с hasOverlay = false', () => {
        renderComponent({ isOpen: true, hasOverlay: false });

        const element = queryOverlay();

        expect(element).not.toBeInTheDocument();
      });

      test('оверлей не рендерится с закрытым Сайдбаром', () => {
        renderComponent({ isOpen: false, hasOverlay: true });

        const element = queryOverlay();

        expect(element).not.toBeInTheDocument();
      });
    });

    describe('onOverlayClick', () => {
      test('срабатывает обработчик при клике на Оверлей', () => {
        const onOverlayClick = jest.fn();

        renderComponent({ isOpen: true, onOverlayClick });

        const element = queryOverlay();

        if (element) {
          userEvent.click(element);
        }

        expect(onOverlayClick).toBeCalled();
      });
    });
  });
});
