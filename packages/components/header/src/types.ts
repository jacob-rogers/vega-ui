export type MenuItem = {
  name: string;
  url: string;
  onClick?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
};
