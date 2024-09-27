import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MenusService } from './menu.service';
import { CreateMenuItemDto } from './dto/menu-item.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Controller('menus')
export class MenusController {
  private readonly logger = new Logger(MenusController.name);

  constructor(private readonly menusService: MenusService) {}

  @Get()
  async getAllMenus() {
    this.logger.log('Received request to fetch all menus');
    try {
      const menus = await this.menusService.getAllMenus();
      this.logger.log(`Successfully fetched ${menus.length} menus`);
      return menus;
    } catch (error) {
      this.logger.error(`Failed to fetch menus: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get(':id')
  async getMenu(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    try {
      const result = await this.menusService.create(createMenuItemDto);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'There was a problem creating the menu item.',
        details: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('menu')
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.createMenu(createMenuDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menusService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.menusService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Menu item with ID "${id}" not found`);
      }
      throw error;
    }
  }
}