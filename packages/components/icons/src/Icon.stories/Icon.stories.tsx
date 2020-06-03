import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  IconAdd,
  IconAlert,
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconAttach,
  IconBackward,
  IconBarrier,
  IconBento,
  IconBold,
  IconBookmarkFilled,
  IconBookmarkStroked,
  IconCalendar,
  IconCamera,
  IconCancel,
  IconChat,
  IconCheck,
  IconClose,
  IconCollapse,
  IconColorFill,
  IconColorText,
  IconColumns,
  IconComment,
  IconConnection,
  IconCopy,
  IconCrown,
  IconDiamond,
  IconDown,
  IconDrag,
  IconDrop,
  IconEdit,
  IconExpand,
  IconEye,
  IconFavorite,
  IconFilter,
  IconForward,
  IconFunnel,
  IconGas,
  IconHamburger,
  IconItalic,
  IconKebab,
  IconLeaf,
  IconLink,
  IconList,
  IconListNumbered,
  IconLock,
  IconMail,
  IconMeatball,
  IconOpenInNew,
  IconPause,
  IconPhoto,
  IconPlay,
  IconProcessing,
  IconQuestion,
  IconQuote,
  IconRecord,
  IconRemove,
  IconRevert,
  IconRing,
  IconRouble,
  IconSearch,
  IconSelect,
  IconSelectOpen,
  IconSettings,
  IconShuffle,
  IconSortDown,
  IconSortDownCenter,
  IconSortUp,
  IconSortUpCenter,
  IconStop,
  IconStrikethrough,
  IconTable,
  IconTest,
  IconThumbUp,
  IconTie,
  IconTop,
  IconTrash,
  IconType,
  IconUnderline,
  IconUser,
  IconWorld,
} from '../index';

import { IconsItem } from './Item/Icons-Item';

