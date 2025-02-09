import { Module } from '@nestjs/common';
import { NotificationService } from './application/notifications.service';
import { NotificationController } from './infrastructure/notifications.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationsModule {}
