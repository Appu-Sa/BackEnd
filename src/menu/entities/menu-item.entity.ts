// src/menus/entities/menu-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree("closure-table")
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @TreeParent()
  parent: MenuItem;

  @TreeChildren()
  children: MenuItem[];

  @Column({ nullable: true })
  parentId: string;
}