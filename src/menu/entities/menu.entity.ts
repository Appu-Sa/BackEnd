import { MenuItem } from './menu-item.entity';

export class Menu {
  id: string;
  name: string;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}