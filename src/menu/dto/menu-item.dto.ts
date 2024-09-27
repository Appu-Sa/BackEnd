import { IsString, IsOptional, IsUUID, IsInt, Min } from 'class-validator';

export class CreateMenuItemDto {
    @IsString()
    name: string;

    @IsUUID()
    menuId: string;

    @IsOptional()
    @IsUUID()
    parentId?: string;

    @IsInt()
    @Min(0)
    depth: number;

    @IsInt()
    @Min(0)
    order: number;
}