import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [ProductsModule, InventoryModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
