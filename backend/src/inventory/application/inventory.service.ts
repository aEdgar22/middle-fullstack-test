import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { InventoryMovement } from '../domain/entities/inventory-movement.entity';
import { CreateInventoryMovementDto } from '../domain/dtos/create-inventory-movement.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async registerMovement(movement: CreateInventoryMovementDto): Promise<InventoryMovement> {
    const createdMovement = await this.prisma.inventoryMovement.create({ data: movement });

    // Convertir el tipo de 'tipo' a 'entrada' | 'salida'
    const typedMovement: InventoryMovement = {
      ...createdMovement,
      tipo: createdMovement.tipo as 'entrada' | 'salida',
    };

    return typedMovement;
  }

  async findAll(): Promise<InventoryMovement[]> {
    const movements = await this.prisma.inventoryMovement.findMany();

    // Convertir el tipo de 'tipo' en cada movimiento
    return movements.map((movement) => ({
      ...movement,
      tipo: movement.tipo as 'entrada' | 'salida',
    }));
  }
}