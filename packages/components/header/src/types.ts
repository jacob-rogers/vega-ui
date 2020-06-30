export type MenuItem = {
  name: string;
  url: string;
  onClick?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
};

export type NavItem = {
  name: string;
  isActive?: boolean;
};
