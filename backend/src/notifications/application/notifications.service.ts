import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '../domain/entities/notification.entity';
import { CreateNotificationDto } from '../domain/dtos/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async create(notification: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({ data: notification });
  }

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }
}