storiesOf('icons/common', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/icons',
        text: 'Документация',
      },
    },
  })
  .add('по умлочанию', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      <IconsItem name="IconAdd" icon={IconAdd} />
      <IconsItem name="IconAlert" icon={IconAlert} />
      <IconsItem name="IconAlignJustify" icon={IconAlignJustify} />
      <IconsItem name="IconAlignCenter" icon={IconAlignCenter} />
      <IconsItem name="IconAlignLeft" icon={IconAlignLeft} />
      <IconsItem name="IconAlignRight" icon={IconAlignRight} />
      <IconsItem name="IconArrowDown" icon={IconArrowDown} />
      <IconsItem name="IconArrowLeft" icon={IconArrowLeft} />
      <IconsItem name="IconArrowRight" icon={IconArrowRight} />
      <IconsItem name="IconArrowUp" icon={IconArrowUp} />
      <IconsItem name="IconAttach" icon={IconAttach} />
      <IconsItem name="IconBackward" icon={IconBackward} />
      <IconsItem name="IconBarrier" icon={IconBarrier} />
      <IconsItem name="IconBento" icon={IconBento} />
      <IconsItem name="IconBold" icon={IconBold} />
      <IconsItem name="IconBookmarkFilled" icon={IconBookmarkFilled} />
      <IconsItem name="IconBookmarkStroked" icon={IconBookmarkStroked} />
      <IconsItem name="IconCalendar" icon={IconCalendar} />
      <IconsItem name="IconCamera" icon={IconCamera} />
      <IconsItem name="IconCancel" icon={IconCancel} />
      <IconsItem name="IconChat" icon={IconChat} />
      <IconsItem name="IconCheck" icon={IconCheck} />
      <IconsItem name="IconClose" icon={IconClose} />
      <IconsItem name="IconCollapse" icon={IconCollapse} />
      <IconsItem name="IconColorText" icon={IconColorText} />
      <IconsItem name="IconColorFill" icon={IconColorFill} />
      <IconsItem name="IconColumns" icon={IconColumns} />
      <IconsItem name="IconComment" icon={IconComment} />
      <IconsItem name="IconConnection" icon={IconConnection} />
      <IconsItem name="IconCopy" icon={IconCopy} />
      <IconsItem name="IconCrown" icon={IconCrown} />
      <IconsItem name="IconDiamond" icon={IconDiamond} />
      <IconsItem name="IconDown" icon={IconDown} />
      <IconsItem name="IconDrag" icon={IconDrag} />
      <IconsItem name="IconDrop" icon={IconDrop} />
      <IconsItem name="IconEdit" icon={IconEdit} />
      <IconsItem name="IconExpand" icon={IconExpand} />
      <IconsItem name="IconEye" icon={IconEye} />
      <IconsItem name="IconFavorite" icon={IconFavorite} />
      <IconsItem name="IconFilter" icon={IconFilter} />
      <IconsItem name="IconForward" icon={IconForward} />
      <IconsItem name="IconFunnel" icon={IconFunnel} />
      <IconsItem name="IconGas" icon={IconGas} />
      <IconsItem name="IconHamburger" icon={IconHamburger} />
      <IconsItem name="IconItalic" icon={IconItalic} />
      <IconsItem name="IconKebab" icon={IconKebab} />
      <IconsItem name="IconLeaf" icon={IconLeaf} />
      <IconsItem name="IconLink" icon={IconLink} />
      <IconsItem name="IconList" icon={IconList} />
      <IconsItem name="IconListNumbered" icon={IconListNumbered} />
      <IconsItem name="IconLock" icon={IconLock} />
      <IconsItem name="IconMail" icon={IconMail} />
      <IconsItem name="IconMeatball" icon={IconMeatball} />
      <IconsItem name="IconOpenInNew" icon={IconOpenInNew} />
      <IconsItem name="IconPause" icon={IconPause} />
      <IconsItem name="IconPhoto" icon={IconPhoto} />
      <IconsItem name="IconPlay" icon={IconPlay} />
      <IconsItem name="IconProcessing" icon={IconProcessing} />
      <IconsItem name="IconQuestion" icon={IconQuestion} />
      <IconsItem name="IconQuote" icon={IconQuote} />
      <IconsItem name="IconRecord" icon={IconRecord} />
      <IconsItem name="IconRemove" icon={IconRemove} />
      <IconsItem name="IconRevert" icon={IconRevert} />
      <IconsItem name="IconRing" icon={IconRing} />
      <IconsItem name="IconRouble" icon={IconRouble} />
      <IconsItem name="IconSearch" icon={IconSearch} />
      <IconsItem name="IconSelect" icon={IconSelect} />
      <IconsItem name="IconSelectOpen" icon={IconSelectOpen} />
      <IconsItem name="IconSettings" icon={IconSettings} />
      <IconsItem name="IconShuffle" icon={IconShuffle} />
      <IconsItem name="IconSortDown" icon={IconSortDown} />
      <IconsItem name="IconSortDownCenter" icon={IconSortDownCenter} />
      <IconsItem name="IconSortUp" icon={IconSortUp} />
      <IconsItem name="IconSortUpCenter" icon={IconSortUpCenter} />
      <IconsItem name="IconStop" icon={IconStop} />
      <IconsItem name="IconStrikethrough" icon={IconStrikethrough} />
      <IconsItem name="IconTable" icon={IconTable} />
      <IconsItem name="IconTest" icon={IconTest} />
      <IconsItem name="IconThumbUp" icon={IconThumbUp} />
      <IconsItem name="IconTrash" icon={IconTrash} />
      <IconsItem name="IconTie" icon={IconTie} />
      <IconsItem name="IconTop" icon={IconTop} />
      <IconsItem name="IconType" icon={IconType} />
      <IconsItem name="IconUnderline" icon={IconUnderline} />
      <IconsItem name="IconUser" icon={IconUser} />
      <IconsItem name="IconWorld" icon={IconWorld} />
    </div>
  ));
