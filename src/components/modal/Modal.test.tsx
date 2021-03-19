import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Modal, ModalProps } from './Modal';

function renderComponent(props: Partial<ModalProps> = {}): RenderResult {
  const { onClose = jest.fn(), ...rest } = props;
  return render(<Modal onClose={onClose} isOpen {...rest} />);
}

const closeButtonLabel = 'Кнопка закрытия модального окна';
const overlayLabel = 'Оверлей модального окна';

describe('Modal', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ onClose: jest.fn() });
  });

  test('если isOpen false, то ничего не рендерится', () => {
    const result = renderComponent({ isOpen: false });

    expect(result.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('blockBodyScroll', () => {
    test('если blockBodyScroll true, то к body добавляется дополнительный класс', () => {
      renderComponent({ blockBodyScroll: true });
      expect(global.document.body).toHaveClass('VegaModal-open');
    });

    test('если blockBodyScroll false, то дополнительный класс к body не добавляется', () => {
      renderComponent({ blockBodyScroll: false });
      expect(global.document.body).not.toHaveClass('VegaModal-open');
    });
  });

  describe('Кнопка закрытия', () => {
    test('рендерится кнопка, если передать hasCloseButton', () => {
      renderComponent({ hasCloseButton: true });

      const closeButton = screen.getByLabelText(closeButtonLabel);

      expect(closeButton).toBeInTheDocument();
    });

    test('по клику на кнопку вызывается onClose', () => {
      const onClose = jest.fn();

      renderComponent({ onClose, hasCloseButton: true });

      const closeButton = screen.getByLabelText(closeButtonLabel);

      fireEvent.click(closeButton);

      expect(onClose).toBeCalled();
    });
  });

  describe('Оверлей', () => {
    test('рендерится оверлей, если передать hasOverlay', () => {
      renderComponent({ hasOverlay: true });

      const overlay = screen.getByLabelText(overlayLabel);

      expect(overlay).toBeInTheDocument();
    });

    test('можно прокинуть onOverlayClick', () => {
      const onOverlayClick = jest.fn();
      renderComponent({ hasOverlay: true, onOverlayClick });

      const overlay = screen.getByLabelText(overlayLabel);

      fireEvent.click(overlay);

      expect(onOverlayClick).toBeCalled();
    });
  });

  describe('ModalHeader', () => {
    test('прокидывается className', () => {
      render(
        <Modal.Header className="custom-header" data-testid="modal-header">
          test
        </Modal.Header>,
      );

      const header = screen.getByTestId('modal-header');

      expect(header).toHaveClass('custom-header');
    });
  });

  describe('ModalBody', () => {
    test('прокидывается className', () => {
      render(
        <Modal.Body className="custom-body" data-testid="modal-body">
          test
        </Modal.Body>,
      );

      const body = screen.getByTestId('modal-body');

      expect(body).toHaveClass('custom-body');
    });
  });

  describe('ModalFooter', () => {
    test('прокидывается className', () => {
      render(
        <Modal.Footer className="custom-footer" data-testid="modal-footer">
          test
        </Modal.Footer>,
      );

      const footer = screen.getByTestId('modal-footer');

      expect(footer).toHaveClass('custom-footer');
    });
  });
});
