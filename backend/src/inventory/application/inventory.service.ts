import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryMovement } from '../domain/entities/inventory-movement.entity';
import { CreateInventoryMovementDto } from '../domain/dtos/create-inventory-movement.dto';
import { NotificationsService } from 'src/notifications/application/notifications.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService, private notificationsService: NotificationsService, ) {}

  async registerMovement(movementDto: CreateInventoryMovementDto): Promise<InventoryMovement> {
    const { productId, cantidad, tipo } = movementDto;
  
    try {
      const product = await this.prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
  
      if (tipo === 'salida' && product.stock < cantidad) {
        throw new BadRequestException(`Insufficient stock for product ID ${productId}`);
      }
  
      const createdMovement = await this.prisma.inventoryMovement.create({ 
        data: { 
          ...movementDto, 
          fecha: new Date() 
        } 
      });
  
      const newStock = tipo === 'entrada' ? product.stock + cantidad : product.stock - cantidad;
      await this.prisma.product.update({
        where: { id: productId },
        data: { stock: newStock },
      });

      await this.notificationsService.checkAndNotifyStock(productId, newStock)
  
      return { ...createdMovement, tipo: createdMovement.tipo as 'entrada' | 'salida' };
      
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error; 
      }
      console.error('Inventory Movement Error:', error); 
      throw new InternalServerErrorException('Unexpected error processing inventory movement');
    }
  }
  

  async findAll(): Promise<InventoryMovement[]> {
    try {
      const movements = await this.prisma.inventoryMovement.findMany();
      return movements.map((movement) => ({
        ...movement,
        tipo: movement.tipo as 'entrada' | 'salida',
      }));
    } catch (error) {
      throw new InternalServerErrorException('Error fetching inventory movements');
    }
  }
}
