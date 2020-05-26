import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Sidebar, SidebarProps } from './Sidebar';

type RenderComponentProps = {
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
} & SidebarProps;

const sidebarTestId = 'SidebarTestId';
const overlayAriaLabel = 'Overlay';

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
    renderComponent({});
  });

  describe('проверка props', () => {
    describe('isOpen', () => {
      test('isOpen: true', () => {
        renderComponent({ isOpen: true });

        const element = screen.queryByTestId(sidebarTestId);

        expect(element).toBeInTheDocument();
      });
      test('isOpen: false', () => {
        renderComponent({ isOpen: false });

        const element = screen.queryByTestId(sidebarTestId);

        expect(element).not.toBeInTheDocument();
      });
    });
    describe('hasOverlay', () => {
      test('hasOverlay: true', () => {
        renderComponent({ isOpen: true, hasOverlay: true });

        const element = screen.queryByLabelText(overlayAriaLabel);

        expect(element).toBeInTheDocument();
      });
      test('hasOverlay: false', () => {
        renderComponent({ isOpen: true, hasOverlay: false });

        const element = screen.queryByLabelText(overlayAriaLabel);

        expect(element).not.toBeInTheDocument();
      });
      test('isOpen: false, hasOverlay: true', () => {
        renderComponent({ isOpen: false, hasOverlay: true });

        const element = screen.queryByLabelText(overlayAriaLabel);

        expect(element).not.toBeInTheDocument();
      });
    });
    describe('onOverlayClick', () => {
      test('call', () => {
        const onOverlayClick = jest.fn();

        renderComponent({ onOverlayClick });

        const element = screen.getByLabelText(overlayAriaLabel);

        fireEvent.click(element);

        expect(onOverlayClick).toBeCalled();
      });
    });
  });
});
