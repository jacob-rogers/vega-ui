import React from 'react';
import { Badge } from '@consta/uikit/Badge';
import { Text } from '@consta/uikit/Text';

import { cnCanvas } from '../../cn-canvas';

import { HotkeyData, KeysCombination } from './types';

type HotkeyProps = {
  hotkey: HotkeyData;
};

export const Hotkey: React.FC<HotkeyProps> = ({ hotkey }) => {
  const renderCombination = (keys: KeysCombination) => {
    const divider = ' + ';
    return keys.map((key, index) => (
      <>
        <Badge label={key} size="s" />
        {index !== keys.length - 1 ? (
          <Text as="span" size="s">
            {divider}
          </Text>
        ) : (
          ''
        )}
      </>
    ));
  };

  const renderKeys = (item: HotkeyData) => {
    const divider = ' или ';
    return item.keys.map((combination, index) => {
      const key = React.Children.toArray(renderCombination(combination));
      return (
        <>
          {key}
          {index !== item.keys.length - 1 ? (
            <Text as="span" size="s">
              {divider}
            </Text>
          ) : (
            ''
          )}
        </>
      );
    });
  };

  return (
    <div className={cnCanvas('HotkeyPromptItem')}>
      <div className={`${cnCanvas('HotkeyPromptItem')}__keys`}>
        {React.Children.toArray(renderKeys(hotkey))}
      </div>
      <Text as="div" size="s">
        {`${hotkey.description}`}
      </Text>
    </div>
  );
};
