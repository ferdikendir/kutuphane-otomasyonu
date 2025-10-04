export interface Sidenav {
  items: SidenavItem[];
}

export interface SidenavItem {
  label: string;
  icon?: string;
  route?: string;
  permission?: string;
}
