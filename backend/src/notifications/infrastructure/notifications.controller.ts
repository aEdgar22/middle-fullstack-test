import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from '../application/notifications.service';
import { Notification } from '../domain/entities/notification.entity';
import { CreateNotificationDto } from '../domain/dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }
}
