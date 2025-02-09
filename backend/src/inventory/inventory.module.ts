import { Module } from '@nestjs/common';
import { InventoryService } from './application/inventory.service';
import { InventoryController } from './infrastructure/inventory.controller';

@Module({
  providers: [InventoryService],
  controllers: [InventoryController]
})
export class InventoryModule {}
