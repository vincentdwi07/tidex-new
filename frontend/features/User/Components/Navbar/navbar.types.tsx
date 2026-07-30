export type DropdownItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export type NavbarLinksProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  dropdown?: DropdownItem[];
};
