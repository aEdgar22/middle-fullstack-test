import { Controller, Get, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { NotificationService } from '../application/notifications.service';
import { Notification } from '../domain/entities/notification.entity';
import { CreateNotificationDto } from '../domain/dtos/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }
}