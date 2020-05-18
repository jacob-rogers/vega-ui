import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Modal, ModalProps } from './Modal';

function renderComponent(props: ModalProps): RenderResult {
  const { onClose, ...rest } = props;
  return render(<Modal onClose={onClose} isOpen {...rest} />);
}

const closeButtonLabel = 'Кнопка закрытия модального окна';
const overlayLabel = 'Оверлей модального окна';

describe('Modal', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ onClose: jest.fn() });
  });

  describe('Кнопка закрытия', () => {
    test('рендерится кнопка, если передать hasCloseButton', () => {
      renderComponent({ onClose: jest.fn(), hasCloseButton: true });

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
      renderComponent({ onClose: jest.fn(), hasOverlay: true });

      const overlay = screen.getByLabelText(overlayLabel);

      expect(overlay).toBeInTheDocument();
    });

    test('можно прокинуть onOverlayClick', () => {
      const onOverlayClick = jest.fn();
      renderComponent({ onClose: jest.fn(), hasOverlay: true, onOverlayClick });

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

      expect(header.classList.contains('custom-header')).toBe(true);
    });
  });

  describe('ModalBody', () => {
    test('прокидывается className', () => {
      render(
        <Modal.Body className="custom-body" data-testid="modal-body">
          test
        </Modal.Body>,
      );

      const header = screen.getByTestId('modal-body');

      expect(header.classList.contains('custom-body')).toBe(true);
    });
  });

  describe('ModalFooter', () => {
    test('прокидывается className', () => {
      render(
        <Modal.Body className="custom-footer" data-testid="modal-footer">
          test
        </Modal.Body>,
      );

      const header = screen.getByTestId('modal-footer');

      expect(header.classList.contains('custom-footer')).toBe(true);
    });
  });
});
