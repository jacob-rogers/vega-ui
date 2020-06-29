import React from 'react';
import { IconProps } from '@gpn-design/uikit/Icon';

export type IconItemProps = {
  icon: React.FC<IconProps>;
  name: string;
} & IconProps;

export const IconsItem: React.FC<IconItemProps> = ({ icon, name, size, view }) => {
  const Icon = icon;
  return (
    <div className="tpl-grid__fraction text text_align_center">
      <Icon size={size} view={view} />
      <div className="text_size_s text_view_secondary">{name}</div>
    </div>
  );
};
