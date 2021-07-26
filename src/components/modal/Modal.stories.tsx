import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '../button';
import { Combobox } from '../combobox';
import { usePortal } from '../root';
import { Text } from '../text';

import { Modal, ModalProps } from './Modal';
import { useModal } from './use-modal';

const KNOB_GROUPS = {
  modal: 'Modal',
};

const modalKnobs = (): Partial<ModalProps> => ({
  hasCloseButton: boolean('hasCloseButton', true, KNOB_GROUPS.modal),
  hasOverlay: boolean('hasOverlay', true, KNOB_GROUPS.modal),
});

const exampleKnobs = (): { title: string; text: string } => ({
  title: text('Modal.Header | Заголовок', 'Заголовок'),
  text: text(
    'Modal.Body | Пример наполнения',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida odio nunc, vitae ullamcorper erat volutpat nec. Morbi imperdiet erat fringilla nulla tempor, nec dignissim turpis auctor. Mauris et metus eget lacus facilisis imperdiet. Vivamus arcu ipsum, pellentesque vel mi ut, efficitur feugiat nulla. Phasellus feugiat viverra leo, vel fringilla risus aliquam a. Duis suscipit, ante eget commodo tincidunt, elit ex vestibulum risus, nec hendrerit justo nisi id urna. Nam vehicula luctus mi, eget pulvinar ex lacinia id.',
  ),
});

storiesOf('ui/Modal', module)
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/tree/master/src/components/modal/README.md',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const { isOpen, close: handleClose, open: handleOpen } = useModal({ initialOpen: false });
    const example = exampleKnobs();

    const openAction = action('Modal opened');
    const { portal } = usePortal({ name: 'modalRoot' });
    const closeAction = action('Modal closed');

    return (
      <>
        <Button
          size="m"
          view="primary"
          label="Открыть модальное окно"
          onClick={(e): void => {
            openAction(e);
            handleOpen();
          }}
        />
        <Modal
          portal={portal}
          onClose={(e): void => {
            closeAction(e);
            handleClose();
          }}
          isOpen={isOpen}
          {...modalKnobs()}
        >
          <Modal.Header>
            <Text size="xs">{example.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Text>{example.text}</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="m"
              view="primary"
              label="Закрыть окно"
              onClick={(e): void => {
                closeAction(e);
                handleClose();
              }}
            />
          </Modal.Footer>
        </Modal>
      </>
    );
  })
  .add('c Combobox', () => {
    const { isOpen, close: handleClose, open: handleOpen } = useModal({ initialOpen: false });
    const example = exampleKnobs();

    const openAction = action('Modal opened');
    const { portal } = usePortal({ name: 'modalRoot' });
    const closeAction = action('Modal closed');
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    type Option = {
      label: string;
      value: string;
    };

    const items = [
      { label: 'Москва', value: 'moscow' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Томск', value: 'tomsk' },
      { label: 'Омск', value: 'omsk' },
      { label: 'Орск', value: 'orsk' },
      { label: 'Тверь', value: 'tver' },
      { label: 'Тула', value: 'tula' },
      { label: 'Тамбов', value: 'tambov' },
      { label: 'Краснодар', value: 'krasnodar' },
      { label: 'Белгород', value: 'belgorod' },
    ];

    const [selected, setSelected] = useState<Option | null | undefined>();

    return (
      <>
        <Button
          size="m"
          view="primary"
          label="Открыть модальное окно"
          onClick={(e): void => {
            openAction(e);
            handleOpen();
          }}
        />
        <Modal
          portal={portal}
          onClose={(e): void => {
            closeAction(e);
            handleClose();
          }}
          isOpen={isOpen}
          refsForExcludeClickOutside={[dropdownRef]}
          {...modalKnobs()}
        >
          <Modal.Header>
            <Text size="xs">{example.title}</Text>
          </Modal.Header>
          <Modal.Body>
            <Combobox
              placeholder="Выберите город"
              id="city"
              items={items}
              value={selected}
              onChange={({ value }) => setSelected(value)}
              getItemLabel={(item) => item.label}
              getItemKey={(item) => item.value}
              dropdownRef={dropdownRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="m"
              view="primary"
              label="Закрыть окно"
              onClick={(e): void => {
                closeAction(e);
                handleClose();
              }}
            />
          </Modal.Footer>
        </Modal>
      </>
    );
  });
