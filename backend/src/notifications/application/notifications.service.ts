import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '../domain/entities/notification.entity';
import { CreateNotificationDto } from '../domain/dtos/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(notificationDto: CreateNotificationDto): Promise<Notification> {
    try {
      const notification = await this.prisma.notification.create({ data: notificationDto });

      console.log(`Notification created: ${JSON.stringify(notification)}`);

      return notification;
      
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new InternalServerErrorException('Error creating notification');
    }
  }

  async findAll(): Promise<Notification[]> {
    try {
      return await this.prisma.notification.findMany();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new InternalServerErrorException('Error fetching notifications');
    }
  }

  async checkAndNotifyStock(productId: string, stock: number) {
    if (stock <= 5) {
      await this.create({
        productId,
        cantidadRestante: stock,
        fechaRegistro: new Date(),
      });
  
      console.log(`🚨 ALERTA: Stock bajo para el producto ${productId}. Cantidad restante: ${stock}`);
    }
  }
  
}
