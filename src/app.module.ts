import { Module } from '@nestjs/common';
import { MenusModule } from './menu/menu.module';
@Module({
  imports: [MenusModule],
})
export class AppModule {}
