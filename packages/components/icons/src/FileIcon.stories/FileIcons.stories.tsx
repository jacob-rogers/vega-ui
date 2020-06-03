import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  FileIconAvi,
  FileIconBmp,
  FileIconCsv,
  FileIconDoc,
  FileIconExe,
  FileIconGif,
  FileIconJpg,
  FileIconLoading,
  FileIconMov,
  FileIconMp3,
  FileIconMp4,
  FileIconPdf,
  FileIconPng,
  FileIconPtt,
  FileIconRar,
  FileIconRtf,
  FileIconTiff,
  FileIconTxt,
  FileIconUndefined,
  FileIconWav,
  FileIconXls,
  FileIconZip,
} from '../index';

import { IconsItem } from './Item/Icons-Item';

storiesOf('icons/files', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/fileicons',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => (
    <div className="tpl-grid tpl-grid_s-ratio_1-1-1-1-1 tpl-grid_row-gap_full">
      <IconsItem name="FileIconAvi" icon={FileIconAvi} />
      <IconsItem name="FileIconBmp" icon={FileIconBmp} />
      <IconsItem name="FileIconCsv" icon={FileIconCsv} />
      <IconsItem name="FileIconDoc" icon={FileIconDoc} />
      <IconsItem name="FileIconExe" icon={FileIconExe} />
      <IconsItem name="FileIconGif" icon={FileIconGif} />
      <IconsItem name="FileIconJpg" icon={FileIconJpg} />
      <IconsItem name="FileIconLoading" icon={FileIconLoading} />
      <IconsItem name="FileIconMov" icon={FileIconMov} />
      <IconsItem name="FileIconMp3" icon={FileIconMp3} />
      <IconsItem name="FileIconMp4" icon={FileIconMp4} />
      <IconsItem name="FileIconPdf" icon={FileIconPdf} />
      <IconsItem name="FileIconPng" icon={FileIconPng} />
      <IconsItem name="FileIconPtt" icon={FileIconPtt} />
      <IconsItem name="FileIconRar" icon={FileIconRar} />
      <IconsItem name="FileIconRtf" icon={FileIconRtf} />
      <IconsItem name="FileIconTiff" icon={FileIconTiff} />
      <IconsItem name="FileIconTxt" icon={FileIconTxt} />
      <IconsItem name="FileIconUndefined" icon={FileIconUndefined} />
      <IconsItem name="FileIconWav" icon={FileIconWav} />
      <IconsItem name="FileIconXls" icon={FileIconXls} />
      <IconsItem name="FileIconZip" icon={FileIconZip} />
    </div>
  ));
