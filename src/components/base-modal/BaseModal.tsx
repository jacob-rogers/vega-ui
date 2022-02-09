import React, { useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import { Text } from '@consta/uikit/Text';
import { block } from 'bem-cn';

import './BaseModal.css';

const cn = block('BaseModal');

type footerAlign = 'right' | 'center' | 'left';
const defaultFooterAlign: footerAlign = 'right';

type Props = {
  title: string;
  testId: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  handleClose: () => void;
  width?: string;
  errorMessage?: string;
  footerAlign?: footerAlign;
  onUnmountCallback?: () => void;
};

export const BaseModal: React.FC<Props> = ({
  title,
  testId,
  body,
  footer,
  handleClose,
  width = undefined,
  errorMessage = undefined,
  footerAlign = defaultFooterAlign,
  onUnmountCallback = undefined,
}: Props) => {
  useEffect(() => {
    return () => {
      if (onUnmountCallback) {
        onUnmountCallback();
      }
    };
  }, [onUnmountCallback]);

  const getFooterAlign = () => {
    return {
      right: footerAlign === 'right',
      center: footerAlign === 'center',
      left: footerAlign === 'left',
    };
  }

  return (
    <div
      className={cn()}
      style={{ width: width !== undefined ? width : '480px' }}
      data-testid={`base-modal-${testId}`}
    >
      <div>
        <div className={cn('Title')}>
          <Text size="xs" data-testid="base-modal-title">
            {title}
          </Text>
        </div>

        <div className={cn('Body')}>{body}</div>

        {errorMessage && (
          <Text view="alert" className={cn('Error')}>
            {errorMessage}
          </Text>
        )}
      </div>

      <div className={cn('Footer', getFooterAlign())}>{footer}</div>

      {handleClose && (
        <div className={cn('Close')}>
          <Button
            onClick={handleClose}
            onlyIcon
            iconLeft={IconClose}
            size="xs"
            view="clear"
            form="brick"
            data-testid={`base-modal-${testId}-close`}
          />
        </div>
      )}
    </div>
  );
};
