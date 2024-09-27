import { Module } from '@nestjs/common';
import { MenusController } from './menu.controller';
import { MenusService } from './menu.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MenusController],
  providers: [MenusService, PrismaService],
})
export class MenusModule {}