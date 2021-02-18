import React from 'react';

import { Button } from '../../../button';
import { IconQuestion } from '../../../icons';
import { Modal, useModal } from '../../../modal';
import { Text } from '../../../text';
import { cnCanvas } from '../../cn-canvas';

import { hotkeys } from './constants';
import { Hotkey } from './Hotkey';

export const HotkeyPrompt: React.FC = () => {
  const { isOpen, close, open } = useModal();

  return (
    <>
      <Button
        label="Подсказка по сокращениям клавиш"
        view="clear"
        iconRight={IconQuestion}
        iconSize="m"
        size="s"
        onClick={open}
        onlyIcon
        type="button"
      />
      <Modal hasOverlay hasCloseButton onClose={close} isOpen={isOpen}>
        <Modal.Header>
          <Text size="xs">Горячие клавиши</Text>
        </Modal.Header>
        <Modal.Body>
          <div className={cnCanvas('HotkeyPrompt')}>
            {React.Children.toArray(hotkeys.map((item) => <Hotkey hotkey={item} />))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="m" view="primary" label="Закрыть" onClick={close} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
