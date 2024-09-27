import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async createMenu(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  async create(createMenuItemDto: CreateMenuItemDto) {
    const { name, parentId, menuId, depth, order } = createMenuItemDto;

    const menuExists = await this.prisma.menu.findUnique({
      where: { id: menuId },
    });

    if (!menuExists) {
      throw new NotFoundException(`Menu with ID "${menuId}" not found`);
    }

    const data: any = {
      name,
      menuId,
      depth,
      order,
    };
  
    if (parentId) {
      const parentExists = await this.prisma.menuItem.findUnique({
        where: { id: parentId },
      });

      if (!parentExists) {
        throw new NotFoundException(`Parent MenuItem with ID "${parentId}" not found`);
      }

      data.parentId = parentId;
    }
  
    return this.prisma.menuItem.create({ data });
  }

  async getAllMenus() {
    return this.prisma.menu.findMany({
      include: {
        items: {
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        items: {
          where: { parentId: null },
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!menu) {
      throw new NotFoundException(`Menu with ID "${id}" not found`);
    }
    return menu;
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    const data: any = {};

    if (updateMenuItemDto.name !== undefined) {
      data.name = updateMenuItemDto.name;
    }
    if (updateMenuItemDto.depth !== undefined) {
      data.depth = updateMenuItemDto.depth;
    }
    if (updateMenuItemDto.order !== undefined) {
      data.order = updateMenuItemDto.order;
    }
    if (updateMenuItemDto.parentId !== undefined) {
      data.parentId = updateMenuItemDto.parentId;
    }

    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.menuItem.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Menu item with ID "${id}" not found`);
      }
      throw error;
    }
  }
}