import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './menu-item.dto';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}