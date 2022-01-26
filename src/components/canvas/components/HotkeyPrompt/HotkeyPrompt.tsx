import React from 'react';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';

import { BaseModal } from '../../../base-modal';
import { IconQuestion } from '../../../icons';
import { useModal } from '../../../modal';
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

      <Modal hasOverlay onClose={close} onClickOutside={close} isOpen={isOpen}>
        <BaseModal
          title="Горячие клавиши"
          testId="calculate-settings"
          body={(
            <div className={cnCanvas('HotkeyPrompt')}>
              {React.Children.toArray(hotkeys.map((item) => <Hotkey hotkey={item} />))}
            </div>
          )}
          footer={<Button size="m" view="primary" label="Закрыть" onClick={close} />}
          handleClose={close}
        />
      </Modal>
    </>
  );
};
