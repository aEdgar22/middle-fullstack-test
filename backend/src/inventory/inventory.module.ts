import { Module } from '@nestjs/common';
import { InventoryService } from './application/inventory.service';
import { InventoryController } from './infrastructure/inventory.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationsService } from 'src/notifications/application/notifications.service';

@Module({
  imports: [PrismaModule],
  providers: [InventoryService, NotificationsService],
  controllers: [InventoryController]
})
export class InventoryModule {}
