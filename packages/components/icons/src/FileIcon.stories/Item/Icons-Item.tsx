import React from 'react';
import { FileIconProps } from '@gpn-design/uikit/FileIcon';

export type IconItemProps = {
  icon: React.FC<FileIconProps>;
  name: string;
} & FileIconProps;

export const IconsItem: React.FC<IconItemProps> = ({ icon, name, size }) => {
  const Icon = icon;
  return (
    <div className="tpl-grid__fraction text text_align_center">
      <Icon size={size} />
      <div className="text_size_s text_view_secondary">{name}</div>
    </div>
  );
};
